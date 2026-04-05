## The What

A fully interactive digital wedding invitation for Josip & Storm's wedding on September 12, 2026. Guests are greeted with an animated purple envelope sealed with a wax stamp. Clicking it triggers a multi-phase reveal animation with falling petals, leading into the main invitation content.

The site includes a landing hero, detailed event information with dress code and parking, an illustrated wedding timeline, a comprehensive FAQ section covering travel and visa details, and a complete RSVP system where guests can search their name and respond for their group.

## The Why

A physical wedding invitation can only hold so much. This digital version handles everything guests need to know - from the schedule and location to parking, nearby accommodation, and even visa requirements for international travelers. The RSVP system removes the need for manual tracking, with real-time email notifications and a Google Sheets backend that both partners can monitor.

## The How

The envelope intro uses a 7-phase CSS animation sequence, transitioning from a 3D flap opening through letter extraction, handwriting reveal, and a full-screen blend into the main content. Each phase is timed precisely to feel like a single fluid motion.

The RSVP system is backed by Google Apps Script connected to a Google Sheet. Guests are identified by URL parameters or name search, and can respond for their entire group. The system tracks overwrites, shows previous responses, and sends styled HTML notification emails to the couple with a full summary table of who has responded.

Forty falling petal elements run independent CSS animations for vertical fall, horizontal wiggle, rotation, and opacity, with a vanish-respawn cycle to keep the background feeling alive without accumulating DOM nodes.
