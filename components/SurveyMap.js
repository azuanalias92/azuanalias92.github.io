import React, { useEffect, useRef } from "react";

// A generated survey map: contours traced from noise by marching squares,
// paddy plots edged in dotted bunds, a river, a lane, the holding in the accent line colour,
// paper grain and two fold creases. Colours come from the theme tokens, so the
// map redraws itself when the light or dark theme is switched.

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const rnd = mulberry32(seed);
  const size = 256;
  const perm = new Uint8Array(size * 2);
  const vals = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    perm[i] = i;
    vals[i] = rnd();
  }
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < size; i++) perm[i + size] = perm[i];
  const smooth = (t) => t * t * (3 - 2 * t);
  const lattice = (x, y) => vals[perm[(perm[x & 255] + y) & 511] & 255];
  const value = (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = smooth(x - xi);
    const yf = smooth(y - yi);
    const a = lattice(xi, yi);
    const b = lattice(xi + 1, yi);
    const c = lattice(xi, yi + 1);
    const d = lattice(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  return (x, y) => {
    let sum = 0;
    let amp = 0.55;
    let freq = 1;
    for (let o = 0; o < 3; o++) {
      sum += value(x * freq, y * freq) * amp;
      freq *= 2.05;
      amp *= 0.5;
    }
    return sum;
  };
}

// Corner order: top-left, top-right, bottom-right, bottom-left.
const EDGES = {
  1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[0, 1]], 5: [[3, 0], [2, 1]], 6: [[0, 2]], 7: [[3, 0]],
  8: [[3, 0]], 9: [[0, 2]], 10: [[3, 2], [0, 1]], 11: [[0, 1]], 12: [[3, 1]], 13: [[2, 1]], 14: [[3, 2]],
};

