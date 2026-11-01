# InnovateHer 2027 website

Static site (plain HTML, CSS and JavaScript). No build step, no dependencies.

```
index.html          all page content (sections, text, links)
css/styles.css      colors, layout, animations
js/main.js          countdown, FAQ accordion, scroll route + elephant
assets/             elephant-front.png, elephant-side.png, logo.jpg
.nojekyll           tells GitHub Pages to serve the files as-is
```

## Put it live with GitHub Pages

1. Create a new repository on GitHub (e.g. `innovateher-site`).
2. Upload everything in this folder to the **root** of the repo
   (`index.html` must be at the top level, not inside another folder).
   Make sure the hidden `.nojekyll` file comes along, though the site still works without it.
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**,
   **Branch: main**, **Folder: / (root)**, then **Save**.
5. After a minute or two the site is live at
   `https://<your-username-or-org>.github.io/<repo-name>/`.

### Using innovateherhacks.org
In **Settings → Pages → Custom domain** enter your domain, then add the DNS records
GitHub lists (an `A`/`ALIAS` record for the root domain, or a `CNAME` for `www`).
Tick **Enforce HTTPS** once it's available.

## Where to edit things

| What | File | Look for |
|---|---|---|
| Hackathon date/time for the countdown | `js/main.js` | `HACKATHON_START` (top of file) |
| Date text on the title card | `index.html` | `Takeoff is` |
| Application links | `index.html` | the three `<a class="app" ...>`: replace `href="#"` with the form URL and delete the `data-soon="..."` attribute |
| Tracks | `index.html` | `<article class="ticket"` |
| Exec board names/roles | `index.html` | `<figure class="polaroid"` (to add photos, replace the elephant `<div class="ele-front">` with `<img src="assets/name.jpg" alt="Name">`) |
| FAQs | `index.html` | `<div class="faq">`; anything in [brackets] still needs your details |
| Teams | `index.html` | `<article class="team stamp` |
| Sponsor tiers / logos | `index.html` | `<article class="tier"` and `<div class="logos">` |
| Colors | `css/styles.css` | the variables at the top (`--navy`, `--rose`, `--page`, ...) |
| Social links | `index.html` | the `<footer>` |

Fonts (Fraunces and Inter) load from Google Fonts, so the site needs an internet connection to look exactly right.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
