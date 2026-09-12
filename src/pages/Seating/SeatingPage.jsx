import { useEffect, useMemo, useRef, useState } from "react";
import Background from "../../components/Background/Background";
import { SEATING, TABLE_COUNT } from "../../data/seating";
import "./SeatingPage.scss";

// Guests sorted once at module scope (static data) so both the A-to-Z and
// by-table views can share the same array without re-sorting per render.
// `id` = original array index, stable and unique, used as the React key
// and to identify the currently selected/highlighted row.
const ALL_GUESTS = SEATING.map((g, i) => ({ ...g, id: i })).sort((a, b) =>
  a.name.localeCompare(b.name, "hr"),
);

const TABLES = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

// NFD strips most diacritics (Sivrić -> Sivric); đ/Đ don't decompose under
// NFD so they're mapped by hand.
function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function matchesQuery(name, query) {
  if (!query) return true;
  const n = normalize(name);
  const q = normalize(query);
  if (n.includes(q)) return true;
  return n.split(" ").some((word) => word.startsWith(q));
}

function groupByLetter(guests) {
  const groups = [];
  for (const guest of guests) {
    const letter = guest.name[0].toUpperCase();
    const current = groups[groups.length - 1];
    if (current && current.letter === letter) {
      current.guests.push(guest);
    } else {
      groups.push({ letter, guests: [guest] });
    }
  }
  return groups;
}

function Row({ guest, selected, onSelect, showTable = true }) {
  return (
    <button
      type="button"
      className={`sp-row${selected ? " sp-row--selected" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(guest)}
    >
      <span className="sp-row-name">{guest.name}</span>
      {showTable && (
        <>
          <span className="sp-row-leader" aria-hidden="true" />
          <span className="sp-row-table">{guest.table}</span>
        </>
      )}
    </button>
  );
}

export default function SeatingPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("az");
  const [selectedId, setSelectedId] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(null);

  const inputRef = useRef(null);
  const tableRefs = useRef({});

  // Autofocus only on desktop: on phones the keyboard would cover the list
  // the moment the page loads, before a guest has read anything.
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
  }, []);

  const trimmedQuery = query.trim();
  const filteredGuests = useMemo(
    () =>
      trimmedQuery
        ? ALL_GUESTS.filter((g) => matchesQuery(g.name, trimmedQuery))
        : ALL_GUESTS,
    [trimmedQuery],
  );

  const azGroups = useMemo(() => groupByLetter(filteredGuests), [filteredGuests]);

  // A single match while typing counts as a result even without a tap;
  // a tap always wins once the guest list itself hasn't changed underneath it.
  const autoMatchId =
    trimmedQuery && filteredGuests.length === 1 ? filteredGuests[0].id : null;
  const activeId = selectedId ?? autoMatchId;
  const resultGuest = activeId != null ? ALL_GUESTS.find((g) => g.id === activeId) : null;

  // Runs after the by-table view has rendered its cards, so the ref exists.
  useEffect(() => {
    if (view !== "tables" || scrollTarget == null) return;
    tableRefs.current[scrollTarget]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setScrollTarget(null);
  }, [view, scrollTarget]);

  function handleQueryChange(e) {
    setQuery(e.target.value);
    setSelectedId(null);
  }

  function handleClear() {
    setQuery("");
    setSelectedId(null);
    inputRef.current?.focus();
  }

  function handleSelect(guest) {
    setSelectedId(guest.id);
  }

  function handleShowTable() {
    if (!resultGuest) return;
    setScrollTarget(resultGuest.table);
    setView("tables");
  }

  function handleChipClick(table) {
    setScrollTarget(table);
    setView("tables");
  }

  const noMatches = trimmedQuery && filteredGuests.length === 0;

  return (
    <>
      <Background hidden={false} />
      <div className="sp-page">
        <header className="sp-header">
          <a href="./" className="sp-back font-decorative2">
            J & S
          </a>
          <h1>Seating</h1>
          <p className="font-text sp-subtitle">Find your name, then your table</p>
        </header>

        <div className="sp-toolbar">
          <div className="sp-search-wrap">
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Search your name..."
              aria-label="Search your name"
              className="sp-search font-text"
              value={query}
              onChange={handleQueryChange}
            />
            {query && (
              <button
                type="button"
                className="sp-clear"
                aria-label="Clear search"
                onClick={handleClear}
              >
                ×
              </button>
            )}
          </div>

          <div className="sp-toggle" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              aria-selected={view === "az"}
              className={`sp-tab${view === "az" ? " sp-tab--active" : ""}`}
              onClick={() => setView("az")}
            >
              A to Z
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "tables"}
              className={`sp-tab${view === "tables" ? " sp-tab--active" : ""}`}
              onClick={() => setView("tables")}
            >
              By table
            </button>
          </div>
        </div>

        {trimmedQuery && (
          <p className="sp-count font-text-2">
            {filteredGuests.length} guest{filteredGuests.length === 1 ? "" : "s"} match
          </p>
        )}

        {resultGuest && (
          <div className="sp-result" aria-live="polite">
            <div className="sp-result-name font-text">{resultGuest.name}</div>
            <div className="sp-result-table font-decorative1">Table {resultGuest.table}</div>
            <button type="button" className="sp-show-table-link font-text-2" onClick={handleShowTable}>
              Show table
            </button>
          </div>
        )}

        <main className="sp-main">
          {noMatches ? (
            <p className="sp-empty font-text-2">
              No one found for “{query}”. Try a shorter part of the name, or ask at the entrance.
            </p>
          ) : view === "az" ? (
            <div className="sp-az">
              {azGroups.map((group) => (
                <section key={group.letter} className="sp-letter-group">
                  <div className="sp-letter font-text">{group.letter}</div>
                  {group.guests.map((guest) => (
                    <Row
                      key={guest.id}
                      guest={guest}
                      selected={guest.id === activeId}
                      onSelect={handleSelect}
                    />
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="sp-tables">
              <div className="sp-chips">
                {TABLES.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="sp-chip"
                    aria-label={`Jump to table ${n}`}
                    onClick={() => handleChipClick(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="sp-table-grid">
                {TABLES.map((n) => {
                  const guests = filteredGuests.filter((g) => g.table === n);
                  if (trimmedQuery && guests.length === 0) return null;
                  return (
                    <div
                      key={n}
                      className="sp-table"
                      ref={(el) => {
                        tableRefs.current[n] = el;
                      }}
                    >
                      <div className="sp-table-header font-decorative1">Table {n}</div>
                      <div className="sp-table-list">
                        {guests.map((guest) => (
                          <Row
                            key={guest.id}
                            guest={guest}
                            selected={guest.id === activeId}
                            onSelect={handleSelect}
                            showTable={false}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        <footer className="sp-footer font-text">
          <p>Table numbers are on each table · Hotel Storia, 12.09.2026</p>
          <a href="./">Back to the invitation</a>
        </footer>
      </div>
    </>
  );
}
