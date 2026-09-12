import LocationButton from "../../components/LocationButton/LocationButton";
import "./Timeline.scss";

const BASE = "";
// const BASE = import.meta.env.BASE_URL;

const timelineItems = [
  { time: "13:00", icon: `${BASE}icons/sign.svg`, title: "Welcome<br/>Party" },
  {
    time: "16:00",
    icon: `${BASE}icons/church.svg`,
    title: "Catholic<br/>Ceremony",
  },
  { time: "18:00", icon: `${BASE}icons/drinks.svg`, title: "Venue Open" },
  {
    time: "23:00",
    icon: `${BASE}icons/cake.svg`,
    title: "Desserts &<br/>Cake",
  },
  { time: "3:00", icon: `${BASE}icons/car.svg`, title: "The End" },
];

const locations = [
  {
    texts: ["Church of Saint James", "Međugorje"],
    link: "https://maps.app.goo.gl/srK3JGs34MgFSgfi9",
  },
  {
    texts: ["Hotel Storia", "Tasovčići bb, 88300"],
    link: "https://maps.app.goo.gl/Niw21p7dzi6Ryziq9",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="timeline-content">
        <h1>Wedding Timeline</h1>

        <div className="timeline">
          {timelineItems.map((item) => (
            <div key={item.time} className="timeline__item">
              <span className="timeline__time font-decorative1">
                {item.time}
              </span>
              <div className="timeline__line-col">
                <div className="timeline__dot"></div>
              </div>
              <img className="timeline__icon" src={item.icon} alt="" />
              <span
                className="timeline__title font-decorative2"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
            </div>
          ))}
        </div>

        <div className="timeline-locations">
          {locations.map((loc) => (
            <LocationButton
              key={loc.link}
              texts={loc.texts}
              link={loc.link}
              layout="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
