import LearnMore from "@/components/LearnMore";
import "./Header.scss";
import Logo from "@/components/Logo";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";
import Button from "@/components/Button";

const Header = () => {
  const path = useLocation();

  const Links = [
    {
      NAME: "Home",
      LINK: "/",
    },
    {
      NAME: "About Us",
      LINK: "/about-us",
    },
    {
      NAME: "Properties",
      LINK: "/properties",
    },
    {
      NAME: "Services",
      LINK: "/service",
    },
  ] as const;

  const [isStuck, setIsStuck] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const stickyRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = stickyRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setIsStuck(rect.top <= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const htmlEl = document.querySelector("[data-js-html]");
    htmlEl?.classList.toggle("is-lock", isModalOpen);
  }, [isModalOpen]);

  const navigation = (
    <nav
      className={classNames("header__navigation", {
        "hidden-mobile": !isModalOpen,
      })}
    >
      <ul
        className={classNames("header__navigation-list", {
          "in-modal": isModalOpen,
        })}
      >
        {Links.map((item, index) => (
          <li className="header__navigation-list" key={`${item} - ${index}`}>
            <Link
              to={item.LINK}
              className=""
              onClick={() => {
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 500);
              }}
            >
              <span
                className={classNames(
                  "header__navigation-link",
                  { "is-active": path.pathname === item.LINK },
                  { "header__modal-link": isModalOpen },
                )}
              >
                {item.NAME}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      <LearnMore />
      <header
        ref={stickyRef}
        className={classNames("header container", { sticky: isStuck })}
      >
        <Logo />
        {navigation}
        <Link
          to={"/contact-us"}
          className="header__button-contact-us-link hidden-mobile"
        >
          <span className="header__button-contact-us">Contact US</span>
        </Link>
        <Button
          className="header-burger-button visible-mobile"
          title="Open Menu"
          hasOnlyIcon
          iconName="burgerButton"
          onClick={useCallback(() => {
            setIsModalOpen(true);
          }, [])}
        />
      </header>

      <div className={classNames("header__modal", { "is-open": isModalOpen })}>
        <Button
          className="header__modal-close-button"
          title="Close Menu"
          hasOnlyIcon
          iconName="x-mark"
          onClick={useCallback(() => {
            setIsModalOpen(false);
          }, [])}
        />
        {navigation}
        <Link
          to="/contact-us"
          className="header__modal-contact-link"
          onClick={() => setIsModalOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default Header;
