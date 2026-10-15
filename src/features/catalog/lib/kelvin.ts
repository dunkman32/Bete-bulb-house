// Color temperatures: the guide's four, and the light color of a value like "3000K".

export type Kelvin = { value: string; name: string; use: string; glow: string };

export const KELVINS: Kelvin[] = [
  {
    value: '2700K',
    name: 'ძალიან თბილი',
    use: 'ფილამენტური ნათურები, ბარი, საღამოს ატმოსფერო',
    glow: 'var(--color-kelvin-2700)',
  },
  {
    value: '3000K',
    name: 'თბილი თეთრი',
    use: 'მისაღები, საძინებელი, სასადილო',
    glow: 'var(--color-kelvin-3000)',
  },
  {
    value: '4000K',
    name: 'ნეიტრალური',
    use: 'სამზარეულო, აბაზანა, სამუშაო მაგიდა',
    glow: 'var(--color-kelvin-4000)',
  },
  {
    value: '6000K',
    name: 'ცივი თეთრი',
    use: 'ავტოფარეხი, სახელოსნო, საწყობი',
    glow: 'var(--color-kelvin-6000)',
  },
];

/** A light color for a temperature like "3000K" (the nearest of the guide's four). */
export function kelvinGlow(value: string) {
  const kelvin = parseInt(value, 10);
  if (kelvin <= 2800) return KELVINS[0]!.glow;
  if (kelvin <= 3500) return KELVINS[1]!.glow;
  if (kelvin <= 5000) return KELVINS[2]!.glow;
  return KELVINS[3]!.glow;
}

export const isKelvinValue = (value: string) => /^\d{4}K$/.test(value);
