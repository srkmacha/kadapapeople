# KADAPA PEOPLE — PROJECT & DATA GUIDE

## What are we building?

Kadapa People is a local digital platform for Kadapa.

The long-term goal is:

    KADAPA PEOPLE
          |
    +-----+-----+
    |           |
  WEBSITE    MOBILE APP
    |           |
    +-----+-----+
          |
        API
          |
     POSTGRESQL
       DATABASE
          |
     ADMIN PANEL
          |
   BUSINESS PANEL

The database is the single source of truth.

We do NOT want this workflow:

    Excel -> collect data -> upload -> enter again -> fix duplicates

We want:

    Admin Panel -> Database -> Website + Mobile App

A business should be entered once.

--------------------------------------------------
## CURRENT DEVELOPMENT PHASE
--------------------------------------------------

PHASE 1 — FOUNDATION

We are currently building:

1. Website foundation
2. Admin Panel
3. PostgreSQL database structure
4. Business data model
5. Business creation/editing
6. Business ownership model
7. Shared API architecture
8. SEO-ready business records

We are NOT launching every category at once.

We will introduce categories gradually after the foundation is stable.

--------------------------------------------------
## FIRST PRODUCT WEDGE
--------------------------------------------------

The first major data category is:

LOCAL BUSINESSES

The initial categories are:

1. Food & Restaurants
2. Hotels & Stays
3. Health
4. Shopping
5. Local Services
6. Travel & Transport

More categories will be introduced later.

Examples of future categories:

- Education
- Jobs
- Housing
- Events
- Local News
- Government Services
- Emergency Information
- Community
- Tourism

Do not start collecting all of these yet.

--------------------------------------------------
## WHAT DATA ARE WE COLLECTING?
--------------------------------------------------

For each business, we collect useful public/business information.

### 1. BASIC IDENTITY

Business name
Category
Subcategory
Business description

Example:

Business:
Sri Sai Restaurant

Category:
Food & Restaurants

Subcategory:
South Indian

Description:
Local restaurant serving South Indian meals.

--------------------------------------------------
### 2. CONTACT INFORMATION

Phone
WhatsApp
Email
Website

Only collect information that is appropriate for the business listing.

--------------------------------------------------
### 3. LOCATION

Address
Locality / Area
City
State
Pincode
Latitude
Longitude

Location is important because later we want:

- Nearby businesses
- Maps
- Area pages
- Local search
- "Near Me"
- Location-based SEO

--------------------------------------------------
### 4. BUSINESS HOURS

Opening hours for each day.

Example:

Monday:
9:00 AM - 10:00 PM

Tuesday:
9:00 AM - 10:00 PM

etc.

Eventually this should become its own database table rather than one text field.

--------------------------------------------------
### 5. SERVICES

What the business actually provides.

Example:

Restaurant:
- Dine-in
- Takeaway
- Delivery
- Party orders

Hospital:
- Emergency
- OP consultation
- Diagnostics

Hotel:
- Rooms
- AC rooms
- Wi-Fi
- Parking

Services should eventually become structured database records.

--------------------------------------------------
### 6. PHOTOS AND MEDIA

Business logo
Cover image
Business photos

Eventually:

business_media

will store:

- image URL
- image type
- sort order
- alt text
- uploaded by
- approval status

We should prefer genuine business/local photographs.

We should NOT falsely label generic photographs as a specific Kadapa location.

--------------------------------------------------
### 7. VERIFICATION

Every business has a verification state.

Possible states:

UNVERIFIED
PENDING
VERIFIED

Verification does NOT mean we automatically endorse a business.

It means the information has been checked according to our verification process.

--------------------------------------------------
### 8. PUBLISHING STATUS

A business can be:

DRAFT
PUBLISHED
ARCHIVED

DRAFT:
Only administrators can work on it.

PUBLISHED:
Eligible to appear publicly.

ARCHIVED:
Removed from normal public discovery while preserving the record.

