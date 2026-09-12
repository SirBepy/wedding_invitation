import { useMemo, useRef, useState } from "react";
import SearchField from "../Rsvp/SearchField";
import { SEATING, TABLE_COUNT } from "../../data/seating";
import "./Seating.scss";

export default function Seating() {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const tableRefs = useRef([]);

  const guests = useMemo(
    () => SEATING.map((g, i) => ({ ...g, rowNumber: i })),
    []
  );

  const tables = useMemo(() => {
    const groups = Array.from({ length: TABLE_COUNT }, (_, i) => ({
      number: i + 1,
      guests: [],
    }));
    SEATING.forEach((g) => groups[g.table - 1].guests.push(g));
    return groups;
  }, []);

  function handleSelect(guest) {
    setSelectedGuest(guest);
    const card = tableRefs.current[guest.table - 1];
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section id="seating" className="section">
      <div className="seating-content">
        <h1>Seating</h1>
        <p className="font-text seating-subtitle">Find your table</p>

        <SearchField
          guests={guests}
          onSelect={handleSelect}
          placeholder="Search your name..."
        />

        {selectedGuest && (
          <div className="seating-result">
            <p className="font-text seating-result__name">
              {selectedGuest.name}
            </p>
            <p className="font-decorative1 seating-result__table">
              Table {selectedGuest.table}
            </p>
          </div>
        )}

        <div className="seating-grid">
          {tables.map((table) => (
            <div
              key={table.number}
              ref={(el) => {
                tableRefs.current[table.number - 1] = el;
              }}
              className={`seating-table ${
                selectedGuest?.table === table.number
                  ? "seating-table--active"
                  : ""
              }`}
            >
              <p className="font-decorative1 seating-table__header">
                Table {table.number}
              </p>
              <ul className="seating-table__list">
                {table.guests.map((guest) => (
                  <li
                    key={guest.name}
                    className={`font-text seating-table__guest ${
                      selectedGuest?.name === guest.name
                        ? "seating-table__guest--highlight"
                        : ""
                    }`}
                  >
                    {guest.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
