import LocationButton from "../../components/LocationButton/LocationButton";
import "./Info.scss";

const places = [
  {
    icon: "icons/church.svg",
    title: "Ceremony",
    lines: ["Church of Saint James", "Međugorje", "16:00"],
    link: "https://maps.app.goo.gl/srK3JGs34MgFSgfi9",
  },
  {
    icon: "icons/drinks.svg",
    title: "Welcome Party & Reception",
    lines: [
      "Hotel Storia",
      "Tasovčići bb, 88300",
      "Bosnia & Herzegovina",
      "from 13:00 · venue opens 18:00",
    ],
    link: "https://maps.app.goo.gl/Niw21p7dzi6Ryziq9",
  },
];

const timetable = [
  { time: "13:00", event: "Welcome Party", place: "Hotel Storia" },
  {
    time: "16:00",
    event: "Catholic Ceremony",
    place: "Church of Saint James, Međugorje",
  },
  { time: "18:00", event: "Venue Open", place: "Hotel Storia" },
  { time: "23:00", event: "Desserts & Cake", place: "Hotel Storia" },
  { time: "03:00", event: "The End", place: "" },
];

export default function Info() {
  return (
    <section id="info" className="section">
      <div className="info-content">
        <h1>The Day</h1>
        <p className="font-text info-subtitle">Saturday, 12 September 2026</p>

        <div className="info-places">
          {places.map((place) => (
            <div key={place.title} className="info-place">
              <img
                className="info-place__icon"
                src={place.icon}
                alt=""
                loading="lazy"
              />
              <span className="font-decorative2 info-place__title">
                {place.title}
              </span>
              <div className="font-text info-place__lines">
                {place.lines.map((line, i) => (
                  <span
                    key={line}
                    className={
                      i === place.lines.length - 1
                        ? "info-place__line info-place__line--time"
                        : "info-place__line"
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>
              <LocationButton
                texts={["Open in Google Maps"]}
                link={place.link}
                layout="horizontal"
              />
            </div>
          ))}
        </div>

        <ul className="info-timetable">
          {timetable.map((item) => (
            <li key={item.time} className="info-timetable__row">
              <span className="font-decorative1 info-timetable__time">
                {item.time}
              </span>
              <div className="info-timetable__details">
                <span className="font-text info-timetable__event">
                  {item.event}
                </span>
                {item.place && (
                  <span className="font-text info-timetable__place">
                    {item.place}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="font-text info-note">
          Dress code: Formal · Free parking at Hotel Storia
        </p>
      </div>
    </section>
  );
}
