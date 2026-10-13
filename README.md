# Ashith Kumar P — Portfolio

Plain HTML and CSS, hosted free on GitHub Pages. No build step: whatever is in this repository is the live site, and it updates about a minute after each commit.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `work/<project>/index.html` | One page per case study |
| `work/<project>/images/` | Images for that case study |
| `css/style.css` | All styling. Colours and fonts are at the top, in `:root` |
| `js/main.js` | Small interactions (theme toggle, copy email, reveals) |
| `images/og.png` | Preview image shown when the link is shared |

## Common edits

**Change text.** Open the page on github.com, click the pencil icon, edit, then click **Commit changes**.

**Add an image to a case study.**
1. Open `work/<project>/images/`, click **Add file → Upload files**, and drop your image in (PNG/JPG/WebP, ideally under 500 KB).
2. Open `work/<project>/index.html` and find the placeholder, a `<div class="frame" data-label="…"></div>`.
3. Put an image tag inside it:
   `<div class="frame" data-label="…"><img src="images/your-file.png" alt="What it shows" loading="lazy"></div>`
   The grid placeholder disappears as soon as an image is inside.

Lines marked `<!-- EDIT: … -->` are spots where you can add more detail (insights, quotes, learnings).

**Add a new project.**
1. Copy a folder in `work/` (for example `work/digiyatra/`) and rename it, e.g. `work/experian/`.
2. Edit the text in its `index.html`.
3. On the home page, copy one of the `<article class="case card">` blocks and point its link at `work/experian/index.html`.
4. Update the "Next project" link at the bottom of the case study pages so they link in a loop.

**Change colours.** Edit the `--accent` and other values at the top of `css/style.css`.
