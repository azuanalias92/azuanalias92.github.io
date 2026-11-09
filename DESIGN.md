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
  --color-accent: oklch(70% 0.19 40);  --color-accent-ink: oklch(18% 0.006 60);  --color-focus: oklch(60% 0.19 40);
  --color-green: oklch(48% 0.11 150);  --color-contour: oklch(62% 0.07 58);  --color-water: oklch(60% 0.05 232);  --color-hedge: oklch(50% 0.1 150);
  --font-display: "Red Hat Display", "Red Hat Text", ui-sans-serif, sans-serif;  --font-body: "Red Hat Text", ui-sans-serif, system-ui, sans-serif;  --font-outlier: "Red Hat Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-entry: 14px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: (see tokens.css);
}
```
The dark block (`:root.dark`) re-derives every colour token; shadows become hairline rings. The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.

## Material
- The survey map (`components/SurveyMap.js`): generated on a canvas from the tokens, never a picture. Pass `around=".selector"` to draw the holding (tangerine edge, hedges, a lane) around a framed thing.
- Tangerine is a fill with ink on it: the primary key, the current nav link, the open pin, the holding's edge. Never type colour.
- Mono only for figures: dates, years, numbers. Never on labels.
- Ruled lists: a 1px ink rule over, `--color-rule` hairlines between rows. Only the notebook card and the white sheet lift.

## Controls
- Primary: tangerine fill, ink text · 6px radius · 48px tall, a lit inset top edge
- Secondary: paper-2 with a 1px rule border · same radius and height

## Motion
- Character: still. The experience pins land once in time order; under reduced motion everything ends at once.

## Exports
`styles/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
