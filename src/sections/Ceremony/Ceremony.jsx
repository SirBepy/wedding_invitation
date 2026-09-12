import Button from "../../components/Button/Button";
import "./Ceremony.scss";

export default function Ceremony() {
  return (
    <section id="ceremony" className="section">
      <div className="ceremony-content">
        <h1>The Ceremony</h1>
        <p className="font-text ceremony-subtitle">
          <span>Church of Saint James, Međugorje</span>
          <span className="ceremony-subtitle__time">16:00</span>
        </p>
        <p className="font-text-2 ceremony-text">
          The wedding is a full Catholic Mass, about one hour. Open the
          booklet on your phone to follow the readings, vows and responses.
        </p>
        <Button
          text="Rite of Marriage (PDF)"
          href="rite-of-marriage.pdf"
          classes="ceremony-download font-text"
        />
        <p className="font-text-2 ceremony-note">
          Not receiving communion? You are warmly invited to come forward for
          a blessing: fold your arms across your chest and slightly bow your
          head.
        </p>
      </div>
    </section>
  );
}
