"use client";

import EmployeeManagement from "./components/EmployeeManagement";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
};

type Business = {
  id: string;
  name: string;
  slug: string;
  category_name: string | null;
  main_category_name: string | null;
  locality: string | null;
  phone: string | null;
  status: string;
  verification_status: string;
  created_at: string;
};

type Stats = {
  total: number;
  published: number;
  verified: number;
};

type BusinessDay = {
  dayOfWeek: number;
  name: string;
  isClosed: boolean;
  opensAt: string;
  closesAt: string;
};

const DAYS = [
  { dayOfWeek: 1, name: "Monday" },
  { dayOfWeek: 2, name: "Tuesday" },
  { dayOfWeek: 3, name: "Wednesday" },
  { dayOfWeek: 4, name: "Thursday" },
  { dayOfWeek: 5, name: "Friday" },
  { dayOfWeek: 6, name: "Saturday" },
  { dayOfWeek: 0, name: "Sunday" },
];

function createDefaultHours(): BusinessDay[] {
  return DAYS.map((day) => ({
    dayOfWeek: day.dayOfWeek,
    name: day.name,
    isClosed: false,
    opensAt: "09:00",
    closesAt: "21:00",
  }));
}

const emptyForm = {
  name: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  website: "",
  address: "",
  locality: "",
  pincode: "",
  latitude: "",
  longitude: "",
  status: "DRAFT",
  verificationStatus: "UNVERIFIED",
  coverImageUrl: "",
  seoTitle: "",
  seoDescription: "",
};

