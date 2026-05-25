
# Renuka's H2 Batters — Frontend Website (Phase 1)

A fully designed, responsive, frontend-only website for Renuka's H2 Batters with all sections from your spec and working location auto-detect. No backend, no database, no auth — you'll add Lovable Cloud and media yourself afterward. All product/banner/review data uses placeholder content that you can later swap for live data.

## What's included

### Customer-facing site (single landing page + checkout route)

1. **Navbar** — sticky, brand "Renuka's H2 Batters", smooth-scroll links to sections, cart icon with count badge, mobile hamburger.
2. **Hero** — fullscreen background video (autoplay, muted, loop) with dark overlay, brand name, tagline, "Order Now" CTA that scrolls to Products. Placeholder video URL you can swap.
3. **Banner / Updates** — responsive grid that respects each image's natural aspect ratio (landscape vs portrait render correctly side by side). Placeholder images.
4. **Products** — grid of product cards. Each card: image, name, description, price/KG, price/½KG. Quantity selector with **+1 KG** and **+½ KG** buttons (so customer can build 1.5 KG, 2.5 KG etc.). Live subtotal per card. "Add to Cart" pushes to cart.
5. **Cart drawer** — slide-out from right. Line items with KG/½KG breakdown, qty edit, remove, auto-calculated total, "Proceed to Checkout" button.
6. **About Us** — batter-focused copy, image, brand story.
7. **Customer Reviews** — card grid with name, star rating, review text. Placeholder reviews.
8. **Contact** — form (name, phone, message) + contact info block. Form is UI-only (logs to console / shows toast).
9. **Footer** — brand, quick links, social, copyright.

### Order flow (`/checkout` route)

- Customer details: Name, Phone Number
- Address grid: Apartment/Home Name, Street, Door Number, Floor
- **Location auto-detect**:
  - On load, prompts browser geolocation → auto-fills lat/lng
  - Embedded Leaflet map (OpenStreetMap, no API key) showing the pin
  - Pin is **draggable** for manual adjustment
  - "Re-detect my location" button
  - Reverse-geocode via free Nominatim → suggested address text (user can override)
- **Voice note** — record button uses MediaRecorder API; preview/playback; re-record. Stored as blob in component state for now.
- **Payment dropdown** — Cash on Delivery / PhonePe
- Note shown after payment select: *"Our team will contact to confirm the order"*
- **Complete Order** button → generates a mock Order ID (`RHB-` + timestamp) → navigates to `/order-success/$id` showing confirmation

### Order Success page
- Big checkmark, Order ID, summary, "Back to Home"

## Design

- **Palette** (semantic tokens in `src/styles.css`):
  - Background: white / near-black for dark sections
  - Primary: Navy Blue `#0A1A3F`
  - Accent: Orange `#FF7A1A`
  - Text: Black / White
- **Typography**: bold display font for headlines (Bricolage Grotesque or Fraunces), clean sans for body (Plus Jakarta Sans).
- **Motion**: framer-motion for hero fade-in, section reveals, cart drawer, button hovers.
- **Mobile-first**, fully responsive.

## Tech

- TanStack Start file routes:
  - `src/routes/index.tsx` — landing (all sections)
  - `src/routes/checkout.tsx`
  - `src/routes/order-success.$id.tsx`
- **Cart state**: Zustand store, persisted to localStorage
- **Map**: `react-leaflet` + `leaflet` (OpenStreetMap tiles, free)
- **Geocoding**: Nominatim (free, no key) for reverse-geocode
- **Voice**: native MediaRecorder API
- Components organized under `src/components/site/` (Navbar, Hero, Banner, Products, ProductCard, CartDrawer, About, Reviews, Contact, Footer) and `src/components/checkout/` (AddressForm, MapPicker, VoiceRecorder, PaymentSelect)
- **Mock data** in `src/data/` (products, banners, reviews) — easy to delete once you wire Cloud

## Out of scope (you'll add later)

- Lovable Cloud / database / auth
- Admin panel + Delivery partner panel
- Real media uploads, real product CRUD
- Real WhatsApp/SMS sending, payment gateway
- Order persistence (currently mock-only)

When you're ready for the admin and delivery panels, I'll build those on top of this once Cloud is enabled.

---

Approve to start building Phase 1.
