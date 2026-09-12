import { useState, useEffect } from "react";
import Background from "./components/Background/Background";
import Envelope from "./components/Envelope/Envelope";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./sections/Landing/Landing";
import Info from "./sections/Info/Info";
import Ceremony from "./sections/Ceremony/Ceremony";
import Details from "./sections/Details/Details";
import Timeline from "./sections/Timeline/Timeline";
import Faqs from "./sections/Faqs/Faqs";
import Rsvp from "./sections/Rsvp/Rsvp";
import "./build-info";

// App animation phases:
// "envelope"  — Envelope is running its internal animation. Background hidden.
// "blending"  — Envelope letter fading out, background fading in.
// "revealing" — Envelope unmounted. Landing content stagger begins.
// "done"      — Landing stagger complete. Navbar appears.

// A deep link (e.g. shared #faqs link) should land directly on its section,
// not replay the envelope intro. Captured at import time: main.jsx strips the
// hash from the URL right after importing this module, so it is gone by mount.
const deepLinkId = window.location.hash.slice(1);
const skipIntro = deepLinkId.length > 0;

export default function App() {
  const [appPhase, setAppPhase] = useState(skipIntro ? "done" : "envelope");
  const [preAnimateYoureInvited, setPreAnimateYoureInvited] = useState(false);

  const showEnvelope = appPhase === "envelope" || appPhase === "blending";
  const showLandingReveal = appPhase === "revealing" || appPhase === "done";

  useEffect(() => {
    if (!skipIntro) return;
    // main.jsx removed the hash before the browser could scroll to it, and
    // the sections only exist once React has rendered them.
    document.getElementById(deepLinkId)?.scrollIntoView();
  }, []);

  return (
    <>
      <Background hidden={appPhase === "envelope"} />
      {showEnvelope && (
        <Envelope
          onBlend={() => setAppPhase("blending")}
          onComplete={() => setAppPhase("revealing")}
          onWritingStart={() => setPreAnimateYoureInvited(true)}
        />
      )}
      <Navbar hidden={appPhase !== "done"} />
      <Landing
        reveal={showLandingReveal}
        instant={skipIntro}
        preAnimateYoureInvited={preAnimateYoureInvited}
        onRevealDone={() => setAppPhase("done")}
      />
      <Info />
      <Ceremony />
      <Timeline />
      <Details />
      <Faqs />
      <Rsvp />
    </>
  );
}
