import type { RefObject } from "react";
import { img } from "@/utils/RepairOmgSrc";
import "./Explore.scss";
import useTypewriter from "@/hooks/useTypewriter";

type gridValues =
  | { type: "img"; src: string; gridArea: string }
  | { type: "text"; title: string; description: string; gridArea: string };

const EXPLORE_TEXT =
  "Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better.";

const Explore = () => {
  const { displayed, isDone, ref } = useTypewriter(EXPLORE_TEXT);
  const gridValues: gridValues[] = [
    {
      type: "img",
      src: "/images/ExploreWorld/1.png",
      gridArea: "1 / 1 / 2 / 3",
    },
    {
      type: "img",
      src: "/images/ExploreWorld/2.png",
      gridArea: "2 / 1 / 3 / 3",
    },
    {
      type: "img",
      src: "/images/ExploreWorld/3.png",
      gridArea: "1 / 3 / 2 / 5",
    },
    {
      type: "img",
      src: "/images/ExploreWorld/4.png",
      gridArea: "2 / 3 / 3 / 4",
    },
    {
      type: "img",
      src: "/images/ExploreWorld/5.png",
      gridArea: "2 / 4 / 3 / 5",
    },
    {
      type: "text",
      title: "Explore Estatein's World",
      gridArea: "3 / 1 / 4 / 3",
      description: EXPLORE_TEXT,
    },
    {
      type: "img",
      src: "/images/ExploreWorld/6.png",
      gridArea: "3 / 3 / 4 / 5",
    },
  ];

  return (
    <section className="explore section container">
      <div className="explore__body">
        {gridValues.map((item) => {
          if (item.type === "img")
            return (
              <img
                className="explore__body-img"
                src={item.src}
                style={{ gridArea: item.gridArea }}
                key={item.src}
              />
            );
          if (item.type === "text")
            return (
              <div
                className="explore__body-text-block"
                style={{ gridArea: item.gridArea }}
                key={item.title}
              >
                <img className="section-stars" src={img("/icons/stars.svg")} />
                <h2 className="explore__body-title">{item.title}</h2>
                <p
                  ref={ref as RefObject<HTMLParagraphElement>}
                  className={`explore__body-description description${isDone ? " section-description--done" : ""}`}
                >
                  {displayed}
                </p>
              </div>
            );
        })}
      </div>
    </section>
  );
};

export default Explore;
