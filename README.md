# DMC – Deutscher Malinois Club e.V. · Redesign package

A complete, static redesign of dmc-ev.de: **28 pages**, the real logo, **96 original photos** (bundled in `assets/img/`), all nine Verein sub-pages, all Zucht and Sport sub-pages. Open `index.html` in a browser – no build step, no server needed.

```
index.html … (28 pages)      one HTML file per page, flat, relative links
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
- Third event (Nationale Schau Saarland, 01.11.2026) – taken from a news post; the live Veranstaltungen page did not list it.
- ZZL table column headers (ZbNr., Name, Wurftag, Eigentümer, Vater, Mutter) – inferred; the live table had none.
- Search fields over the long tables (Wurfmeldungen, Zuchtergebnisse, Deckrüden, Neumitglieder, News, Formulare).

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

Skip link, landmarks, one h1 per page, visible focus rings, 44 px minimum targets on interactive controls, `prefers-reduced-motion` respected, `aria-current` in menus and tabs, table captions and `scope`, live regions for search results, `role="img"` labels on chart bars. Text contrast was measured for every rendered text node on all 28 pages at 1440 px and 390 px: no text below 4.5:1 (3:1 for large text). Lowest measured ratio on the start page: 5.0:1.
