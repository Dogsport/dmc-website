# DMC – Deutscher Malinois Club e.V. · Redesign package

A complete, static redesign of dmc-ev.de: **40 pages** (28 site pages + one detail page for each of the 12 events), the real logo, **96 original photos** (bundled in `assets/img/`), all nine Verein sub-pages, all Zucht and Sport sub-pages. Open `index.html` in a browser – no build step, no server needed.

```
index.html … (40 pages)      one HTML file per page, flat, relative links
assets/style.css             one design system (tokens at the top of the file)
assets/main.js               ~160 lines, no dependencies (menu, table search, accordions, Landesgruppen finder)
assets/img/                  logo, photos, sponsor and kennel logos (from dmc-ev.de/wp-content/uploads)
```

## Pages

| Page | File | Key |
|---|---|---|
| DMC | `index.html` | home |
| Verein | `verein.html` | verein |
| Vorstand | `vorstand.html` | vorstand |
| DMC Leistungsrichter | `leistungsrichter.html` | leistungsrichter |
| DMC Helfer | `helfer.html` | helfer |
| Gremien | `gremien.html` | gremien |
| Neumitglieder | `neumitglieder.html` | neumitglieder |
| Geschäftsstelle | `geschaeftsstelle.html` | geschaeftsstelle |
| DMC Shop | `dmc-shop.html` | shop |
| Landesgruppen | `landesgruppen.html` | landesgruppen |
| ePaper – Der Malinois | `epaper.html` | epaper |
| News | `news.html` | news |
| Geschichte | `geschichte.html` | geschichte |
| Zucht | `zucht.html` | zucht |
| Ergebnisse – Zuchtüberprüfung | `zucht-ergebnisse.html` | zuchtergebnisse |
| Wurf- und Deckmeldungen | `zucht-wurf-deckmeldungen.html` | wurf |
| Informationen für Züchter | `zucht-informationen.html` | infozuechter |
| ausländische Deckrüden | `zucht-deckrueden.html` | deckrueden |
| Deckrüden ZZL durch DMC e.V. | `zucht-deckrueden-zzl.html` | deckrueden-zzl |
| Züchtertafel | `zucht-zuechtertafel.html` | zuechtertafel |
| Übersicht Forschungsprojekte | `zucht-forschung.html` | forschung |
| Veranstaltungen | `veranstaltungen.html` | veranstaltungen |
| Sport | `sport.html` | sport |
| IGP | `sport-igp.html` | igp |
| Mondioring | `sport-mondioring.html` | mondioring |
| Terminschutz | `terminschutz.html` | terminschutz |
| Formulare Sport | `sport-formulare.html` | formulare-sport |
| Formulare & Ordnungen | `formulare-ordnungen.html` | formulare |
| DMC Wesensprüfung und Zuchttauglichkeitsprüfung – Herdecke | `veranstaltung-23497.html` | ev-23497 |
| Landessiegerprüfung – Hamburg | `veranstaltung-23460.html` | ev-23460 |
| DMC Körung | `veranstaltung-23498.html` | ev-23498 |
| DMC Leistungsprüfung Iffeldorf | `veranstaltung-23415.html` | ev-23415 |
| DMC Prüfung Thüringen | `veranstaltung-23172.html` | ev-23172 |
| DMC FH Championat 2026 | `veranstaltung-23554.html` | ev-23554 |
| Mondioring House of Horror / Grusselkabinett | `veranstaltung-23359.html` | ev-23359 |
| IGP House of Horror DMC LG BW | `veranstaltung-23360.html` | ev-23360 |
| Ausstellung – Neunkirchen-Heinitz | `veranstaltung-23283.html` | ev-23283 |
| DMC Regionalchampionat Ost | `veranstaltung-23217.html` | ev-23217 |
| Weihnachtszirkus HSV Schwaigern Kat. 3 | `veranstaltung-22598.html` | ev-22598 |
| Weihnachtszirkus HSV Schwaigern Kat. 1+2 | `veranstaltung-22599.html` | ev-22599 |

## Content rules

German copy, images, logo, colours (red `#D42E12` on black) and structure are taken from the live site unchanged. Only these things were added or corrected – each is deliberate:

**Corrected (clear defects on the live site)**
- Contact e-mail `office-dmc-ev.de` (typo, no @) → `office@dmc-ev.de`.
- Doubled file names in document links (e.g. "Allgemeine Hinweise zu DMC Ausstellungen") repaired.
- Broken Championat link → redirected to the Caniva registration system.
- Section-heading "Zucht" was h1 on two pages; the Wurf page is now "Wurf- und Deckmeldungen".
- Wrong or empty alt texts on partner logos replaced.

