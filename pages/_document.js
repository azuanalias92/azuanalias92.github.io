import { Html, Head, Main, NextScript } from "next/document";

const slotScript = `window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector('[data-slot="' + k + '"]'); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } };
document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@600&family=Red+Hat+Mono:wght@400;500&family=Red+Hat+Text:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{ __html: slotScript }} />
      </body>
    </Html>
  );
}
