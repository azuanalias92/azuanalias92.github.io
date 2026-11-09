import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "@constants/data";
import { BrandIcon } from "./SocialIcons";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = (href) => (router.asPath === href ? "page" : undefined);

  return (
    <header className="nav">
      <div className="container nav__bar">
        <Link href="/" className="nav__mark" aria-label={`${userData.name}, home`}>
          <span className="nav__name">{userData.name}</span>
          <span className="nav__role">{userData.designation}</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav__link" aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__tools">
          <a href={userData.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram profile" className="icon-btn">
            <span className="visually-hidden">Instagram</span>
            <BrandIcon name="instagram" />
          </a>
          <a href={userData.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Open Twitter profile" className="icon-btn">
            <span className="visually-hidden">Twitter</span>
            <BrandIcon name="twitter" />
          </a>
          <a href={userData.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="icon-btn">
            <span className="visually-hidden">LinkedIn</span>
            <BrandIcon name="linkedin" />
          </a>
          <button aria-label="Toggle Dark Mode" type="button" className="icon-btn icon-btn--key" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" focusable="false">
                {theme === "dark" ? (
                  <>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
                  </>
                ) : (
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="nav__links-mobile container" aria-label="Main, small screens">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="nav__link" aria-current={current(l.href)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
