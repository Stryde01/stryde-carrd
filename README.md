# Voxel Model Portfolio — Scroll Experience

A static portfolio concept with a cinematic scroll sequence inspired by the broad mood of Dinster's Carrd page, without copying its assets.

## Interaction

- Desktop: the intro portrait and introduction shrink/fade as you scroll; the portfolio panel rises from the bottom; continued vertical scrolling moves the work gallery horizontally.
- The background glow follows the currently centered work.
- Use left/right arrow keys when the gallery is focused.
- Mobile: the intro becomes a normal page section and the portfolio can be swiped horizontally.
- Reduced-motion preference disables the scroll-driven scene and uses a simpler static layout.

## No fake artwork included

All media areas are intentionally empty. The website does not include generated sample models or invented portfolio work.

### Add your portrait

1. Put your image at `assets/portrait/photo.webp`.
2. In `index.html`, find `<div class="skin-frame" ...>` and add `data-image="assets/portrait/photo.webp"` to it.
3. The empty label will disappear when the image is configured.

### Add work images

For each `.work-slide` in `index.html`:
1. Add `data-image="assets/works/your-file.webp"` to the `<article class="work-slide"...>` element.
2. Optionally add `data-background="assets/works/your-background.webp"` if you want a separate blurred background image as the active work.
3. Put the image file under `assets/works/`.

The `data-accent` value sets the ambient background tint for that work, e.g. `data-accent="#8c69c7"`.

Once `data-image` is set, a ↗ icon appears on the work. Clicking it opens the image in a full-screen lightbox; click the backdrop, the close button, or press Escape to close.

To add more work, duplicate a `.work-slide` article. The counter and horizontal gallery length update automatically. There are no titles, categories, or descriptions to fill in.

## Contact details

The site is set up for **STRYDE** with the email **2325502542@qq.com**. The email is shown as plain text in the intro and gallery footer, with no mailto links, so clicking it does not open a mail app.

The Discord chip is a placeholder. Once you have an invite link, replace this element in `index.html`:

```html
<span class="contact-pending" data-i18n="discordSoon">DISCORD · SOON</span>
```

with a normal link, for example:

```html
<a class="contact-chip" href="https://discord.gg/your-invite" target="_blank" rel="noreferrer">DISCORD ↗</a>
```

You can then remove the `data-i18n="discordSoon"` attribute or change its text in `script.js`.

## Preview locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages deployment

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md`, and the `assets` folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Wait for the published URL to appear in Pages settings.

This is a plain static site; no build step or server is required.


## Languages

The site supports English and Simplified Chinese.

- On first visit, the site detects the browser/system language: Chinese (`zh-*`) selects Simplified Chinese; other languages default to English.
- Visitors can manually switch languages using the `中文` / `EN` button in the header.
- A manual choice is saved in `localStorage` and takes precedence on future visits.
- The document language, page title, description, accessible labels, and mail subject update with the selected language.
