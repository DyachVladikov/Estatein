import Logo from "@/components/Logo";
import "./Footer.scss";
import Icon from "@/components/Icon";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import useAutoScroll from "@/hooks/useAutoScroll";
import classNames from "classnames";
import { useEmailForm } from "./useEmailForm";
const FOOTER_DATA = [
  {
    column: "Home",
    hrefpage: "",
    items: [
      { name: "Hero section", ref: "dream" },
      { name: "Features", ref: "features" },
      { name: "Testimonials", ref: "testimonials" },
      { name: "FAQ's", ref: "faqs" },
    ],
  },
  {
    column: "About Us",
    hrefpage: "about-us",
    items: [
      { name: "Our Story", ref: "data-js-story" },
      { name: "Our Works", ref: "data-js-works" },
      { name: "How It Works", ref: "data-js-how-it-works" },
      { name: "Our Clients", ref: "data-js-clients" },
    ],
  },
  {
    column: "Properties",
    hrefpage: "properties",
    items: [
      { name: "Portfolio", ref: "data-js-properties" },
      { name: "Categories", ref: "data-js-properties" },
    ],
  },
  {
    column: "Services",
    hrefpage: "service",
    items: [
      { name: "Valuation Mastery", ref: "data-js-valuation-mastery" },
      { name: "Property Management", ref: "data-js-property-management" },
      { name: "Strategic Marketing", ref: "data-js-strategic-marketing" },
    ],
  },
  {
    column: "Contact",
    hrefpage: "contact-us",
    items: [
      { name: "Contact Form", ref: "data-js-contact-form" },
      { name: "Our Offices", ref: "data-js-offices" },
    ],
  },
] as const;

const SOCIALS = [
  { name: "facebook", href: "/" },
  { name: "in", href: "/" },
  { name: "twitter", href: "/" },
  { name: "youtube", href: "/" },
] as const;

const Footer = () => {
  const scrollToSection = useAutoScroll();
  const { inputRef, status, message, handleSubmit } = useEmailForm();

  return (
    <footer className="footer">
      <div className="footer__wrapper container">
        <div className="footer__main">
          <form className="footer__main-form" onSubmit={handleSubmit}>
            <Logo />
            <div
              className={classNames("footer__main-input-wrapper", {
                error: status === "error",
                success: status === "success",
              })}
            >
              <div className="footer__main-letter-wrapper">
                <Icon
                  name="letter"
                  color="var(--color-gray-60)"
                  userSelect={false}
                  strokeFill={false}
                />
              </div>
              <input
                id="footer-input"
                className="footer-input"
                placeholder="Enter Your Email"
                ref={inputRef}
              />
              <div className="footer__main-sell-wrapper">
                <Button
                  className="footer__main-sell-button"
                  hasOnlyIcon
                  iconName="sell"
                  title="sell"
                  type="submit"
                />
              </div>
            </div>
            {status !== "idle" && (
              <span
                className={classNames("footer__main-form-message", {
                  "footer__main-form-message--error": status === "error",
                  "footer__main-form-message--success": status === "success",
                })}
              >
                {message}
              </span>
            )}
          </form>

          <nav className="footer__table-menu footer__table">
            {FOOTER_DATA.map((column, index) => (
              <ul className="footer__table-list" key={`footer-list-${index}`}>
                <Link
                  to={`/${column.hrefpage}`}
                  className="description"
                  style={{ height: "auto" }}
                >
                  <span className="footer__table-head">{column.column}</span>
                </Link>
                {column.items.map((item, i) => (
                  <li className="footer__table-item" key={`footer-item-${i}`}>
                    <Button
                      className="footer__table-button"
                      title={item.name}
                      label={item.name}
                      mode="text-only"
                      onClick={() =>
                        scrollToSection(item.ref, `/${column.hrefpage}`)
                      }
                    />
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="footer__links">
          <div className="footer__links-info">
            <span>@2026 Estatein. All Rights Reserved.</span>
            <span>Terms & Conditions</span>
          </div>
          <ul className="footer__links-socials-list">
            {SOCIALS.map((item, index) => (
              <li key={`footer-${item.name}-${index}`}>
                <div className="footer__links-socials-item">
                  <div className="footer__links-socials-wrapper">
                    <Icon name={item.name} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
