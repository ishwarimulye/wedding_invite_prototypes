# wedding_invite_prototypes

A collection of themed digital wedding invitation prototypes built with Next.js & Tailwind CSS.

## Prototypes

| Folder | Theme | Notes |
| --- | --- | --- |
| `royal-floral-invite/` | Royal Maroon, Emerald & Antique Gold Floral | Wax-seal palace reveal, drifting petals, live countdown, itinerary with `.ics` export, Udaipur venue & gallery, and dynamic RSVP (`/api/rsvp`). |
| `indigo-terracotta-invite/` | Neel Indigo, Warm Limestone & Terracotta Editorial | Linen folio slide cover, asymmetric split spread, interactive ceremony switcher with attire color swatches, Jodhpur concierge ledger, and inline RSVP (`/api/rsvp`). |

## Running a Prototype Locally

```bash
cd royal-floral-invite
npm install
npm run dev
```

## Deploying on Vercel

When importing this repository on Vercel, set **Root Directory** to the theme folder you want to deploy (e.g. `royal-floral-invite`).
