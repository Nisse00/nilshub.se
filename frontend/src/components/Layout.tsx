import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { LINKS, PROFILE } from "../data/profile";

export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="site-logo">
          nilshub.se
        </Link>
        <nav className="site-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/cv">CV</NavLink>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span className="site-footer-links">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </span>
      </footer>
    </div>
  );
}
