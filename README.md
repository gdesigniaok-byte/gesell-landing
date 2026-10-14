# GESELL — landing page

A small, framework-free static website. It uses plain HTML, CSS, and JavaScript so the source stays readable and easy to maintain.

## 1. Add the three original images

Put your exact source images in `assets/images/` and name them:

- `slide-1.jpg`
- `slide-2.jpg`
- `slide-3.jpg`

If your files are PNG or WebP, either convert them to JPG or update the corresponding paths in `index.html` and `js/config.js`. Keep the originals; do not use generated replacements. Use descriptive filenames only if you update all matching paths.

## 2. Main files

- `index.html` — semantic page structure, hero, slideshow controls, and interactive map iframe.
- `css/styles.css` — layout, responsive rules, crossfade, typography, controls, and reduced-motion styling.
- `js/config.js` — slide duration, image paths, and title-gradient colors for each slide.
- `js/slideshow.js` — shared slide index, automatic rotation, manual controls, preload, and visibility/reduced-motion handling.
- `assets/images/` — the three supplied images.

## 3. Change slide timing and title colors

Open `js/config.js`. `slideDurationMs` is the time each image remains visible, in milliseconds. The three `titleColors` values are the start, middle, and end colors of the gradient inside `GESELL` for that image. They transition smoothly with the shared slide index.

The image crossfade duration is controlled by `--fade-duration` in `css/styles.css`.

## 4. Map

The iframe currently uses the supplied uMap URL exactly:

`https://umap.openstreetmap.fr/en/map/villa-gesell_1470956#15`

The iframe loads the actual interactive map rather than a screenshot. The map's markers, layers, and popups depend on the map's own settings and permissions. Test the published site in a normal browser. If uMap blocks iframe embedding or the map owner restricts access, use uMap's own Share/Embed feature to obtain its official embed URL and replace the iframe `src`; do not substitute a static map.

## 5. Preview locally

The easiest option is to open `index.html` in a browser. For more reliable local behavior, use a small local server (for example, VS Code's Live Server extension) and open its local URL.

## 6. Publish on GitHub, then Cloudflare Pages

### A. Create the GitHub repository

1. Sign in at https://github.com/new.
2. Create a repository named `gesell-landing` (public or private is fine for Cloudflare Pages).
3. Add the files and folders from this project. The top-level `index.html` must remain at the repository root.
4. Commit the files to the `main` branch.

You can upload files from the repository page using **Add file → Upload files**. Make sure you upload the contents of this project folder, not an extra enclosing folder that would put `index.html` one level too deep. Add the three image files before publishing.

### B. Connect GitHub to Cloudflare Pages

1. Sign in at https://dash.cloudflare.com/.
2. Open **Workers & Pages** and choose to create an application / Pages project connected to Git.
3. Connect your GitHub account and grant access to the `gesell-landing` repository.
4. Choose `main` as the production branch.
5. For this plain static HTML project, leave the framework preset as **None**. Use `exit 0` as the build command if Cloudflare requires a command, and `.` as the build output directory because `index.html` is at the repository root.
6. Deploy. Cloudflare will provide a `*.pages.dev` address.
7. Later, upload or commit any code/image changes to GitHub. Cloudflare Pages automatically builds and deploys changes from the connected branch.

Official docs:
- Cloudflare Pages static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/
- GitHub upload files: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Notes

- This is static hosting; no server, database, build framework, or paid API is required.
- A custom domain may require a separate domain registration fee.
- The three image files are intentionally not included yet because the source images have not been attached to this conversation.
