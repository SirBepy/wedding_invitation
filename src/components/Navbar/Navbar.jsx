import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Navbar.scss";

const SECTIONS = [
  "landing",
  "ceremony",
  "timeline",
  "details",
  "faqs",
  "rsvp",
];

const NAV_LINKS = [
  { id: "seating", label: "Seating", href: "seating.html" },
  { id: "ceremony", label: "Ceremony", href: "#ceremony" },
  { id: "timeline", label: "Schedule", href: "#timeline" },
  { id: "details", label: "Details", href: "#details" },
  { id: "faqs", label: "FAQs", href: "#faqs" },
];

export default function Navbar({ hidden = false }) {
  const [activeSection, setActiveSection] = useState("landing");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // A percentage threshold never fires for a section taller than the viewport,
      // so track a thin reading line instead of area coverage.
      { root: null, rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`navbar ${hidden ? "navbar--hidden" : ""} ${activeSection !== "landing" ? "navbar--scrolled" : ""}`}
      >
        <a
          href="#landing"
          className={`navbar__logo font-decorative2 ${activeSection === "landing" ? "navbar__logo--active" : ""}`}
        >
          J & S
        </a>
        <div className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`navbar__link font-text ${activeSection === link.id ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button text="My Table" href="seating.html" classes="navbar__cta font-text" />
      </nav>

      <button
        className={`navbar-burger ${hidden ? "navbar--hidden" : ""} ${menuOpen ? "navbar-burger--open" : ""} ${activeSection !== "landing" ? "navbar-burger--scrolled" : ""}`}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-menu ${menuOpen ? "navbar-menu--open" : ""}`}>
        <div className="navbar-menu__content">
          <div className="navbar-menu__header">
            <p className="navbar-menu__names font-decorative3">Josip & Storm</p>
            <p className="navbar-menu__date font-text">12.09.2026</p>
          </div>
          <div className="navbar-menu__links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="navbar-menu__link font-text"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button
            text="My Table"
            href="seating.html"
            classes="navbar-menu__cta font-text"
            onClick={closeMenu}
          />
        </div>
      </div>
    </>
  );
}
