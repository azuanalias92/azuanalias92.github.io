
# Welcome To My Github

- view my [portfolio](https://azuanalias.com)

The source of my personal site: who I am, the projects I've built, where I've worked, my writing, and a way to get in touch.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | The hero, three favourite projects, and my latest GitHub repositories |
| `/about` | My story, contact and CV notes, social links, tech stack |
| `/projects` | Every project, with its screenshot and link |
| `/experience` | My career as a route on a survey map, then year by year |
| `/contact` | A contact form that emails me through EmailJS |
| `/blog` and `/blog/[slug]` | Blog posts |

## Running it locally

Needs Node 16 or newer.

```bash
npm ci --legacy-peer-deps
npm run dev    # http://localhost:3000
```

`--legacy-peer-deps` is needed because `react-rough-notation` declares an older React peer than the React 18 this site uses.

Production build:

```bash
npm run build
```

## Editing content

Almost everything on the site comes from one file, `constants/data.js`:

- `projects`: title, link, screenshot (put the image in `public/`) and a one-line description. The first three appear on the home page.
- `about`: the statement line, the two paragraphs and the current project.
- `experience`: newest first. Each entry becomes a pin on the experience map and a row in the record.
- `blog`: title, summary, date, slug, cover image and the post's HTML.
- `socialLinks`, `email`, `resumeUrl`, `address`.

## Latest code from GitHub

The home page lists my six most recently updated repositories (`lib/getLatestRepos.js`, called from `getStaticProps` in `pages/index.js`). They are fetched at build time, so the list refreshes on every deploy.

Set `GITHUB_AUTH_TOKEN` (see `.env.example`) to make the request authenticated. Without it the fetch still works, within GitHub's limit of 60 unauthenticated requests an hour. If the fetch fails, the section shows a short message instead of breaking the build. On GitHub Actions the workflow passes its built-in `GITHUB_TOKEN`, so there is nothing to configure.

## Deploying

Pushing to `master` runs `.github/workflows/nextjs.yml`, which builds the site, exports it as static HTML and publishes it to GitHub Pages.

## Design

The site uses the Furrow theme, designed with the Hallmark design skill: manila paper, ink rules, Red Hat Display, Text and Mono, and tangerine used only as a fill. Light and dark modes are both supported (`next-themes`).

- `styles/tokens.css`: every colour, font, size and spacing value, light and dark. Change the look here.
- `styles/base.css`: base element rules.
- `styles/globals.css`: the components and page layouts. Its first lines record the design decisions and every content change the redesign made.
- `components/SurveyMap.js`: the survey map behind the home hero, the experience header and the contact page. It is drawn on a canvas from the theme's colours, so it follows dark mode.
- `DESIGN.md`: the design system in one page, for anyone building a new page.

## Project structure

```
components/   page sections, nav, footer, the survey map
constants/    data.js, the site's content
lib/          getLatestRepos.js, the GitHub fetch
pages/        routes (Next.js pages router)
public/       images: portrait and project screenshots
styles/       tokens.css, base.css, globals.css
```

# Support

<a href="https://www.buymeacoffee.com/azuanalias" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
