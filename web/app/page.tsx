export default function HomePage() {
  const categories = [
    {
      title: "Food & Dining",
      text: "Restaurants, cafes, bakeries and local food.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3v7M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 10v11M16 3v18M16 3c3 1.5 3 4 3 6h-3" />
        </svg>
      ),
    },
    {
      title: "Healthcare",
      text: "Hospitals, clinics, pharmacies and care.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z" />
          <path d="M12 7v6M9 10h6" />
        </svg>
      ),
    },
    {
      title: "Hotels & Stays",
      text: "Hotels, lodges, stays and accommodation.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 19V8h18v11M3 15h18M7 12h3a3 3 0 0 1 3 3H7v-3ZM13 15v-4h3a4 4 0 0 1 4 4" />
          <path d="M5 19v2M19 19v2" />
        </svg>
      ),
    },
    {
      title: "Shopping",
      text: "Stores, fashion, markets and everyday shopping.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 8h14l1 13H4L5 8ZM8 8a4 4 0 0 1 8 0" />
        </svg>
      ),
    },
    {
      title: "Travel & Transport",
      text: "Travel, transport and getting around Kadapa.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 16V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10M5 16h14M7 19h2M15 19h2" />
          <path d="M8 8h8M8 12h8" />
        </svg>
      ),
    },
    {
      title: "Education",
      text: "Schools, colleges, training and learning.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 9 9-5 9 5-9 5-9-5Z" />
          <path d="M7 11v5c3 2 7 2 10 0v-5M21 9v6" />
        </svg>
      ),
    },
    {
      title: "Jobs",
      text: "Local jobs, careers and employment opportunities.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
        </svg>
      ),
    },
    {
      title: "Home & Living",
      text: "Home services, repairs, interiors and essentials.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z" />
          <path d="M9 21v-7h6v7" />
        </svg>
      ),
    },
    {
      title: "Beauty & Wellness",
      text: "Salons, spas, fitness and wellness services.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3c2 2 2 4 0 6s-2 4 0 6M16 3c-2 2-2 4 0 6s2 4 0 6M5 20h14" />
          <path d="M7 18h10" />
        </svg>
      ),
    },
    {
      title: "Professional Services",
      text: "Useful local professionals and everyday services.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m14.7 6.3 3-3 3 3-3 3M3 21l8.7-8.7M13 5l6 6" />
        </svg>
      ),
    },
    {
      title: "Government",
      text: "Government offices and public services.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 21h18M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M3 10l9-6 9 6" />
        </svg>
      ),
    },
    {
      title: "Events & Community",
      text: "Events, activities and things happening locally.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      ),
    },
  ];

  const places = [
    {
      title: "Gandikota",
      text: "Explore places and experiences around the region.",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
    },
    {
      title: "Explore Local Places",
      text: "Discover destinations, attractions and things to do.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85",
    },
    {
      title: "Weekend Discoveries",
      text: "Find ideas for your next local outing.",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
    },
  ];

  return (
    <>
      <style>{`
        :root {
          --kp-red: #E53935;
          --kp-red-dark: #C62828;
          --kp-blue: #2D2DE1;
          --kp-blue-dark: #1F1FB5;
          --kp-black: #080808;
          --kp-text: #111111;
          --kp-muted: #686868;
          --kp-border: #e8e8ec;
          --kp-bg: #f7f7f8;
          --kp-white: #ffffff;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: var(--kp-text);
          background: var(--kp-white);
        }

        a {
          text-decoration: none;
        }

        .kp-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,.07);
        }

        .kp-nav-inner {
          max-width: 1240px;
          min-height: 76px;
          margin: auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .kp-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: var(--kp-black);
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -.5px;
        }

        .kp-brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          color: white;
          background: var(--kp-red);
          font-size: 20px;
          font-weight: 900;
        }

        .kp-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .kp-nav-links a {
          color: #333;
          font-size: 14px;
          font-weight: 650;
        }

        .kp-nav-links a:hover {
          color: var(--kp-red);
        }

        .kp-nav-cta {
          background: var(--kp-black) !important;
          color: white !important;
          padding: 11px 17px;
          border-radius: 8px;
        }

        .kp-hero {
          background:
            radial-gradient(circle at 82% 20%, rgba(45,45,225,.14), transparent 32%),
            radial-gradient(circle at 12% 30%, rgba(229,57,53,.09), transparent 30%),
            #fafafa;
          border-bottom: 1px solid var(--kp-border);
        }

        .kp-hero-inner {
          max-width: 1240px;
          min-height: 570px;
          margin: auto;
          padding: 88px 28px 80px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(350px, .9fr);
          align-items: center;
          gap: 70px;
        }

        .kp-eyebrow,
        .kp-section-label {
          color: var(--kp-red);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.8px;
        }

        .kp-hero h1 {
          margin: 18px 0 20px;
          max-width: 720px;
          font-size: clamp(48px, 7vw, 82px);
          line-height: .96;
          letter-spacing: -4px;
          font-weight: 850;
        }

        .kp-hero h1 span {
          color: var(--kp-blue);
        }

        .kp-hero-copy {
          max-width: 650px;
          color: var(--kp-muted);
          font-size: 19px;
          line-height: 1.65;
          margin-bottom: 32px;
        }

        .kp-search {
          max-width: 690px;
          padding: 7px;
          background: white;
          border: 1px solid #dedee4;
          border-radius: 14px;
          box-shadow: 0 16px 45px rgba(20,20,40,.09);
          display: flex;
          gap: 7px;
        }

        .kp-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          box-shadow: none;
          margin: 0;
          padding: 15px 16px;
          font-size: 16px;
          background: white;
        }

        .kp-search input:focus {
          box-shadow: none;
        }

        .kp-search button {
          border: 0;
          border-radius: 10px;
          background: var(--kp-red);
          color: white;
          padding: 0 23px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 750;
          white-space: nowrap;
        }

        .kp-search button:hover {
          background: var(--kp-red-dark);
        }

        .kp-quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .kp-quick-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #dddde3;
          background: white;
          color: #252525;
          padding: 9px 13px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
        }

        .kp-quick-action svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
        }

        .kp-hero-visual {
          position: relative;
        }

        .kp-hero-image {
          width: 100%;
          height: 390px;
          object-fit: cover;
          border-radius: 24px;
          display: block;
          box-shadow: 0 25px 60px rgba(0,0,0,.13);
        }

        .kp-floating-card {
          position: absolute;
          left: -25px;
          bottom: -22px;
          background: white;
          border: 1px solid var(--kp-border);
          border-radius: 14px;
          padding: 17px 19px;
          box-shadow: 0 18px 45px rgba(0,0,0,.12);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .kp-floating-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: #eeeefe;
          color: var(--kp-blue);
        }

        .kp-floating-icon svg {
          width: 21px;
          height: 21px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
        }

        .kp-floating-card strong {
          display: block;
          font-size: 14px;
        }

        .kp-floating-card span {
          color: var(--kp-muted);
          font-size: 12px;
        }

        .kp-section {
          max-width: 1240px;
          margin: auto;
          padding: 92px 28px;
        }

        .kp-section-heading {
          max-width: 700px;
          margin-bottom: 38px;
        }

        .kp-section-heading h2 {
          margin: 10px 0 10px;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.05;
          letter-spacing: -1.7px;
        }

        .kp-section-heading p {
          color: var(--kp-muted);
          font-size: 16px;
          line-height: 1.65;
          margin: 0;
        }

        .kp-category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .kp-category {
          min-height: 185px;
          padding: 23px;
          border: 1px solid var(--kp-border);
          border-radius: 15px;
          background: white;
          color: var(--kp-text);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .kp-category:hover {
          transform: translateY(-4px);
          border-color: #cfcfd7;
          box-shadow: 0 15px 35px rgba(0,0,0,.07);
        }

        .kp-category-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: var(--kp-blue);
          background: #eeeeff;
          margin-bottom: 20px;
        }

        .kp-category-icon svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .kp-category h3 {
          margin: 0 0 7px;
          font-size: 17px;
        }

        .kp-category p {
          margin: 0;
          color: var(--kp-muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .kp-nearme {
          background: var(--kp-black);
          color: white;
        }

        .kp-nearme-inner {
          max-width: 1240px;
          margin: auto;
          padding: 80px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 80px;
        }

        .kp-nearme h2 {
          margin: 12px 0 16px;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1;
          letter-spacing: -2px;
        }

        .kp-nearme p {
          color: #bcbcbc;
          max-width: 560px;
          line-height: 1.7;
        }

        .kp-nearme-button {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: var(--kp-red);
          color: white;
          padding: 14px 19px;
          border-radius: 9px;
          font-weight: 750;
          margin-top: 10px;
        }

        .kp-nearme-button svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
        }

        .kp-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 13px;
        }

        .kp-stat {
          min-height: 145px;
          border: 1px solid #282828;
          border-radius: 14px;
          padding: 23px;
          background: #101010;
        }

        .kp-stat strong {
          display: block;
          font-size: 35px;
          letter-spacing: -1px;
          color: white;
        }

        .kp-stat span {
          color: #999;
          font-size: 13px;
        }

        .kp-places-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr 1fr;
          gap: 16px;
        }

        .kp-place {
          position: relative;
          min-height: 410px;
          overflow: hidden;
          border-radius: 17px;
          background: #111;
          color: white;
        }

        .kp-place img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
        }

        .kp-place:hover img {
          transform: scale(1.045);
        }

        .kp-place::after {
          content: "";
          position: absolute;
          inset: 35% 0 0;
          background: linear-gradient(transparent, rgba(0,0,0,.85));
        }

        .kp-place-content {
          position: absolute;
          z-index: 2;
          left: 22px;
          right: 22px;
          bottom: 21px;
        }

        .kp-place-content h3 {
          margin: 0 0 5px;
          color: white;
          font-size: 22px;
        }

        .kp-place-content p {
          margin: 0;
          color: #ddd;
          font-size: 13px;
        }

        .kp-newcomer {
          background: var(--kp-bg);
        }

        .kp-newcomer-inner {
          max-width: 1240px;
          margin: auto;
          padding: 92px 28px;
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 90px;
        }

        .kp-newcomer h2 {
          margin: 10px 0 15px;
          font-size: clamp(34px, 4vw, 49px);
          letter-spacing: -2px;
          line-height: 1;
        }

        .kp-newcomer-copy p {
          color: var(--kp-muted);
          line-height: 1.7;
        }

        .kp-guide {
          display: grid;
          gap: 12px;
        }

        .kp-guide-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 17px;
          padding: 20px 0;
          border-bottom: 1px solid #dddde1;
        }

        .kp-guide-number {
          color: var(--kp-red);
          font-size: 13px;
          font-weight: 850;
          padding-top: 3px;
        }

        .kp-guide-item strong {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
        }

        .kp-guide-item span {
          color: var(--kp-muted);
          font-size: 14px;
        }

        .kp-business {
          max-width: 1240px;
          margin: 0 auto;
          padding: 92px 28px;
        }

        .kp-business-box {
          background: var(--kp-red);
          color: white;
          border-radius: 20px;
          padding: 55px 58px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .kp-business-box h2 {
          margin: 10px 0;
          color: white;
          font-size: clamp(30px, 4vw, 47px);
          letter-spacing: -1.7px;
        }

        .kp-business-box p {
          margin: 0;
          max-width: 620px;
          color: #ffe6e6;
          line-height: 1.6;
        }

        .kp-business-button {
          flex-shrink: 0;
          background: white;
          color: var(--kp-black);
          padding: 14px 19px;
          border-radius: 9px;
          font-weight: 800;
        }

        .kp-newsletter {
          border-top: 1px solid var(--kp-border);
          background: #fafafa;
        }

        .kp-newsletter-inner {
          max-width: 1240px;
          margin: auto;
          padding: 70px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 50px;
        }

        .kp-newsletter h2 {
          margin: 9px 0 8px;
          font-size: 31px;
          letter-spacing: -1px;
        }

        .kp-newsletter p {
          margin: 0;
          color: var(--kp-muted);
        }

        .kp-newsletter-form {
          min-width: 390px;
          display: flex;
          gap: 8px;
        }

        .kp-newsletter-form input {
          margin: 0;
          min-width: 0;
          flex: 1;
          background: white;
        }

        .kp-newsletter-form button {
          margin: 0;
          border: 0;
          background: var(--kp-blue);
          color: white;
          padding: 0 19px;
          border-radius: 8px;
          font-weight: 750;
        }

        .kp-footer {
          background: var(--kp-black);
          color: #999;
        }

        .kp-footer-inner {
          max-width: 1240px;
          margin: auto;
          padding: 28px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 13px;
        }

        .kp-footer a {
          color: #bbb;
        }

        @media (max-width: 1000px) {
          .kp-hero-inner,
          .kp-nearme-inner,
          .kp-newcomer-inner {
            grid-template-columns: 1fr;
          }

          .kp-hero-visual {
            max-width: 700px;
          }

          .kp-category-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .kp-places-grid {
            grid-template-columns: 1fr 1fr;
          }

          .kp-place:first-child {
            grid-column: 1 / -1;
          }

          .kp-newcomer-inner {
            gap: 45px;
          }
        }

        @media (max-width: 720px) {
          .kp-nav-inner {
            min-height: 66px;
            padding: 0 17px;
          }

          .kp-nav-links a:not(.kp-nav-cta) {
            display: none;
          }

          .kp-nav-links {
            gap: 8px;
          }

          .kp-nav-cta {
            padding: 9px 12px;
            font-size: 12px;
          }

          .kp-hero-inner {
            padding: 58px 18px 70px;
            gap: 50px;
          }

          .kp-hero h1 {
            font-size: clamp(46px, 15vw, 68px);
            letter-spacing: -3px;
          }

          .kp-hero-copy {
            font-size: 16px;
          }

          .kp-search {
            display: flex;
            flex-direction: column;
            padding: 7px;
          }

          .kp-search button {
            min-height: 48px;
          }

          .kp-hero-image {
            height: 300px;
          }

          .kp-floating-card {
            left: 12px;
            bottom: -20px;
          }

          .kp-section {
            padding: 65px 18px;
          }

          .kp-category-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .kp-category {
            min-height: 175px;
            padding: 17px;
          }

          .kp-category h3 {
            font-size: 15px;
          }

          .kp-category p {
            font-size: 12px;
          }

          .kp-nearme-inner,
          .kp-newcomer-inner {
            padding: 65px 18px;
          }

          .kp-stat-grid {
            grid-template-columns: 1fr 1fr;
          }

          .kp-stat {
            min-height: 120px;
          }

          .kp-places-grid {
            grid-template-columns: 1fr;
          }

          .kp-place:first-child {
            grid-column: auto;
          }

          .kp-place {
            min-height: 340px;
          }

          .kp-business {
            padding: 65px 18px;
          }

          .kp-business-box {
            padding: 34px 24px;
            flex-direction: column;
            align-items: flex-start;
          }

          .kp-newsletter-inner {
            padding: 55px 18px;
            flex-direction: column;
            align-items: stretch;
          }

          .kp-newsletter-form {
            min-width: 0;
            flex-direction: column;
          }

          .kp-newsletter-form button {
            min-height: 46px;
          }

          .kp-footer-inner {
            padding: 25px 18px;
            flex-direction: column;
          }
        }
      `}</style>

      <nav className="kp-nav">
        <div className="kp-nav-inner">
          <a className="kp-brand" href="/">
            <span className="kp-brand-mark">K</span>
            <span>Kadapa People</span>
          </a>

          <div className="kp-nav-links">
            <a href="#discover">Discover</a>
            <a href="#places">Places</a>
            <a href="#community">Community</a>
            <a className="kp-nav-cta" href="#business">
              List your business
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="kp-hero">
          <div className="kp-hero-inner">
            <div>
              <span className="kp-eyebrow">WELCOME TO KADAPA</span>

              <h1>
                Kadapa,
                <br />
                <span>all in one place.</span>
              </h1>

              <p className="kp-hero-copy">
                Discover local businesses, places, services, events and useful
                information for everyday life in Kadapa.
              </p>

              <form className="kp-search" action="/search" method="get">
                <input
                  type="search"
                  name="q"
                  placeholder="What are you looking for?"
                  aria-label="Search Kadapa"
                />

                <button type="submit">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                  Search
                </button>
              </form>

              <div className="kp-quick-actions">
                <a className="kp-quick-action" href="#nearme">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Near Me
                </a>

                <a className="kp-quick-action" href="#discover">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 5h16v14H4z" />
                    <path d="M8 9h8M8 13h5" />
                  </svg>
                  Explore Categories
                </a>

                <a className="kp-quick-action" href="#community">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
                    <circle cx="9.5" cy="7" r="3.5" />
                    <path d="M17 11a3 3 0 1 0-1-5.8M21 20v-1.5a4 4 0 0 0-3-3.9" />
                  </svg>
                  Community
                </a>
              </div>
            </div>

            <div className="kp-hero-visual">
              <img
                className="kp-hero-image"
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=85"
                alt="Representative city street scene"
              />

              <div className="kp-floating-card">
                <div className="kp-floating-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <div>
                  <strong>Discover nearby</strong>
                  <span>Businesses, services & places</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kp-section" id="discover">
          <div className="kp-section-heading">
            <span className="kp-section-label">DISCOVER LOCAL</span>
            <h2>Everything you need, closer to home.</h2>
            <p>
              Explore Kadapa through local businesses, services, places and
              useful categories.
            </p>
          </div>

          <div className="kp-category-grid">
            {categories.map((category) => (
              <a className="kp-category" href="#" key={category.title}>
                <div className="kp-category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="kp-nearme" id="nearme">
          <div className="kp-nearme-inner">
            <div>
              <span className="kp-section-label">NEAR ME</span>
              <h2>Find what you need around you.</h2>
              <p>
                A faster way to discover nearby businesses, restaurants,
                healthcare, services and other useful places in Kadapa.
              </p>

              <a className="kp-nearme-button" href="/near-me">
                <svg viewBox="0 0 24 24">
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Explore Near Me
              </a>
            </div>

            <div className="kp-stat-grid">
              <div className="kp-stat">
                <strong>145+</strong>
                <span>Local categories</span>
              </div>

              <div className="kp-stat">
                <strong>1</strong>
                <span>Place to discover Kadapa</span>
              </div>

              <div className="kp-stat">
                <strong>24/7</strong>
                <span>Local information access</span>
              </div>

              <div className="kp-stat">
                <strong>∞</strong>
                <span>Possibilities to explore</span>
              </div>
            </div>
          </div>
        </section>

        <section className="kp-section" id="places">
          <div className="kp-section-heading">
            <span className="kp-section-label">EXPLORE KADAPA</span>
            <h2>Places worth discovering.</h2>
            <p>
              Explore attractions, destinations and experiences around Kadapa.
            </p>
          </div>

          <div className="kp-places-grid">
            {places.map((place) => (
              <a className="kp-place" href="#" key={place.title}>
                <img src={place.image} alt={place.title} />
                <div className="kp-place-content">
                  <h3>{place.title}</h3>
                  <p>{place.text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="kp-newcomer" id="community">
          <div className="kp-newcomer-inner">
            <div className="kp-newcomer-copy">
              <span className="kp-section-label">NEW TO KADAPA?</span>
              <h2>Get to know your city faster.</h2>
              <p>
                Whether you have lived here for years or just arrived, Kadapa
                People is designed to make local information easier to find.
              </p>
            </div>

            <div className="kp-guide">
              <div className="kp-guide-item">
                <span className="kp-guide-number">01</span>
                <div>
                  <strong>Find what you need</strong>
                  <span>
                    Search businesses, places and useful local services.
                  </span>
                </div>
              </div>

              <div className="kp-guide-item">
                <span className="kp-guide-number">02</span>
                <div>
                  <strong>Explore Kadapa</strong>
                  <span>
                    Discover destinations, local experiences and community
                    information.
                  </span>
                </div>
              </div>

              <div className="kp-guide-item">
                <span className="kp-guide-number">03</span>
                <div>
                  <strong>Connect locally</strong>
                  <span>
                    Discover businesses, services and people around you.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kp-business" id="business">
          <div className="kp-business-box">
            <div>
              <span className="kp-section-label">FOR LOCAL BUSINESSES</span>
              <h2>Put your business on Kadapa People.</h2>
              <p>
                Help people discover your business and connect with you
                through Kadapa&apos;s local platform.
              </p>
            </div>

            <a className="kp-business-button" href="#">
              Add your business
            </a>
          </div>
        </section>

        <section className="kp-newsletter">
          <div className="kp-newsletter-inner">
            <div>
              <span className="kp-section-label">STAY CONNECTED</span>
              <h2>Kadapa, in your inbox.</h2>
              <p>
                Get useful local updates and new discoveries from Kadapa
                People.
              </p>
            </div>

            <form className="kp-newsletter-form" action="#" method="post">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                aria-label="Your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="kp-footer">
        <div className="kp-footer-inner">
          <span>© 2026 Kadapa People</span>

          <span>
            <a href="#">About</a>
            {" · "}
            <a href="#">Contact</a>
            {" · "}
            <a href="#">Privacy</a>
          </span>
        </div>
      </footer>
    </>
  );
}
