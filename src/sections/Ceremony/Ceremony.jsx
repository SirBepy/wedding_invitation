import { useState } from "react";
import { RITE_PARTS } from "../../data/rite";
import "./Ceremony.scss";

function RiteBlock({ block }) {
  switch (block.type) {
    case "heading":
      return <p className="ceremony-block ceremony-block--heading">{block.text}</p>;
    case "rubric":
      return <p className="ceremony-block ceremony-block--rubric">{block.text}</p>;
    case "priest":
      return (
        <p className="ceremony-block ceremony-block--priest">
          {block.label && <strong>{block.label}: </strong>}
          {block.text}
        </p>
      );
    case "people":
      return (
        <p className="ceremony-block ceremony-block--people">
          <strong>{block.label ?? "All"}: </strong>
          {block.text}
        </p>
      );
    case "lines": {
      const content = block.lines.map((line, i) => (
        <span key={i} className="ceremony-line">
          {line}
        </span>
      ));
      return block.speaker === "people" ? (
        <div className="ceremony-block ceremony-block--people">{content}</div>
      ) : (
        <div className="ceremony-block ceremony-block--lines">{content}</div>
      );
    }
    case "text":
    default:
      return <p className="ceremony-block ceremony-block--text">{block.text}</p>;
  }
}

export default function Ceremony() {
  const [openIndex, setOpenIndex] = useState(null);

  function togglePart(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section id="ceremony" className="section">
      <div className="ceremony-content">
        <h1>The Ceremony</h1>
        <p className="ceremony-intro font-text">
          Order of Service
          <br />
          Church of Saint James, Medugorje &middot; 16:00
        </p>
        <p className="ceremony-legend font-text-2">
          Responses spoken by everyone are highlighted, like{" "}
          <span className="ceremony-legend__chip">this</span>.
        </p>
        <div className="ceremony-accordion">
          {RITE_PARTS.map((rite, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={rite.title}
                className={`ceremony-item ${isOpen ? "ceremony-item--open" : ""}`}
              >
                <button
                  className="ceremony-item__header"
                  onClick={() => togglePart(i)}
                >
                  <span className="ceremony-item__label">
                    <span className="ceremony-item__part font-text">{rite.part}</span>
                    <span className="ceremony-item__title font-text">{rite.title}</span>
                  </span>
                  <span className="ceremony-item__arrow"></span>
                </button>
                {isOpen && (
                  <div className="ceremony-item__body font-text-2">
                    {rite.blocks.map((block, bi) => (
                      <RiteBlock key={bi} block={block} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="ceremony-note font-text-2">
          Anyone not presently disposed to receive the Eucharist is warmly invited to receive a
          blessing from the priest: fold your arms across your chest and slightly bow your head.
        </p>
        <a
          href="rite-of-marriage.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-text ceremony-download"
        >
          Download the full booklet (PDF)
        </a>
      </div>
    </section>
  );
}
