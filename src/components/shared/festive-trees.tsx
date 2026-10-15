import { useId, type CSSProperties } from 'react';

import { cn } from '@/lib/cn';

// Three trees wrapped in garlands, drawn in SVG so every bulb can switch on by itself. Light
// theme: daytime, bulbs off. Dark theme: each garland lights up bulb by bulb from the top, then
// twinkles; the star and the sky come on too (`.festive-*` in index.css).

type TreeSpec = {
  cx: number;
  top: number;
  bottom: number;
  /** Half the width at the base. */
  width: number;
  swags: number;
  palette: string[];
  /** When this tree's garland starts lighting up. */
  startMs: number;
  star?: boolean;
};

const MULTI = ['#ff4d5e', '#ffd166', '#5ad1ff', '#7ee08a', '#ff7ad9', '#ffb46b'];
const WARM = ['#ffc46b', '#ffb45a', '#ffd38a'];

const TREES: TreeSpec[] = [
  { cx: 150, top: 150, bottom: 340, width: 80, swags: 4, palette: WARM, startMs: 250 },
  { cx: 330, top: 44, bottom: 344, width: 134, swags: 7, palette: MULTI, startMs: 0, star: true },
  { cx: 508, top: 112, bottom: 342, width: 94, swags: 5, palette: WARM, startMs: 450 },
];

/** Tiers from the top: where each starts and ends (fractions of the height), half-width at its base. */
const TIERS = [
  [0, 0.4, 0.52],
  [0.24, 0.7, 0.78],
  [0.5, 1, 1],
] as const;

const STEP_MS = 32;

type Point = { x: number; y: number };

const bezier = (p0: Point, c: Point, p2: Point, t: number): Point => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t ** 2 * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p2.y,
});

/** A stable 0–1 number per bulb, for twinkle timings that look random but don't change. */
const noise = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function buildTree(tree: TreeSpec) {
  const height = tree.bottom - tree.top;
  // The silhouette's half-width at y: the widest tier there (tiers flare out at their bases).
  const halfWidthAt = (y: number) => {
    const at = (y - tree.top) / height;
    const widths = TIERS.filter(([start, end]) => at >= start && at <= end).map(
      ([start, end, spread]) => ((at - start) / (end - start)) * spread * tree.width,
    );
    return Math.max(0, ...widths) * 0.88;
  };
  const band = (height * 0.8) / tree.swags;

  const swags = Array.from({ length: tree.swags }, (_, index) => {
    const yLeft = tree.top + height * 0.13 + index * band;
    const yRight = yLeft + band * 0.75;
    const left = { x: tree.cx - halfWidthAt(yLeft), y: yLeft };
    const right = { x: tree.cx + halfWidthAt(yRight), y: yRight };
    const control = { x: (left.x + right.x) / 2, y: (yLeft + yRight) / 2 + height * 0.05 };
    const count = Math.max(3, Math.round((right.x - left.x) / 15));
    const points = Array.from({ length: count }, (_, j) =>
      bezier(left, control, right, (j + 0.5) / count),
    );
    return { d: `M${left.x} ${left.y}Q${control.x} ${control.y} ${right.x} ${right.y}`, points };
  });

  const bulbs = swags
    .flatMap((swag) => swag.points)
    .map((point, index) => ({
      ...point,
      color: tree.palette[index % tree.palette.length]!,
      on: tree.startMs + index * STEP_MS,
      seed: tree.cx + index,
    }));

  return { swags, bulbs };
}

const BUILT = TREES.map((tree) => ({ tree, ...buildTree(tree) }));
const COLORS = [...new Set([...MULTI, ...WARM])];

const SKY = Array.from({ length: 18 }, (_, index) => ({
  x: 20 + noise(index + 1) * 600,
  y: 12 + noise(index + 40) * 110,
  r: 0.8 + noise(index + 80) * 1.2,
  seed: index,
}));

function starPath(cx: number, cy: number, outer: number, inner: number) {
  return (
    Array.from({ length: 10 }, (_, index) => {
      const radius = index % 2 === 0 ? outer : inner;
      const angle = (Math.PI / 5) * index - Math.PI / 2;
      return `${index === 0 ? 'M' : 'L'}${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`;
    }).join('') + 'Z'
  );
}

