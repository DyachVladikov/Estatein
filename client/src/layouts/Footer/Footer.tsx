import Logo from "@/components/Logo";
import "./Footer.scss";
import Icon from "@/components/Icon";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import useAutoScroll from "@/hooks/useAutoScroll";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import useApi from "@/hooks/useApi";

interface IsFormError {
  hasErorr: boolean;
  description: string;
}

interface Response {
  ok: number;
  message: string;
}

const Footer = () => {
  const footerData = [
    {
      column: "Home",
      items: [
        { name: "Hero section", ref: "dream" },
        { name: "Features", ref: "features" },
        { name: "Testimonials", ref: "testimonials" },
        { name: "FAQ's", ref: "faqs" },
      ],
      hrefpage: "/",
    },
    {
      column: "About Us",
      items: [
        { name: "Our Story", ref: "data-js-story" },
        { name: "Our Works", ref: "data-js-works" },
        { name: "How It Works", ref: "data-js-how-it-works" },
        { name: "Our Clients", ref: "data-js-clients" },
      ],
      hrefpage: "about-us",
    },
    {
      column: "Properties",
      items: [
        { name: "Portfolio", ref: "data-js-portfolio" },
        { name: "Categories", ref: "data-js-categories" },
      ],
      hrefpage: "properties",
    },
    {
      column: "Services",
      items: [
        { name: "Valuation Mastery", ref: "data-js-valuation-mastery" },
        { name: "Strategic Marketing", ref: "data-js-strategic-marketing" },
        { name: "Negotiation Wizardry", ref: "data-js-negotiation-wizardry" },
        { name: "Property Management", ref: "data-js-property-management" },
      ],
      hrefpage: "services",
    },
    {
      column: "Contact",
      items: [
        { name: "Contact Form", ref: "data-js-contact-form" },
        { name: "Our Offices", ref: "data-js-offices" },
      ],
      hrefpage: "contact",
    },
  ];
  const soc1als = [
    {
      name: "facebook",
      href: "/",
    },
    {
      name: "in",
      href: "/",
    },
    {
      name: "twitter",
      href: "/",
    },
    {
      name: "youtube",
      href: "/",
    },
  ];

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFormInvalid, setIsFormInvalid] = useState<IsFormError>({
    hasErorr: false,
    description: "",
  });
  const [succsesSell, setSuccsesSell] = useState<boolean>(false);

  const scrollToSection = useAutoScroll();
  const { sendData } = useApi<String>("emails");

  useEffect(() => {
    setTimeout(
      () => {
        setIsFormInvalid({ hasErorr: false, description: "" });
        setSuccsesSell(false);
      },
      1000 * 60 * 0.3,
    );
  }, [isFormInvalid, succsesSell]);

  const FormSubmit = (el: React.FormEvent) => {
    el.preventDefault();
    const inputValue = inputRef.current?.value || "";
    if (inputValue === "") {
      setIsFormInvalid({
        hasErorr: true,
        description: "*Write something before selling",
      });
    } else if (inputValue != "" && !inputValue.includes("@")) {
      setIsFormInvalid({ hasErorr: true, description: "*Its not email" });
    } else {
      sendData(
        { email: inputValue },
        {
          onSuccess: (res: Response) => {
            if (res.ok === 200) {
              setIsFormInvalid({ hasErorr: false, description: "" });
              setSuccsesSell(true);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
            if (res.ok != 200)
              setIsFormInvalid({ hasErorr: true, description: res.message });
          },
          onError: (error) => {
            setIsFormInvalid({ hasErorr: true, description: error.message });
          },
        },
      );
    }
  };

  return (
    <footer className="footer ">
      <div className="footer__wrapper container">
        <div className="footer__main">
          <form
            className="footer__main-form"
            onSubmit={(el) => {
              FormSubmit(el);
            }}
          >
            <Logo />
            <div
              className={classNames(
                "footer__main-input-wrapper",
                { error: isFormInvalid.hasErorr },
                { succses: succsesSell },
              )}
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
            {(isFormInvalid.hasErorr || succsesSell) && (
              <span
                className="footer__main-form-message"
                style={{
                  color: isFormInvalid.hasErorr
                    ? "var(--color-error)"
                    : "var(--color-purple-70)",
                }}
              >
                {isFormInvalid.hasErorr ? isFormInvalid.description : "Succses"}
              </span>
            )}
          </form>
          <nav className="footer__table-menu footer__table">
            {footerData.map((column, index) => (
              <ul className="footer__table-list" key={`footer-list-${index}`}>
                <Link
                  to={column.hrefpage}
                  className="description"
                  style={{ height: "auto" }}
                >
                  <span className="footer__table-head">{column.column}</span>
                </Link>

                {column.items.map((item, index) => (
                  <li
                    className="footer__table-item"
                    key={`footer-item-${index}`}
                  >
                    <Button
                      className="footer__table-button"
                      title={item.name}
                      label={item.name}
                      mode="text-only"
                      onClick={() => {
                        scrollToSection(item.ref);
                      }}
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
          <div className="footer__links-soc1als">
            <ul className="footer__links-soc1als-list">
              {soc1als.map((item, index) => (
                <li key={`footer-${item.name}-${index}`}>
                  <div className="footer__links-soc1als-item">
                    <div className="footer__links-soc1als-wrapper">
                      <Icon name={item.name} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
