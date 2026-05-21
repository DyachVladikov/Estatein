import { type RefObject } from "react";
import "./Journey.scss";
import Statistic from "@/components/Statistic";
import { img } from "@/utils/RepairOmgSrc";
import useTypewriter from "@/hooks/useTypewriter";

const TEXT = "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients.";

const Journey = () => {
  const { displayed, isDone, ref } = useTypewriter(TEXT);
  const statistic = [
    {
      count: 200,
      description: "Happy Customers",
    },
    {
      count: "10k",
      description: "Properties For Clients",
    },
    {
      count: 16,
      description: "Years of Experience",
    },
  ] as const;

  return (
    <section className="journey container" data-js-section={"data-js-story"}>
      <div className="journey__info">
        <img className="section-stars" src={img("icons/stars.svg")} />
        <div className="journey__info-label">
          <h1 className="h2">Our Journey</h1>
        </div>
        <div className="journey__info-description description">
          <p ref={ref as RefObject<HTMLParagraphElement>} className={isDone ? "section-description--done" : ""}>{displayed}</p>
        </div>
        <div className="journey__info-blocks">
          <ul className="journey__info-statistic-list">
            {statistic.map((item, index) => (
              <li
                className="journey__info-statistic-item"
                key={`statistic-${index}`}
              >
                <Statistic {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="journey-images">
        <img
          className="journey-img"
          src={img("images/AboutUsPage/house.png")}
        />
        <img
          className="journey-img--bg"
          src={img("images/AboutUsPage/houseBG.png")}
        />
      </div>
    </section>
  );
};

export default Journey;