const twinkle = (seed: number, onMs: number): CSSProperties =>
  ({
    '--on': `${onMs}ms`,
    '--tw': `${1.6 + noise(seed) * 1.6}s`,
    '--tw-delay': `${onMs + 600 + noise(seed + 7) * 1400}ms`,
  }) as CSSProperties;

export function FestiveTrees({ className }: { className?: string }) {
  // Gradient ids must be unique on the page (the banner can be shown twice).
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const haloId = (color: string) => `${id}-halo-${COLORS.indexOf(color)}`;

  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="ნაძვის ხეები, შემოხვეული გირლიანდებით"
      className={cn('festive block w-full', className)}
    >
      <defs>
        {COLORS.map((color) => (
          <radialGradient key={color} id={haloId(color)}>
            <stop offset="0" stopColor={color} stopOpacity="0.85" />
            <stop offset="0.45" stopColor={color} stopOpacity="0.28" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
        <radialGradient id={`${id}-star`}>
          <stop offset="0" stopColor="#ffd166" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
      </defs>

      {SKY.map((star) => (
        <circle
          key={star.seed}
          cx={star.x}
          cy={star.y}
          r={star.r}
          className="festive-sky fill-on-ink"
          style={twinkle(star.seed + 300, 800)}
        />
      ))}

      {BUILT.map(({ tree, swags, bulbs }) => {
        const height = tree.bottom - tree.top;
        return (
          <g key={tree.cx}>
            <rect
              x={tree.cx - tree.width * 0.09}
              y={tree.bottom - 8}
              width={tree.width * 0.18}
              height={26}
              rx={3}
              className="fill-trunk"
            />
            {TIERS.map(([start, end, spread]) => {
              const apex = tree.top + start * height;
              const base = tree.top + end * height;
              const half = spread * tree.width;
              return (
                <g key={start}>
                  <path
                    d={`M${tree.cx} ${apex}L${tree.cx + half} ${base}Q${tree.cx} ${base + height * 0.07} ${tree.cx - half} ${base}Z`}
                    className="fill-tree"
                  />
                  <path
                    d={`M${tree.cx} ${apex}L${tree.cx + half} ${base}Q${tree.cx + half * 0.5} ${base + height * 0.05} ${tree.cx} ${base + height * 0.035}Z`}
                    className="fill-tree-shade"
                  />
                </g>
              );
            })}

            {swags.map((swag) => (
              <path key={swag.d} d={swag.d} fill="none" strokeWidth={1.2} className="stroke-wire" />
            ))}

            {bulbs.map((bulb) => (
              <g
                key={`${bulb.x}-${bulb.y}`}
                style={{ ...twinkle(bulb.seed, bulb.on), '--c': bulb.color } as CSSProperties}
              >
                <circle
                  cx={bulb.x}
                  cy={bulb.y + 4}
                  r={11}
                  fill={`url(#${haloId(bulb.color)})`}
                  className="festive-bulb-halo"
                />
                <rect
                  x={bulb.x - 1.5}
                  y={bulb.y - 0.5}
                  width={3}
                  height={2.6}
                  rx={0.6}
                  className="fill-wire"
                />
                <ellipse
                  cx={bulb.x}
                  cy={bulb.y + 4.4}
                  rx={2.7}
                  ry={3.4}
                  className="festive-bulb-glass"
                />
              </g>
            ))}

            {tree.star && (
              <g style={twinkle(999, 0)}>
                <circle
                  cx={tree.cx}
                  cy={tree.top - 6}
                  r={34}
                  fill={`url(#${id}-star)`}
                  className="festive-bulb-halo"
                />
                <path d={starPath(tree.cx, tree.top - 6, 15, 6.5)} className="festive-star" />
              </g>
            )}
          </g>
        );
      })}

      <path d="M0 380C70 352 160 336 320 346S560 332 640 338V380Z" className="fill-snow" />
    </svg>
  );
}
