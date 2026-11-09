# Design: Azuan Alias

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Split Studio (a Stage hero, the work as a showcase, the code on a white sheet)
- Theme: Furrow (by request)
- Axes: light/grotesk-sans/warm · posture: committed · modes: light and dark (next-themes, `.dark` on `html`)

## Tokens
`styles/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(96% 0.011 85);  --color-paper-2: oklch(99.5% 0.005 85);  --color-paper-3: oklch(92% 0.016 85);
  --color-ink: oklch(18% 0.006 60);  --color-ink-2: oklch(28% 0.008 60);  --color-muted: oklch(44% 0.012 60);  --color-rule: oklch(88% 0.013 85);
  --color-accent: oklch(91.3% 0.111 200) /* #7DF9FF */;  --color-accent-ink: oklch(18% 0.006 60);  --color-focus: oklch(52% 0.1 205);
  --color-accent-line: oklch(52% 0.1 205) /* deep teal, for lines */;  --color-accent-on-ink: (cyan on the ink footer);
  --color-green: oklch(48% 0.11 150);  --color-contour: oklch(62% 0.07 58);  --color-water: oklch(60% 0.05 232);  --color-hedge: oklch(50% 0.1 150);
  --font-display: "Red Hat Display", "Red Hat Text", ui-sans-serif, sans-serif;  --font-body: "Red Hat Text", ui-sans-serif, system-ui, sans-serif;  --font-outlier: "Red Hat Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-entry: 14px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: (see tokens.css);
}
```
The dark block (`:root.dark`) re-derives every colour token; shadows become hairline rings. The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.

## Material
- The survey map (`components/SurveyMap.js`): generated on a canvas from the tokens, never a picture. Pass `around=".selector"` to draw the holding (teal edge, hedges, a lane) around a framed thing.
- The accent is cyan #7DF9FF (the owner's pick, replacing Furrow's tangerine), always a fill with ink on it and a 1px ink edge: the primary key, the current nav link, the open pin. It nearly vanishes as a line on paper, so lines (focus rings, hover underlines, the holding's edge on the map) use the deep teal `--color-accent-line`. Never type colour, never a glow on dark.
- Mono only for figures: dates, years, numbers. Never on labels.
- Ruled lists: a 1px ink rule over, `--color-rule` hairlines between rows. Only the notebook card and the white sheet lift.

## Controls
- Primary: cyan fill, ink text, 1px ink border · 6px radius · 48px tall, a lit inset top edge
- Secondary: paper-2 with a 1px rule border · same radius and height

## Motion
- Character: still. The experience pins land once in time order; under reduced motion everything ends at once.

## Exports
`styles/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
