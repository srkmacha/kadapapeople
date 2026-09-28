-- ============================================================
-- KADAPA PEOPLE
-- PostgreSQL DATABASE FOUNDATION
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash TEXT,
    email_verified_at TIMESTAMPTZ,
    phone_verified_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROLES
-- ============================================================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

INSERT INTO roles (name, description)
VALUES
    ('SUPER_ADMIN', 'Full system access'),
    ('ADMIN', 'Administrative access'),
    ('CONTENT_MANAGER', 'Manage business and content records'),
    ('MODERATOR', 'Moderate reviews and public content'),
    ('SUPPORT', 'Customer and business support'),
    ('DATA_MANAGER', 'Manage and verify data'),
    ('BUSINESS_OWNER', 'Business owner access'),
    ('BUSINESS_MANAGER', 'Business management access'),
    ('BUSINESS_STAFF', 'Limited business access')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- USER ROLES
-- ============================================================

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ============================================================
-- CATEGORIES
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LOCATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) UNIQUE NOT NULL,
    parent_id UUID REFERENCES locations(id),
    city VARCHAR(100) NOT NULL DEFAULT 'Kadapa',
    state VARCHAR(100) NOT NULL DEFAULT 'Andhra Pradesh',
    pincode VARCHAR(20),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BUSINESSES
-- ============================================================

CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,

    category_id UUID REFERENCES categories(id),
    subcategory_id UUID REFERENCES categories(id),

    description TEXT,

    phone VARCHAR(30),
    whatsapp VARCHAR(30),
    email VARCHAR(255),
    website TEXT,

    address TEXT,
    location_id UUID REFERENCES locations(id),
    locality VARCHAR(150),
    city VARCHAR(100) NOT NULL DEFAULT 'Kadapa',
    state VARCHAR(100) NOT NULL DEFAULT 'Andhra Pradesh',
    pincode VARCHAR(20),

    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    verification_status VARCHAR(30) NOT NULL DEFAULT 'UNVERIFIED',

    seo_title VARCHAR(255),
    seo_description VARCHAR(320),

    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_category
ON businesses(category_id);

CREATE INDEX IF NOT EXISTS idx_businesses_location
ON businesses(location_id);

CREATE INDEX IF NOT EXISTS idx_businesses_status
ON businesses(status);

CREATE INDEX IF NOT EXISTS idx_businesses_verification
ON businesses(verification_status);

-- ============================================================
-- BUSINESS MEMBERS
-- ============================================================

CREATE TABLE IF NOT EXISTS business_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    role VARCHAR(40) NOT NULL DEFAULT 'BUSINESS_STAFF',

    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (business_id, user_id)
);

-- ============================================================
-- BUSINESS HOURS
-- ============================================================

CREATE TABLE IF NOT EXISTS business_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),

    is_closed BOOLEAN NOT NULL DEFAULT FALSE,

    opens_at TIME,
    closes_at TIME,

    UNIQUE (business_id, day_of_week)
);

-- ============================================================
-- BUSINESS SERVICES
-- ============================================================

CREATE TABLE IF NOT EXISTS business_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

    name VARCHAR(200) NOT NULL,
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BUSINESS MEDIA
-- ============================================================

CREATE TABLE IF NOT EXISTS business_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

    media_type VARCHAR(30) NOT NULL,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),

    sort_order INTEGER NOT NULL DEFAULT 0,

    uploaded_by UUID REFERENCES users(id),

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    body TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- FAVORITES
-- ============================================================

CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, business_id)
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,

    old_values JSONB,
    new_values JSONB,

    ip_address INET,
    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INITIAL CATEGORIES
-- ============================================================

INSERT INTO categories (name, slug, description, sort_order)
VALUES
    ('Food & Restaurants', 'food-restaurants',
     'Restaurants, cafes, bakeries, food outlets and local dining.',
     1),

    ('Hotels & Stays', 'hotels-stays',
     'Hotels, lodges, stays and accommodation.',
     2),

    ('Health', 'health',
     'Hospitals, clinics, pharmacies and healthcare services.',
     3),

    ('Shopping', 'shopping',
     'Shops, stores, markets and local shopping.',
     4),

    ('Local Services', 'local-services',
     'Useful professional and everyday services.',
     5),

    ('Travel & Transport', 'travel-transport',
     'Travel, transport and mobility services.',
     6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- END
-- ============================================================