function draw(canvas, { seed, label, labelAt: place, scrim, plots, frame }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const css = getComputedStyle(canvas);
  const v = (n) => css.getPropertyValue(n).trim();
  const col = {
    contour: v("--color-contour"),
    water: v("--color-water"),
    hedge: v("--color-hedge"),
    ink: v("--color-ink"),
    accent: v("--color-accent-line"),
    muted: v("--color-muted"),
    sheet: v("--color-paper-2"),
    body: v("--font-body"),
    mono: v("--font-outlier"),
  };
  const rnd = mulberry32(seed * 7 + 3);
  const noise = makeNoise(seed);

  // Paper grain, drawn into the map only.
  ctx.fillStyle = col.ink;
  ctx.globalAlpha = 0.045;
  const grains = Math.round((w * h) / 70);
  for (let i = 0; i < grains; i++) ctx.fillRect(rnd() * w, rnd() * h, 1, 1);
  ctx.globalAlpha = 1;

  // Contours by marching squares.
  const cell = 9;
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  const scale = 1 / 520;
  const field = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      field[y * cols + x] = noise(x * cell * scale + 3.1, y * cell * scale + 7.7);
    }
  }
  const levels = 16;
  const lo = 0.2;
  const hi = 0.84;
  ctx.lineCap = "round";
  for (let l = 1; l < levels; l++) {
    const t = lo + ((hi - lo) * l) / levels;
    const heavy = l % 5 === 0;
    ctx.strokeStyle = col.contour;
    ctx.lineWidth = heavy ? 1.15 : 0.6;
    ctx.globalAlpha = heavy ? 0.85 : 0.55;
    ctx.beginPath();
    let labelAt = null;
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const c = [field[y * cols + x], field[y * cols + x + 1], field[(y + 1) * cols + x + 1], field[(y + 1) * cols + x]];
        const idx = (c[0] >= t ? 8 : 0) | (c[1] >= t ? 4 : 0) | (c[2] >= t ? 2 : 0) | (c[3] >= t ? 1 : 0);
        const segs = EDGES[idx];
        if (!segs) continue;
        const px = x * cell;
        const py = y * cell;
        const pt = (edge) => {
          const lerp = (a, b) => (t - a) / (b - a || 1e-6);
          if (edge === 0) return [px + cell * lerp(c[0], c[1]), py];
          if (edge === 1) return [px + cell, py + cell * lerp(c[1], c[2])];
          if (edge === 2) return [px + cell * lerp(c[3], c[2]), py + cell];
          return [px, py + cell * lerp(c[0], c[3])];
        };
        for (const [ea, eb] of segs) {
          const a = pt(ea);
          const b = pt(eb);
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          if (heavy && !labelAt && a[0] > w * 0.62 && a[0] < w - 48 && a[1] > h * 0.08 && a[1] < h * 0.92) labelAt = a;
        }
      }
    }
    ctx.stroke();
    if (heavy && labelAt) {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = col.contour;
      ctx.font = `400 10px ${col.mono}`;
      ctx.fillText(String(l * 25), labelAt[0] + 4, labelAt[1] - 3);
    }
  }
  ctx.globalAlpha = 1;

  const R = frame && frame.width > 0 ? frame : null;

  // The river: a slow bend across the lower ground, clear of the words.
  ctx.strokeStyle = col.water;
  ctx.globalAlpha = 0.75;
  const river = (off, lw) => {
    ctx.lineWidth = lw;
    ctx.beginPath();
    if (R) {
      const sx = Math.max(R.x - 80, w * 0.42);
      ctx.moveTo(sx + off, h + 10);
      ctx.bezierCurveTo(sx + w * 0.08 + off, R.y + R.height + 40, R.x + R.width * 0.6, R.y + R.height + 90 + off, w + 10, R.y + R.height + 20 + off);
    } else {
      const ry = h * 0.9;
      ctx.moveTo(-10, ry + off);
      ctx.bezierCurveTo(w * 0.3, ry - h * 0.16 + off, w * 0.55, ry + h * 0.14 + off, w + 10, ry - h * 0.08 + off);
    }
    ctx.stroke();
  };
  river(0, 2);
  river(5, 0.8);
  ctx.globalAlpha = 1;

  const hedge = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  const hatch = (x, y, bw, bh) => {
    ctx.save();
    ctx.strokeStyle = col.ink;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 0.8;
    ctx.strokeRect(x, y, bw, bh);
    ctx.beginPath();
    ctx.rect(x, y, bw, bh);
    ctx.clip();
    for (let d = -bh; d < bw; d += 4) {
      ctx.moveTo(x + d, y + bh);
      ctx.lineTo(x + d + bh, y);
    }
    ctx.stroke();
    ctx.restore();
  };
  const lane = (x0, y0, x1, y1) => {
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = col.ink;
    ctx.lineWidth = 0.8;
    for (const off of [0, 6]) {
      ctx.beginPath();
      ctx.moveTo(x0 + off, y0);
      ctx.quadraticCurveTo(x0 - 6 + off, (y0 + y1) / 2, x1 + off, y1);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  let labelLine = null;

  if (R) {
    // The holding drawn around a framed record (the photograph), as on a title plan.
    const narrow = w < 720;
    const pad = narrow ? 8 : 22;
    const L = Math.max(4, R.x - pad);
    const T = R.y - pad;
    const Rt = Math.min(w - 6, R.x + R.width + pad);
    const B = R.y + R.height + pad;
    ctx.strokeStyle = col.hedge;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([1.2, 3.4]);
    ctx.globalAlpha = 0.95;
    const topY = T - 34;
    if (!narrow) {
      hedge(L - 160, topY + 6, w + 10, topY - 4);
      hedge(L - 64, -10, L - 52, h + 10);
      hedge(L + R.width * 0.42, topY + 2, L + R.width * 0.4, -10);
    }
    hedge(Rt + 16, narrow ? T : -10, Rt + 10, h + 10);
    hedge(Math.max(0, L - 120), B + 46, w + 10, B + 38);
    ctx.setLineDash([]);
    labelLine = narrow ? [L + 8, T - 10, 0] : [L + 6, topY - 4, Math.atan2(-10, w + 10 - (L - 160))];

    // A wall in solid ink along the top of the holding.
    ctx.strokeStyle = col.ink;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.2;
    if (!narrow) hedge(Rt - R.width * 0.35, T - 10, w + 10, T - 14);
    ctx.globalAlpha = 1;

    // The holding's edge, in the accent line colour.
    ctx.strokeStyle = col.accent;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    const j = narrow ? 0 : 1;
    ctx.moveTo(L - 4 * j, T + 2 * j);
    ctx.lineTo(Rt + 2 * j, T - 6 * j);
    ctx.lineTo(Rt + 6 * j, B + 4 * j);
    ctx.lineTo(L + 4 * j, B - 2 * j);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;

    lane(L + R.width * 0.3, B + 2, L + R.width * 0.22, h + 10);
    if (!narrow) {
      hatch(L - 46, B - 64, 30, 20);
      hatch(L - 40, B - 36, 18, 14);
    }
  } else if (plots) {
    // Paddy plots on the right half, parted by dotted bunds.
    const ox = w * 0.58;
    const oy = h * 0.14;
    const pw = Math.min(w * 0.36, 520);
    const ph = h * 0.56;
    ctx.strokeStyle = col.hedge;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([1.2, 3.4]);
    ctx.globalAlpha = 0.9;
    for (let i = 0; i <= 4; i++) {
      const x = ox + (pw * i) / 4 + (i % 2 ? 6 : -4);
      hedge(x, oy, x + 12, oy + ph);
    }
    for (let j = 0; j <= 3; j++) {
      const y = oy + (ph * j) / 3 + (j % 2 ? -5 : 4);
      hedge(ox, y, ox + pw + 12, y + 8);
    }
    ctx.setLineDash([]);
    ctx.strokeStyle = col.accent;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(ox - 8, oy - 8);
    ctx.lineTo(ox + pw + 10, oy - 2);
    ctx.lineTo(ox + pw + 24, oy + ph + 14);
    ctx.lineTo(ox + 4, oy + ph + 6);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
    lane(ox + pw * 0.48, oy + ph + 6, ox + pw * 0.36, h + 4);
    hatch(ox + pw * 0.62, oy + ph * 0.38, 30, 20);
    labelLine = [ox + 10, oy + ph * 0.5 - 6, 0.018];
  }

  // The place name, set along its field as a surveyor would.
  if (label) {
    const [lx, ly, ang] = place ? [w * place[0], h * place[1], -0.02] : labelLine || [w * 0.64, h * 0.42, -0.02];
    ctx.save();
    ctx.fillStyle = col.muted;
    ctx.font = `500 13px ${col.body}`;
    ctx.translate(lx, ly);
    ctx.rotate(ang);
    ctx.fillText(label, 0, 0);
    ctx.restore();
  }

  // Two fold creases.
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = col.ink;
  ctx.fillRect(Math.round(w * 0.5), 0, 1, h);
  ctx.fillRect(0, Math.round(h * 0.55), w, 1);
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = col.sheet;
  ctx.fillRect(Math.round(w * 0.5) + 1, 0, 1, h);
  ctx.fillRect(0, Math.round(h * 0.55) + 1, w, 1);
  ctx.globalAlpha = 1;

  // Fade the map under the text side so the words keep their contrast.
  if (scrim === "left") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = col.ink;
    const steps = 48;
    const narrow = w < 720;
    const end = narrow ? Math.min(h * 0.62, 620) : w * 0.56;
    for (let i = 0; i < steps; i++) {
      const p0 = (end * i) / steps;
      ctx.globalAlpha = Math.max(0, 0.94 * (1 - i / steps) ** 1.2);
      if (narrow) ctx.fillRect(0, p0, w, end / steps + 1);
      else ctx.fillRect(p0, 0, end / steps + 1, h);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }
}

export default function SurveyMap({ seed = 7, label, labelAt, around, scrim = "none", plots = true, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    let frame = 0;
    const host = canvas.parentElement && canvas.parentElement.parentElement;
    const target = around && host ? host.querySelector(around) : null;
    const measure = () => {
      if (!target) return null;
      const a = canvas.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      return { x: b.left - a.left, y: b.top - a.top, width: b.width, height: b.height };
    };
    const paint = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => draw(canvas, { seed, label, labelAt, scrim, plots, frame: measure() }));
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(canvas);
    if (target) ro.observe(target);
    const mo = new MutationObserver(paint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(paint);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mo.disconnect();
    };
  }, [seed, label, labelAt && labelAt.join(), around, scrim, plots]);

  return (
    <div className={`survey-map ${className}`}>
      <canvas ref={ref} className="survey-map__canvas" aria-hidden="true" />
      {children}
    </div>
  );
}