const tabs = [
  { id: "basic", label: "Basic" },
  { id: "contact", label: "Contact" },
  { id: "location", label: "Location" },
  { id: "hours", label: "Hours" },
  { id: "media", label: "Media" },
  { id: "seo", label: "SEO" },
];

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    verified: 0,
  });

  const [mainCategoryId, setMainCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const [form, setForm] = useState(emptyForm);

  const [hours, setHours] = useState<BusinessDay[]>(
    createDefaultHours()
  );

  const [activeTab, setActiveTab] = useState("basic");

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [businessesLoading, setBusinessesLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [categoryError, setCategoryError] =
    useState("");

  const [businessError, setBusinessError] =
    useState("");

  const [message, setMessage] = useState("");

  const mainCategories = useMemo(
    () =>
      categories.filter(
        (category) => !category.parent_id
      ),
    [categories]
  );

  const subcategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.parent_id === mainCategoryId
      ),
    [categories, mainCategoryId]
  );

  async function loadCategories() {
    setCategoriesLoading(true);
    setCategoryError("");

    try {
      const response = await fetch(
        "/api/admin/categories",
        { cache: "no-store" }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          "Category API returned an empty response."
        );
      }

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to load categories."
        );
      }

      setCategories(data.categories || []);
    } catch (error) {
      setCategoryError(
        error instanceof Error
          ? error.message
          : "Unable to load categories."
      );
    } finally {
      setCategoriesLoading(false);
    }
  }

  async function loadBusinesses() {
    setBusinessesLoading(true);
    setBusinessError("");

    try {
      const response = await fetch(
        "/api/admin/businesses",
        { cache: "no-store" }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          "Business API returned an empty response."
        );
      }

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to load businesses."
        );
      }

      setBusinesses(data.businesses || []);

      setStats(
        data.stats || {
          total: 0,
          published: 0,
          verified: 0,
        }
      );
    } catch (error) {
      setBusinessError(
        error instanceof Error
          ? error.message
          : "Unable to load businesses."
      );
    } finally {
      setBusinessesLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
    loadBusinesses();
  }, []);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleMainCategoryChange(
    value: string
  ) {
    setMainCategoryId(value);
    setSubcategoryId("");
  }

  function updateHour(
    day: number,
    field: keyof BusinessDay,
    value: string | boolean
  ) {
    setHours((current) =>
      current.map((item) =>
        item.dayOfWeek === day
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function applyHoursToWeekdays() {
    setHours((current) =>
      current.map((item) =>
        item.dayOfWeek === 0
          ? item
          : {
              ...item,
              isClosed: false,
              opensAt: "09:00",
              closesAt: "21:00",
            }
      )
    );
  }

  function setAllClosed() {
    setHours((current) =>
      current.map((item) => ({
        ...item,
        isClosed: true,
      }))
    );
  }

  function goNext() {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === activeTab
    );

    if (currentIndex < tabs.length - 1) {
      setActiveTab(
        tabs[currentIndex + 1].id
      );
    }
  }

  function goPrevious() {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === activeTab
    );

    if (currentIndex > 0) {
      setActiveTab(
        tabs[currentIndex - 1].id
      );
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage(
        "Please enter the business name."
      );
      setActiveTab("basic");
      return;
    }

    if (!mainCategoryId) {
      setMessage(
        "Please select a main category."
      );
      setActiveTab("basic");
      return;
    }

    if (!subcategoryId) {
      setMessage(
        "Please select a sub-category."
      );
      setActiveTab("basic");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/admin/businesses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            categoryId: mainCategoryId || null,
            subcategoryId: subcategoryId || null,
            hours: hours.map((item) => ({
              dayOfWeek: Number(item.dayOfWeek),
              isClosed: Boolean(item.isClosed),
              opensAt: item.isClosed ? null : item.opensAt,
              closesAt: item.isClosed ? null : item.closesAt,
            })),
          }),
        }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          "Business API returned an empty response."
        );
      }

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to save business."
        );
      }

      setMessage(
        "Business and weekly hours saved successfully to PostgreSQL."
      );

      setForm(emptyForm);
      setMainCategoryId("");
      setSubcategoryId("");
      setHours(createDefaultHours());
      setActiveTab("basic");

      await loadBusinesses();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save business."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="admin-shell">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <span className="admin-brand-mark">
            KP
          </span>

          <div>
            <strong>Kadapa People</strong>
            <small>Admin Panel</small>
          </div>
        </div>

        <details className="admin-mobile-menu">
          <summary>
            <span className="admin-menu-icon">
              ☰
            </span>
            <span>Menu</span>
          </summary>

          <nav className="admin-mobile-nav">
            <a className="active" href="/admin">
              Dashboard
            </a>

            <a href="#businesses">
              Businesses
            </a>

          <a href="#employees">
            Employees
          </a>

            <a href="#add-business">
              Add Business
            </a>

            <a href="#categories">
              Categories
            </a>
          </nav>
        </details>

        <nav className="admin-nav">
          <a className="active" href="/admin">
            Dashboard
          </a>

          <a href="#businesses">
            Businesses
          </a>

          <a href="#employees">
            Employees
          </a>

          <a href="#add-business">
            Add Business
          </a>

          <a href="#categories">
            Categories
          </a>
        </nav>

        <div className="admin-sidebar-note">
          <strong>Current phase</strong>

          <p>
            Build the trusted Kadapa local directory
            first. Categories and services will expand
            gradually.
          </p>
        </div>

      </aside>

      <section className="admin-content">

        <header className="admin-header">

          <div>
            <span className="admin-eyebrow">
              CONTROL CENTRE
            </span>

            <h1>Kadapa People</h1>

            <p>
              Manage the local business data powering
              the website and future mobile app.
            </p>
          </div>

          <a
            href="/"
            className="admin-view-site"
          >
            View website →
          </a>

        </header>

        <section className="admin-stats">

          <article>
            <span>Total businesses</span>
            <strong>{stats.total}</strong>
          </article>

          <article>
            <span>Published</span>
            <strong>{stats.published}</strong>
          </article>

          <article>
            <span>Verified</span>
            <strong>{stats.verified}</strong>
          </article>

          <article>
            <span>Main categories</span>
            <strong>
              {mainCategories.length}
            </strong>
          </article>

        </section>

        {message && (
          <div className="admin-message">
            {message}
          </div>
        )}

        {categoryError && (
          <div className="admin-message admin-error">
            Category loading error: {categoryError}
          </div>
        )}

        {businessError && (
          <div className="admin-message admin-error">
            Business loading error: {businessError}
          </div>
        )}

        <section
          id="add-business"
          className="admin-card business-editor"
        >

          <div className="admin-card-heading">

            <div>
              <span className="admin-eyebrow">
                MASTER DATA
              </span>

              <h2>Add a business</h2>

              <p>
                Build one complete business profile
                that can power web, mobile and search.
              </p>
            </div>

          </div>

          <div className="business-tabs">

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={
                  activeTab === tab.id
                    ? "business-tab active"
                    : "business-tab"
                }
                onClick={() =>
                  setActiveTab(tab.id)
                }
              >
                <span>
                  {index + 1}
                </span>

                {tab.label}
              </button>
            ))}

          </div>

          <form onSubmit={handleSubmit}>

            {activeTab === "basic" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    Basic information
                  </strong>

                  <span>
                    Required business identity
                  </span>
                </div>

                <div className="admin-form-grid">

                  <label className="full-width">
                    Business name *

                    <input
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Example: Sri Lakshmi Restaurant"
                      required
                    />
                  </label>

                  <label>
                    Main category *

                    <select
                      value={mainCategoryId}
                      onChange={(event) =>
                        handleMainCategoryChange(
                          event.target.value
                        )
                      }
                      disabled={
                        categoriesLoading
                      }
                      required
                    >

                      <option value="">
                        {categoriesLoading
                          ? "Loading categories..."
                          : "Select main category"}
                      </option>

                      {mainCategories.map(
                        (category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        )
                      )}

                    </select>
                  </label>

                  <label>
                    Sub-category *

                    <select
                      value={subcategoryId}
                      onChange={(event) =>
                        setSubcategoryId(
                          event.target.value
                        )
                      }
                      disabled={
                        !mainCategoryId ||
                        subcategories.length === 0
                      }
                      required
                    >

                      <option value="">
                        {!mainCategoryId
                          ? "Select main category first"
                          : "Select sub-category"}
                      </option>

                      {subcategories.map(
                        (category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        )
                      )}

                    </select>
                  </label>

                  <label className="full-width">
                    Description

                    <textarea
                      value={form.description}
                      onChange={(event) =>
                        updateField(
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Describe what this business offers. Keep it factual."
                      rows={5}
                    />
                  </label>

                </div>

              </div>
            )}

            {activeTab === "contact" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    Contact information
                  </strong>

                  <span>
                    How customers can reach the business
                  </span>
                </div>

                <div className="admin-form-grid">

                  <label>
                    Phone

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value
                        )
                      }
                      placeholder="+91 9XXXXXXXXX"
                    />
                  </label>

                  <label>
                    WhatsApp

                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(event) =>
                        updateField(
                          "whatsapp",
                          event.target.value
                        )
                      }
                      placeholder="+91 9XXXXXXXXX"
                    />
                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="business@example.com"
                    />
                  </label>

                  <label>
                    Website

                    <input
                      type="url"
                      value={form.website}
                      onChange={(event) =>
                        updateField(
                          "website",
                          event.target.value
                        )
                      }
                      placeholder="https://example.com"
                    />
                  </label>

                </div>

              </div>
            )}

            {activeTab === "location" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    Location
                  </strong>

                  <span>
                    Help people find the exact business
                  </span>
                </div>

                <div className="admin-form-grid">

                  <label className="full-width">
                    Full address

                    <textarea
                      value={form.address}
                      onChange={(event) =>
                        updateField(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="Building, street, landmark, area..."
                      rows={4}
                    />
                  </label>

                  <label>
                    Locality

                    <input
                      value={form.locality}
                      onChange={(event) =>
                        updateField(
                          "locality",
                          event.target.value
                        )
                      }
                      placeholder="Kadapa"
                    />
                  </label>

                  <label>
                    PIN code

                    <input
                      inputMode="numeric"
                      value={form.pincode}
                      onChange={(event) =>
                        updateField(
                          "pincode",
                          event.target.value
                        )
                      }
                      placeholder="516xxx"
                    />
                  </label>

                  <label>
                    Latitude

                    <input
                      value={form.latitude}
                      onChange={(event) =>
                        updateField(
                          "latitude",
                          event.target.value
                        )
                      }
                      placeholder="14.xxxxx"
                    />
                  </label>

                  <label>
                    Longitude

                    <input
                      value={form.longitude}
                      onChange={(event) =>
                        updateField(
                          "longitude",
                          event.target.value
                        )
                      }
                      placeholder="78.xxxxx"
                    />
                  </label>

                </div>

                <div className="business-info-box">
                  <strong>
                    Location accuracy matters
                  </strong>

                  <p>
                    We will later connect map/location
                    selection so an admin can select the
                    exact business position.
                  </p>
                </div>

              </div>
            )}

            {activeTab === "hours" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    Business hours
                  </strong>

                  <span>
                    Set the weekly opening schedule
                  </span>
                </div>

                <div className="hours-actions">

                  <button
                    type="button"
                    className="hours-quick-button"
                    onClick={
                      applyHoursToWeekdays
                    }
                  >
                    Set weekdays 9 AM – 9 PM
                  </button>

                  <button
                    type="button"
                    className="hours-quick-button"
                    onClick={setAllClosed}
                  >
                    Mark all closed
                  </button>

                </div>

                <div className="business-hours">

                  {hours.map((item) => (
                    <div
                      key={item.dayOfWeek}
                      className={
                        item.isClosed
                          ? "hours-row closed"
                          : "hours-row"
                      }
                    >

                      <div className="hours-day">
                        <strong>
                          {item.name}
                        </strong>
                      </div>

                      <label className="hours-closed">
                        <input
                          type="checkbox"
                          checked={
                            item.isClosed
                          }
                          onChange={(event) =>
                            updateHour(
                              item.dayOfWeek,
                              "isClosed",
                              event.target.checked
                            )
                          }
                        />

                        <span>
                          Closed
                        </span>
                      </label>

                      <div className="hours-time">

                        <label>
                          Opens

                          <input
                            type="time"
                            value={
                              item.opensAt
                            }
                            disabled={
                              item.isClosed
                            }
                            onChange={(event) =>
                              updateHour(
                                item.dayOfWeek,
                                "opensAt",
                                event.target.value
                              )
                            }
                          />
                        </label>

                        <span className="hours-to">
                          to
                        </span>

                        <label>
                          Closes

                          <input
                            type="time"
                            value={
                              item.closesAt
                            }
                            disabled={
                              item.isClosed
                            }
                            onChange={(event) =>
                              updateHour(
                                item.dayOfWeek,
                                "closesAt",
                                event.target.value
                              )
                            }
                          />
                        </label>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="business-info-box">
                  <strong>
                    Hours are saved with the business
                  </strong>

                  <p>
                    These seven records will be stored in
                    PostgreSQL using the existing
                    business_hours table.
                  </p>
                </div>

              </div>
            )}

            {activeTab === "media" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    Photos & media
                  </strong>

                  <span>
                    Business imagery and branding
                  </span>
                </div>

                <div className="admin-form-grid">

                  <label className="full-width">
                    Cover image URL

                    <input
                      type="url"
                      value={form.coverImageUrl}
                      onChange={(event) =>
                        updateField(
                          "coverImageUrl",
                          event.target.value
                        )
                      }
                      placeholder="Verified business image URL"
                    />
                  </label>

                </div>

                <div className="business-info-box">
                  <strong>
                    Image policy
                  </strong>

                  <p>
                    Business photos should represent the
                    actual business. Generic photographs
                    will not be presented as photographs
                    of a specific Kadapa business.
                  </p>
                </div>

              </div>
            )}

            {activeTab === "seo" && (
              <div className="business-section">

                <div className="business-section-title">
                  <strong>
                    SEO & publishing
                  </strong>

                  <span>
                    Control how the listing appears online
                  </span>
                </div>

                <div className="admin-form-grid">

                  <label>
                    Publishing status

                    <select
                      value={form.status}
                      onChange={(event) =>
                        updateField(
                          "status",
                          event.target.value
                        )
                      }
                    >
                      <option value="DRAFT">
                        Draft
                      </option>

                      <option value="PUBLISHED">
                        Published
                      </option>

                      <option value="ARCHIVED">
                        Archived
                      </option>
                    </select>
                  </label>

                  <label>
                    Verification

                    <select
                      value={
                        form.verificationStatus
                      }
                      onChange={(event) =>
                        updateField(
                          "verificationStatus",
                          event.target.value
                        )
                      }
                    >
                      <option value="UNVERIFIED">
                        Unverified
                      </option>

                      <option value="PENDING">
                        Pending verification
                      </option>

                      <option value="VERIFIED">
                        Verified
                      </option>

                      <option value="REJECTED">
                        Rejected
                      </option>
                    </select>
                  </label>

                  <label>
                    SEO title

                    <input
                      value={form.seoTitle}
                      onChange={(event) =>
                        updateField(
                          "seoTitle",
                          event.target.value
                        )
                      }
                      placeholder="Business name | Kadapa People"
                    />
                  </label>

                  <label>
                    SEO description

                    <input
                      value={form.seoDescription}
                      onChange={(event) =>
                        updateField(
                          "seoDescription",
                          event.target.value
                        )
                      }
                      placeholder="Useful factual search description"
                    />
                  </label>

                </div>

              </div>
            )}

            <div className="business-form-footer">

              <button
                type="button"
                className="secondary"
                onClick={goPrevious}
                disabled={
                  activeTab === tabs[0].id
                }
              >
                ← Previous
              </button>

              {activeTab !==
              tabs[tabs.length - 1].id ? (
                <button
                  type="button"
                  onClick={goNext}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={
                    saving ||
                    categoriesLoading
                  }
                >
                  {saving
                    ? "Saving..."
                    : "Save business"}
                </button>
              )}

            </div>

          </form>

        </section>
        <EmployeeManagement />

        

        <section
          id="businesses"
          className="admin-card"
        >

          <div className="admin-card-heading">

            <div>
              <span className="admin-eyebrow">
                DATABASE
              </span>

              <h2>Businesses</h2>

              <p>
                Records loaded directly from PostgreSQL.
              </p>
            </div>

            <button
              className="secondary"
              type="button"
              onClick={loadBusinesses}
            >
              Refresh
            </button>

          </div>

          {businessesLoading ? (
            <p>Loading businesses...</p>
          ) : businesses.length === 0 ? (
            <div className="admin-empty">
              <strong>
                No businesses yet.
              </strong>

              <p>
                Add the first business using the form above.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrap">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Business</th>
                    <th>Main category</th>
                    <th>Sub-category</th>
                    <th>Locality</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {businesses.map(
                    (business) => (
                      <tr key={business.id}>

                        <td>
                          <strong>
                            {business.name}
                          </strong>

                          <small>
                            {business.phone ||
                              "No phone"}
                          </small>
                        </td>

                        <td>
                          {business.main_category_name ||
                            "Not assigned"}
                        </td>

                        <td>
                          {business.category_name ||
                            "Not assigned"}
                        </td>

                        <td>
                          {business.locality ||
                            "Not provided"}
                        </td>

                        <td>
                          <span className="admin-badge">
                            {business.status}
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        <section
          id="categories"
          className="admin-card"
        >

          <div className="admin-card-heading">

            <div>
              <span className="admin-eyebrow">
                DIRECTORY STRUCTURE
              </span>

              <h2>Categories</h2>

              <p>
                Main categories and their sub-categories.
              </p>
            </div>

          </div>

          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="admin-category-list">

              {mainCategories.map(
                (mainCategory) => {

                  const children =
                    categories.filter(
                      (category) =>
                        category.parent_id ===
                        mainCategory.id
                    );

                  return (
                    <div
                      key={mainCategory.id}
                      className="admin-category-group"
                    >

                      <strong>
                        {mainCategory.name}
                      </strong>

                      <small>
                        {children.length} sub-categories
                      </small>

                      <div>

                        {children
                          .slice(0, 8)
                          .map(
                            (child) => (
                              <span
                                key={child.id}
                              >
                                {child.name}
                              </span>
                            )
                          )}

                        {children.length > 8 && (
                          <span>
                            +{children.length - 8} more
                          </span>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>

      </section>

    </main>
  );
}




