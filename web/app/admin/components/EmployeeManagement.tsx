"use client";

import { FormEvent, useEffect, useState } from "react";

type EmployeeRole = {
  id: string;
  name: string;
  description: string;
};

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: EmployeeRole[];
};

const assignableRoles: EmployeeRole[] = [
  {
    id: "ADMIN",
    name: "ADMIN",
    description: "Administrative access",
  },
  {
    id: "BUSINESS_MANAGER",
    name: "BUSINESS_MANAGER",
    description: "Business management access",
  },
  {
    id: "BUSINESS_OWNER",
    name: "BUSINESS_OWNER",
    description: "Business owner access",
  },
  {
    id: "BUSINESS_STAFF",
    name: "BUSINESS_STAFF",
    description: "Limited business access",
  },
  {
    id: "CONTENT_MANAGER",
    name: "CONTENT_MANAGER",
    description: "Manage business and content records",
  },
  {
    id: "DATA_MANAGER",
    name: "DATA_MANAGER",
    description: "Manage and verify data",
  },
  {
    id: "MODERATOR",
    name: "MODERATOR",
    description: "Moderate reviews and public content",
  },
  {
    id: "SUPPORT",
    name: "SUPPORT",
    description: "Customer and business support",
  },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    "DATA_MANAGER",
  ]);

  async function loadEmployees() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/employees",
        { cache: "no-store" }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          "Employee API returned an empty response."
        );
      }

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to load employees."
        );
      }

      setEmployees(data.employees || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function toggleRole(role: string) {
    setSelectedRoles((current) =>
      current.includes(role)
        ? current.filter((item) => item !== role)
        : [...current, role]
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Employee name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Employee email is required.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (selectedRoles.length === 0) {
      setError(
        "Select at least one employee role."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/admin/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
            roles: selectedRoles,
          }),
        }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          "Employee API returned an empty response."
        );
      }

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to create employee."
        );
      }

      setMessage(
        "Employee created successfully."
      );

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setSelectedRoles(["DATA_MANAGER"]);

      await loadEmployees();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create employee."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      id="employees"
      className="admin-card employee-management"
    >
      <div className="admin-card-heading">
        <div>
          <span className="admin-eyebrow">
            STAFF & PERMISSIONS
          </span>

          <h2>Employee Management</h2>

          <p>
            Create staff accounts and assign the
            permissions they need to manage Kadapa People.
          </p>
        </div>

        <button
          className="secondary"
          type="button"
          onClick={loadEmployees}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      {error && (
        <div className="admin-message admin-error">
          {error}
        </div>
      )}

      <div className="employee-layout">
        <div className="employee-create">
          <div className="employee-panel-heading">
            <strong>Add employee</strong>
            <span>
              Create a secure employee login
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <label>
                Full name *
                <input
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Employee full name"
                  required
                />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="employee@example.com"
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+91 9XXXXXXXXX"
                />
              </label>

              <label>
                Temporary password *
                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  required
                />
              </label>
            </div>

            <div className="employee-role-heading">
              <strong>Assign roles</strong>
              <span>
                Select one or more permissions
              </span>
            </div>

            <div className="employee-role-grid">
              {assignableRoles.map((role) => {
                const selected =
                  selectedRoles.includes(role.name);

                return (
                  <label
                    key={role.name}
                    className={
                      selected
                        ? "employee-role selected"
                        : "employee-role"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleRole(role.name)
                      }
                    />

                    <span className="employee-role-copy">
                      <strong>{role.name}</strong>
                      <small>
                        {role.description}
                      </small>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="employee-security-note">
              <strong>Security</strong>
              <p>
                Passwords are stored as secure hashes.
                Employee creation is recorded in the
                PostgreSQL audit log.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Creating employee..."
                : "Create employee"}
            </button>
          </form>
        </div>

        <div className="employee-list">
          <div className="employee-panel-heading">
            <strong>Employees</strong>
            <span>
              Accounts currently registered in PostgreSQL
            </span>
          </div>

          {loading ? (
            <p>Loading employees...</p>
          ) : employees.length === 0 ? (
            <div className="admin-empty">
              <strong>
                No employees found.
              </strong>

              <p>
                Create the first employee using the form.
              </p>
            </div>
          ) : (
            <div className="employee-table-wrap">
              <table className="admin-table employee-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Roles</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <strong>
                          {employee.name}
                        </strong>

                        <small>
                          {employee.email}
                        </small>

                        {employee.phone && (
                          <small>
                            {employee.phone}
                          </small>
                        )}
                      </td>

                      <td>
                        <div className="employee-role-badges">
                          {employee.roles.map(
                            (role) => (
                              <span
                                key={role.id}
                              >
                                {role.name}
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            employee.status ===
                            "ACTIVE"
                              ? "employee-status active"
                              : "employee-status"
                          }
                        >
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .employee-layout {
          display: grid;
          grid-template-columns: minmax(320px, 0.85fr) minmax(420px, 1.15fr);
          gap: 24px;
          margin-top: 24px;
        }

        .employee-create,
        .employee-list {
          border: 1px solid #e5e5ea;
          border-radius: 18px;
          background: #ffffff;
          padding: 24px;
        }

        .employee-panel-heading {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 20px;
        }

        .employee-panel-heading strong {
          font-size: 18px;
          color: #111111;
        }

        .employee-panel-heading span {
          color: #666666;
          font-size: 13px;
        }

        .employee-role-heading {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 26px 0 12px;
        }

        .employee-role-heading strong {
          color: #111111;
        }

        .employee-role-heading span {
          color: #666666;
          font-size: 13px;
        }

        .employee-role-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 9px;
        }

        .employee-role {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          border: 1px solid #e5e5ea;
          border-radius: 12px;
          background: #fafafa;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .employee-role:hover {
          border-color: #2d2de1;
          background: #f8f8ff;
        }

        .employee-role.selected {
          border-color: #2d2de1;
          background: #f3f3ff;
        }

        .employee-role input {
          width: 18px;
          height: 18px;
          margin: 2px 0 0;
          accent-color: #2d2de1;
          flex: 0 0 auto;
        }

        .employee-role-copy {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .employee-role-copy strong {
          color: #111111;
          font-size: 13px;
        }

        .employee-role-copy small {
          color: #666666;
          font-size: 12px;
          line-height: 1.45;
        }

        .employee-security-note {
          margin: 18px 0;
          padding: 14px 16px;
          border-left: 3px solid #e53935;
          background: #fff7f7;
          border-radius: 8px;
        }

        .employee-security-note strong {
          color: #111111;
          font-size: 13px;
        }

        .employee-security-note p {
          margin: 4px 0 0;
          color: #666666;
          font-size: 12px;
          line-height: 1.5;
        }

        .employee-table-wrap {
          overflow-x: auto;
        }

        .employee-table {
          min-width: 620px;
        }

        .employee-table td {
          vertical-align: top;
        }

        .employee-table td small {
          display: block;
          margin-top: 4px;
          color: #666666;
        }

        .employee-role-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .employee-role-badges span {
          display: inline-flex;
          padding: 5px 8px;
          border-radius: 999px;
          background: #f1f1ff;
          color: #1f1fb5;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .employee-status {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 999px;
          background: #f1f1f1;
          color: #666666;
          font-size: 11px;
          font-weight: 700;
        }

        .employee-status.active {
          background: #ecfdf3;
          color: #087443;
        }

        @media (max-width: 1000px) {
          .employee-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .employee-create,
          .employee-list {
            padding: 18px;
            border-radius: 14px;
          }
        }
      `}</style>
    </section>
  );
}
