import LearnMore from "@/components/LearnMore";
import "./Header.scss";
import Logo from "@/components/Logo";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Button from "@/components/Button";

const LINKS = [
  { NAME: "Home", LINK: "/" },
  { NAME: "About Us", LINK: "/about-us" },
  { NAME: "Properties", LINK: "/properties" },
  { NAME: "Services", LINK: "/service" },
] as const;

const Header = () => {
  const path = useLocation();

  const [isStuck, setIsStuck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean | "closing">(false);
  const stickyRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = stickyRef.current;
      if (!element) return;
      setIsStuck(element.getBoundingClientRect().top <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document
      .querySelector("[data-js-html]")
      ?.classList.toggle("is-lock", isModalOpen === true);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen("closing");
    setTimeout(() => setIsModalOpen(false), 300);
  };
  const openModal = () => setIsModalOpen(true);

  const renderLinks = (onLinkClick?: () => void) =>
    LINKS.map((item, index) => (
      <li className="header__navigation-item" key={`${item.NAME}-${index}`}>
        <Link to={item.LINK} onClick={onLinkClick} className="">
          <span
            className={classNames("header__navigation-link", {
              "is-active": path.pathname === item.LINK,
            })}
          >
            {item.NAME}
          </span>
        </Link>
      </li>
    ));

  return (
    <>
      <LearnMore />
      <header
        ref={stickyRef}
        className={classNames("header container", { sticky: isStuck })}
      >
        <Logo />
        <nav className="header__navigation hidden-mobile">
          <ul className="header__navigation-list">{renderLinks()}</ul>
        </nav>
        <Link
          to="/contact-us"
          className="header__button-contact-us-link hidden-mobile"
        >
          <span className="header__button-contact-us">Contact US</span>
        </Link>
        <Button
          className="header-burger-button visible-mobile"
          title="Open Menu"
          hasOnlyIcon
          iconName="burgerButton"
          onClick={openModal}
        />
      </header>

      <div
        className={classNames("header__modal", {
          "is-open": isModalOpen === true,
          "is-closing": isModalOpen === "closing",
        })}
      >
        <Button
          className="header__modal-close-button"
          title="Close Menu"
          hasOnlyIcon
          iconName="x-mark"
          onClick={closeModal}
        />
        <nav className="header__navigation in-modal">
          <ul className="header__navigation-list in-modal">
            {renderLinks(closeModal)}
          </ul>
        </nav>
        <Link
          to="/contact-us"
          className="header__modal-contact-link"
          onClick={closeModal}
        >
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default Header;
