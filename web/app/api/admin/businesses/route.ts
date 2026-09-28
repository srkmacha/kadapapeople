import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BusinessHourInput = {
  dayOfWeek: number;
  isClosed: boolean;
  opensAt: string | null;
  closesAt: string | null;
};

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidTime(value: string | null) {
  if (value === null || value === "") return true;
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || null;
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const businesses = await db.query(`
      SELECT
        b.id,
        b.name,
        b.slug,
        b.category_id,
        b.subcategory_id,
        b.description,
        b.phone,
        b.whatsapp,
        b.email,
        b.website,
        b.address,
        b.locality,
        b.city,
        b.state,
        b.pincode,
        b.latitude,
        b.longitude,
        b.status,
        b.verification_status,
        b.seo_title,
        b.seo_description,
        b.created_by,
        b.created_at,
        b.updated_at,
        c.name AS category_name,
        sc.name AS subcategory_name
      FROM businesses b
      LEFT JOIN categories c
        ON c.id = b.category_id
      LEFT JOIN categories sc
        ON sc.id = b.subcategory_id
      ORDER BY b.created_at DESC
    `);

    const stats = await db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'PUBLISHED')::int AS published,
        COUNT(*) FILTER (WHERE status = 'DRAFT')::int AS drafts,
        COUNT(*) FILTER (WHERE verification_status = 'VERIFIED')::int AS verified
      FROM businesses
    `);

    return NextResponse.json({
      success: true,
      businesses: businesses.rows,
      stats: stats.rows[0],
    });
  } catch (error) {
    console.error("BUSINESS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load businesses.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.ok) {
    return auth.response;
  }

  const client = await db.connect();

  try {
    const body = await request.json();

    const {
      name,
      categoryId,
      subcategoryId,
      description,
      phone,
      whatsapp,
      email,
      website,
      address,
      locality,
      pincode,
      latitude,
      longitude,
      status,
      verificationStatus,
      seoTitle,
      seoDescription,
      hours,
    } = body as {
      name?: string;
      categoryId?: string | null;
      subcategoryId?: string | null;
      description?: string | null;
      phone?: string | null;
      whatsapp?: string | null;
      email?: string | null;
      website?: string | null;
      address?: string | null;
      locality?: string | null;
      pincode?: string | null;
      latitude?: string | number | null;
      longitude?: string | number | null;
      status?: string;
      verificationStatus?: string;
      seoTitle?: string | null;
      seoDescription?: string | null;
      hours?: BusinessHourInput[];
    };

    const cleanName = String(name ?? "").trim();

    if (!cleanName) {
      return NextResponse.json(
        {
          success: false,
          error: "Business name is required.",
        },
        { status: 400 }
      );
    }

    const slugBase = makeSlug(cleanName);

    if (!slugBase) {
      return NextResponse.json(
        {
          success: false,
          error: "Business name cannot create a valid URL slug.",
        },
        { status: 400 }
      );
    }

    const safeStatus =
      status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    const safeVerificationStatus =
      verificationStatus === "VERIFIED"
        ? "VERIFIED"
        : "UNVERIFIED";

    const submittedHours = Array.isArray(hours) ? hours : [];

    if (submittedHours.length > 0) {
      for (const hour of submittedHours) {
        if (
          !Number.isInteger(hour.dayOfWeek) ||
          hour.dayOfWeek < 0 ||
          hour.dayOfWeek > 6
        ) {
          return NextResponse.json(
            {
              success: false,
              error: "Invalid day of week in business hours.",
            },
            { status: 400 }
          );
        }

        if (!hour.isClosed) {
          if (!isValidTime(hour.opensAt) || !isValidTime(hour.closesAt)) {
            return NextResponse.json(
              {
                success: false,
                error: "Invalid opening or closing time.",
              },
              { status: 400 }
            );
          }

          if (!hour.opensAt || !hour.closesAt) {
            return NextResponse.json(
              {
                success: false,
                error:
                  "Opening and closing times are required for open days.",
              },
              { status: 400 }
            );
          }
        }
      }
    }

    await client.query("BEGIN");

    let slug = slugBase;

    const existingSlug = await client.query(
      `
        SELECT id
        FROM businesses
        WHERE slug = $1
        LIMIT 1
      `,
      [slug]
    );

    if (existingSlug.rows.length > 0) {
      slug = `${slugBase}-${Date.now()}`;
    }

    const businessResult = await client.query(
      `
        INSERT INTO businesses (
          name,
          slug,
          category_id,
          subcategory_id,
          description,
          phone,
          whatsapp,
          email,
          website,
          address,
          locality,
          city,
          state,
          pincode,
          latitude,
          longitude,
          status,
          verification_status,
          seo_title,
          seo_description,
          created_by
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          'Kadapa',
          'Andhra Pradesh',
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19
        )
        RETURNING *
      `,
      [
        cleanName,
        slug,
        categoryId || null,
        subcategoryId || null,
        description || null,
        phone || null,
        whatsapp || null,
        email || null,
        website || null,
        address || null,
        locality || null,
        pincode || null,
        latitude === "" || latitude == null ? null : latitude,
        longitude === "" || longitude == null ? null : longitude,
        safeStatus,
        safeVerificationStatus,
        seoTitle || null,
        seoDescription || null,
        auth.user.userId,
      ]
    );

    const business = businessResult.rows[0];

    for (const hour of submittedHours) {
      await client.query(
        `
          INSERT INTO business_hours (
            business_id,
            day_of_week,
            is_closed,
            opens_at,
            closes_at
          )
          VALUES ($1, $2, $3, $4, $5)
        `,
        [
          business.id,
          hour.dayOfWeek,
          hour.isClosed,
          hour.isClosed ? null : hour.opensAt,
          hour.isClosed ? null : hour.closesAt,
        ]
      );
    }

    const ipAddress = getRequestIp(request);
    const userAgent = request.headers.get("user-agent");

    await client.query(
      `
        INSERT INTO audit_logs (
          user_id,
          action,
          entity_type,
          entity_id,
          new_values,
          ip_address,
          user_agent
        )
        VALUES (
          $1,
          'CREATE',
          'BUSINESS',
          $2,
          $3::jsonb,
          $4,
          $5
        )
      `,
      [
        auth.user.userId,
        business.id,
        JSON.stringify({
          name: business.name,
          slug: business.slug,
          categoryId: business.category_id,
          subcategoryId: business.subcategory_id,
          status: business.status,
          verificationStatus: business.verification_status,
          hoursSaved: submittedHours.length,
        }),
        ipAddress,
        userAgent,
      ]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        success: true,
        message: "Business and weekly hours saved successfully.",
        business,
        hoursSaved: submittedHours.length,
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("BUSINESS POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to save business.",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
