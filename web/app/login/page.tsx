"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to sign in.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="kp-login-page">
      <div className="kp-login-background">
        <div className="kp-login-decoration kp-login-decoration-one" />
        <div className="kp-login-decoration kp-login-decoration-two" />

        <section className="kp-login-card" aria-label="Kadapa People staff login">
          <div className="kp-login-brand">
            <div className="kp-login-logo" aria-hidden="true">
              KP
            </div>

            <div className="kp-login-brand-copy">
              <strong>Kadapa People</strong>
              <span>Admin &amp; Staff Portal</span>
            </div>
          </div>

          <div className="kp-login-heading">
            <p className="kp-login-eyebrow">STAFF ACCESS</p>
            <h1>Welcome back</h1>
            <p>
              Sign in to manage Kadapa People business information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="kp-login-form">
            <div className="kp-login-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="employee@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="kp-login-field">
              <label htmlFor="password">Password</label>

              <div className="kp-password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="kp-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  disabled={loading}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="kp-login-error" role="alert">
                <span aria-hidden="true">!</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="kp-login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="kp-login-security">
            <span className="kp-security-check" aria-hidden="true">
              ✓
            </span>

            <div>
              <strong>Secure staff access</strong>
              <span>
                Your account permissions determine what you can manage.
              </span>
            </div>
          </div>

          <div className="kp-login-footer">
            <a href="/">← Back to Kadapa People</a>
          </div>
        </section>
      </div>
    </main>
  );
}
