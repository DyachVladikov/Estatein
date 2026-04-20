import type React from "react";
import "./Tabs.scss";
import Button from "../Button";
import { useState } from "react";
import classNames from "classnames";

interface TbasProps {
  headers: readonly HeadersTypes[];
  cards: Cards[];
}
export type HeadersTypes = "All" | "Regional" | "International";
type Cards = {
  cards: React.ReactNode[] | null;
  id: HeadersTypes[];
};

const Tabs = (props: TbasProps) => {
  const { headers, cards } = props;

  const [activeTab, setActiveTab] = useState<HeadersTypes>("All");
  return (
    <div className="tabs">
      <div className="tabs__headers-wrapper">
        <div className="tabs__headers">
          {headers.map((headerTitle, index) => (
            <Button
              className={classNames("tabs__headers-button", {
                "tab-active": activeTab === headerTitle,
              })}
              title={headerTitle}
              label={headerTitle}
              onClick={() => {
                setActiveTab(headerTitle);
              }}
              key={`${headerTitle}-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="tabs__main">
        {(() => {
          const filtered = cards?.filter(
            (card) => activeTab === "All" || card.id.includes(activeTab),
          );
          return filtered?.length ? (
            filtered.map((card, index) => (
              <div className="tabs__main-card" key={index}>
                {card.cards}
              </div>
            ))
          ) : (
            <h3 className="tabs-no-info" style={{ fontWeight: 500 }}>
              There is no information at the moment
            </h3>
          );
        })()}
      </div>
    </div>
  );
};

export default Tabs;
