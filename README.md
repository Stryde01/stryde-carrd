# Voxel Model Portfolio — Scroll Experience

A static portfolio concept with a cinematic scroll sequence inspired by the broad mood of Dinster's Carrd page, without copying its assets.

## Interaction

- Desktop: the intro portrait and introduction shrink/fade as you scroll; the portfolio panel rises from the bottom; continued vertical scrolling moves the work gallery horizontally.
- The background glow follows the currently centered work.
- Use left/right arrow keys when the gallery is focused.
- Mobile: the intro becomes a normal page section and the portfolio can be swiped horizontally.
- Reduced-motion preference disables the scroll-driven scene and uses a simpler static layout.

## No fake work included

All display slots are intentionally empty. The website does not include sample models or invented portfolio work.

### Add your portrait

1. Put your image at `assets/portrait/photo.webp`.
2. In `index.html`, find `<div class="skin-frame" ...>` and add `data-image="assets/portrait/photo.webp"` to it.
3. The empty label will disappear when the image is configured.

### Add 3D models

Open **`works.js`**. This is the only file you need to edit for the gallery.

1. Put your `.glb` file (or `.gltf` with its resources) under `assets/models/`.
2. In `works.js`, fill in the `model` value, for example: `{ model: "assets/models/my-model.glb", accent: "#8c69c7" }`.
3. Duplicate an entry to add more work, or delete an entry to remove it.
4. `accent` is the optional background tint. `poster` is an optional loading image/background. Leave `model` empty to show the placeholder.

Once an entry has a model, the placeholder disappears, a ↗ icon appears, and clicking it opens the model in a larger viewer. Click the backdrop, the close button, or press Escape to close.

The viewer is [model-viewer](https://modelviewer.dev/) 4.4.0, bundled locally at `vendor/model-viewer.min.js` (Apache-2.0, see `vendor/model-viewer.LICENSE`), so it does not depend on a CDN. Models are lit by a local moon HDR (`vendor/environments/moon_1k.hdr`, from the model-viewer shared assets) with low exposure, ACES tone mapping, and soft shadows, giving a cool key light and dark fill instead of a flat, bright studio look.

## Contact details

The site is set up for **STRYDE** with the email **jiangbai033@gmail.com**. The email is shown as plain text in the intro and gallery footer, with no mailto links, so clicking it does not open a mail app.

The Discord chip links to the profile `https://discord.com/users/1562355984834363422` and shows the username **stryde033**. Visitors can open the profile to add you or send a message, subject to your Discord privacy settings.

To change the Discord account later, update the `href` on the `contact-discord` link in `index.html`. If you prefer a server invite instead, replace the link with `https://discord.gg/your-invite`.

## Preview locally

Do not double-click `index.html`. Browsers block ES modules and local model/HDR files on `file://`, so the 3D viewer will be blank. Use the included local server:

```bash
node serve.js
```

Then open `http://localhost:8000`.

VS Code's Live Preview / Live Server extension also works because it serves the page over HTTP.

`serve.js` is only for local preview. Visitors do not run it, and it is not needed on GitHub Pages — the hosting server already serves the files over HTTP.

## GitHub Pages deployment

Visitors only need the published URL. They do not need Node, `serve.js`, or any local setup.

1. Create a GitHub repository.
2. Upload `index.html`, `works.js`, `styles.css`, `script.js`, `README.md`, `.nojekyll`, the `vendor` folder, and the `assets` folder to the repository root.
3. Make sure `index.html`, `works.js`, `vendor/`, and `assets/` sit at the repository root — not inside an extra subfolder.
4. In GitHub, open **Settings → Pages**.
5. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
6. Wait for the published URL to appear in Pages settings.

This is a plain static site; no build step is required.

To verify the upload, these URLs should each return 200 (replace the domain with yours):

- `/works.js`
- `/vendor/model-viewer.min.js`
- `/vendor/environments/moon_1k.hdr`
- `/assets/models/model.gltf`


## Languages

The site supports English and Simplified Chinese.

- On first visit, the site detects the browser/system language: Chinese (`zh-*`) selects Simplified Chinese; other languages default to English.
- Visitors can manually switch languages using the `中文` / `EN` button in the header.
- A manual choice is saved in `localStorage` and takes precedence on future visits.
- The document language, page title, description, and accessible labels update with the selected language.