**Added (nothing removed)**
- "Mitglied werden" button in the header and on Neumitglieder, linking the existing Aufnahmeantrag PDF (it was not surfaced on the live site).
- **Veranstaltungen is now complete.** The live page only showed a screenshot of the booking portal. The new page lists the full 2026 calendar (12 events, Stand 20.09.2026) with filter by type, and every event has its own detail page (`veranstaltung-<Caniva-ID>.html`): date, address, organiser, discipline, registration opening/deadline (status computed live), fee, contact person, trial leader, judges and helpers, description text, link to the registration on Caniva, previous/next event, and schema.org `Event` data for search engines. All content is copied from the public Caniva event pages; German labels replace Caniva's English UI terms.
- Announcement texts of the board (Herdecke, Saarland) are added to the matching event pages, with a link to the original post.
- ZZL table column headers (ZbNr., Name, Wurftag, Eigentümer, Vater, Mutter) – inferred; the live table had none.
- Search fields over the long tables (Wurfmeldungen, Zuchtergebnisse, Deckrüden, Neumitglieder, News, Formulare).

**Events – please note**
- Bank account numbers (IBAN) that Caniva shows in fee/description texts are deliberately **not** copied; the pages say the bank details are in the Caniva announcement.
- The event list is a **snapshot** (20.09.2026). Past events show "Beendet" automatically, but new events must be added: in WordPress use a small custom post type (title, dates, place, Caniva URL, category) and let the templates render the same markup.
- Inconsistencies found in the Caniva texts (kept verbatim): the IGP House of Horror description says "30.10.2026" while the event date is 31.10.2026; the Neunkirchen-Heinitz address is spelled "Moselschachstraße" in Caniva and "Moselschachtstraße" in the news post.
- Contact names and phone numbers of organisers are those published on the public Caniva pages.

**Please confirm before going live**
1. **Address.** The Wurf page keeps "Marktplatz 8a, Kastellaun" (verbatim from the live page); the footer and Geschäftsstelle use "Sponheimer Ring 8". One of them is out of date.
2. **Impressum / Datenschutz / Facebook** links point to `dmc-ev.de/impressum`, `/datenschutz` and the Facebook page as found on the live site – check they are the intended URLs.
3. **Personal data.** Neumitglieder, Wurf- and Deckmeldungen and Deckrüden tables contain names and phone numbers. They are a **dated snapshot** copied from the live site. Check the legal basis (Art. 6 DSGVO) and consent for publishing them; in WordPress these should come from the existing source, not from this static copy.
4. **Stale / dead items on the live site** (kept, but worth cleaning up): Airport Hannover kennel link points to the wrong site; Zuchtbücher 2018 and 2019 have no file; the "Fortbildungsseminare" row is outdated; FMBB and Championat links of previous years are dead.

**Not mirrored** (linked to the live site): individual Landesgruppen pages, Championat 2025, ePaper Jahresrückblick 2025, Ergebnis-Archiv, single news posts, and all PDF/DOCX documents (linked to `dmc-ev.de/wp-content/uploads/…`).

## Using it in WordPress (Avada or any theme)

The markup is semantic and each page is one `<main>`; the design lives entirely in `assets/style.css`.

1. **Fast route – child theme / block theme.** Copy `assets/` into your theme folder. Enqueue:
   `wp_enqueue_style('dmc', get_stylesheet_directory_uri().'/assets/style.css', [], '1.0');`
   `wp_enqueue_script('dmc', get_stylesheet_directory_uri().'/assets/main.js', [], '1.0', true);`
   Add the Google Fonts link from the `<head>` of any page (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono).
2. **Template parts.** From `index.html` cut the blocks in this order into `header.php` and `footer.php`: skip link, `.util` bar, `header.hdr`, `div.menu` (mobile menu), then after `<main>` the partners section and `footer.ftr`. Replace the hard-coded menu with `wp_nav_menu()` – keep the classes `nav`, `has-sub`, `sub-btn`, `subpanel` (the JS and CSS target them).
3. **Pages.** Each page's `<main id="main">…</main>` goes into a page template (or a Custom-HTML block / Gutenberg group for the simple pages: Verein, Geschäftsstelle, Terminschutz, Geschichte). The long tables should be fed from the existing plugin/source, keeping the `<table>` markup and the `data-filter-table` attributes for the search.
4. **Images.** Upload `assets/img/*` to the media library, or keep them in the theme and adjust the paths.
5. **Avada.** Disable Avada's own header/footer layout and global CSS reset for these pages (Layout Builder → "none"), otherwise Avada's typography and container widths will override the tokens.
6. **Redirects.** File names are flat (`sport-mondioring.html`); map them to the existing WordPress slugs so no URL changes.

## Accessibility (WCAG 2.2 AA)

Skip link, landmarks, one h1 per page, visible focus rings, 44 px minimum targets on interactive controls, `prefers-reduced-motion` respected, `aria-current` in menus and tabs, table captions and `scope`, live regions for search results, `role="img"` labels on chart bars. Text contrast was measured for every rendered text node on all 40 pages at 1440 px and 390 px: no text below 4.5:1 (3:1 for large text). Lowest measured ratio on the start page: 5.0:1.