--------------------------------------------------
### 9. SEO INFORMATION

Each important business page can have:

SEO title
SEO description
Canonical URL
Slug

Example URL:

/kadapa/food-restaurants/sri-sai-restaurant

We will generate SEO-friendly pages from real database records.

We will NOT create thousands of empty/thin pages just for search engines.

--------------------------------------------------
## BUSINESS OWNERS

A business owner should NOT need to create the business again.

Admin can create:

    Business
       |
       +--- Owner account
       |
       +--- Manager account
       |
       +--- Staff account

A business can eventually have multiple authorized people.

This is why we need:

users

and

business_members

as separate concepts.

--------------------------------------------------
## BUSINESS PANEL
--------------------------------------------------

A business owner will eventually be able to manage:

Business profile
Contact details
Opening hours
Services
Photos
Location
Offers
Enquiries
Reviews
Business analytics

Some changes may require Admin approval.

--------------------------------------------------
## ADMIN PANEL
--------------------------------------------------

Administrators will eventually manage:

Dashboard
Businesses
Categories
Locations
Business owners
Business staff
Reviews
Media
Verification
SEO
Users
Reports
Audit logs
Settings

Admin remains the control layer.

--------------------------------------------------
## DATA WE SHOULD NOT COLLECT
--------------------------------------------------

Do not collect unnecessary sensitive personal information.

Do not store:

- passwords in plain text
- payment card information
- unnecessary personal identity information
- private customer information
- private business information without a legitimate purpose

Authentication credentials will be handled separately and securely.

--------------------------------------------------
## DATA QUALITY RULES
--------------------------------------------------

Every business record should aim to have:

- Correct business name
- Correct category
- Correct locality
- Correct address
- Valid contact information
- Accurate opening hours where available
- Genuine business information
- Appropriate photos
- Verification status
- Source/verification notes where needed

Avoid:

- duplicate businesses
- fake businesses
- invented phone numbers
- invented addresses
- generic photos falsely presented as local
- copied descriptions without checking
- SEO spam
- duplicate pages

--------------------------------------------------
## DATA SOURCES
--------------------------------------------------

Potential sources include:

1. Direct business submission
2. Business owner
3. Admin research
4. Public business information
5. Official business websites
6. Publicly available maps/business information
7. Local verification

For important information, we should eventually record where the information came from.

--------------------------------------------------
## DATABASE PRINCIPLE
--------------------------------------------------

The PostgreSQL database is the master record.

Website:
READS FROM DATABASE

Mobile:
READS FROM DATABASE

Admin:
CREATES / EDITS DATABASE DATA

Business Panel:
MANAGES AUTHORIZED BUSINESS DATA

API:
CONTROLS ACCESS TO DATABASE

--------------------------------------------------
## DEVELOPMENT PRINCIPLE
--------------------------------------------------

Build the foundation first.

Do not add ten categories because they sound useful.

Add one category.
Build its data model.
Test it.
Make it useful.
Then expand.

This protects the product from becoming too broad and unfinished.

--------------------------------------------------
## CURRENT PRIORITY
--------------------------------------------------

Our immediate technical priority is:

1. PostgreSQL schema
2. Admin authentication foundation
3. Admin business management
4. Business database
5. Business ownership
6. Public business pages
7. Search
8. SEO
9. Business Panel
10. Mobile application using the same API

--------------------------------------------------
## IMPORTANT
--------------------------------------------------

DO NOT START LARGE-SCALE DATA COLLECTION UNTIL THE ADMIN
PANEL + DATABASE WORKFLOW IS READY.

Once ready:

    FIND BUSINESS
         |
         v
    ADMIN PANEL
         |
         v
    POSTGRESQL
         |
      +--+--+
      |     |
    WEB   MOBILE

One entry.
One database record.
Multiple products use it.

--------------------------------------------------
## PROJECT NAME

Kadapa People

Tagline:

Kadapa, all in one place.

Long-term positioning:

Kadapa in your pocket.