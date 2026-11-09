import React from "react";
import userData from "@constants/data";
import { BrandIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__statement">
          Shoot a <a href={`mailto:${userData.email}`}>mail</a> and I&rsquo;ll get back. I swear.
        </p>
        <div className="footer__base">
          <p className="footer__legal">&copy; Azuan Alias. All Rights Reserved.</p>
          <div className="footer__social">
            <a href={userData.socialLinks.threads} target="_blank" rel="noreferrer" aria-label="Open Threads profile" className="icon-btn">
              <span className="visually-hidden">Threads</span>
              <BrandIcon name="threads" />
            </a>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
