import type {
  Category,
  CategoryId,
  Product,
  ProductBadge,
  ProductColor,
  ProductSpec,
} from '@/features/catalog/types';
import type { ImageAsset } from '@/lib/image';
import { lari } from '@/lib/money';

// Demo catalog until the commerce backend exists. Photos: Unsplash (free to use), hotlinked like a
// CMS's CDN would be.

const unsplash = (id: string, alt: string): ImageAsset => ({
  url: `https://images.unsplash.com/photo-${id}`,
  alt,
});

export const COLORS = {
  white: { id: 'white', name: 'თეთრი', swatch: '#f7f6f3' },
  black: { id: 'black', name: 'შავი', swatch: '#141518' },
  graphite: { id: 'graphite', name: 'გრაფიტი', swatch: '#4a4b4f' },
  grey: { id: 'grey', name: 'ნაცრისფერი', swatch: '#9a9ca0' },
  brass: { id: 'brass', name: 'ლატუნი', swatch: 'linear-gradient(135deg, #e3c27a, #9c7432)' },
  bronze: { id: 'bronze', name: 'ბრინჯაო', swatch: 'linear-gradient(135deg, #7a5638, #3e2a1e)' },
  aluminium: {
    id: 'aluminium',
    name: 'ალუმინი',
    swatch: 'linear-gradient(135deg, #f1f2f3, #a9adb2)',
  },
  opal: { id: 'opal', name: 'მქრქალი თეთრი', swatch: '#f1efe9' },
  clear: {
    id: 'clear',
    name: 'გამჭვირვალე',
    swatch: 'linear-gradient(135deg, #ffffff 30%, #dcd6ca)',
  },
  amber: { id: 'amber', name: 'ქარვისფერი', swatch: 'linear-gradient(135deg, #f0b25c, #a8641c)' },
  rgb: {
    id: 'rgb',
    name: 'RGB',
    swatch: 'conic-gradient(#ff5a5a, #ffd75a, #5aff8c, #5ab4ff, #c45aff, #ff5a5a)',
  },
  warm: { id: 'warm', name: 'თბილი თეთრი', swatch: '#ffc587' },
  cold: { id: 'cold', name: 'ცივი თეთრი', swatch: '#e6efff' },
  multi: {
    id: 'multi',
    name: 'ფერადი',
    swatch: 'conic-gradient(#ff5a5a, #ffd75a, #5aff8c, #5ab4ff, #ff5a5a)',
  },
  pine: { id: 'pine', name: 'მწვანე', swatch: '#2f4a3a' },
} satisfies Record<string, ProductColor>;

export const OPTION_NAMES = {
  kelvin: 'ფერის ტემპერატურა',
  length: 'სიგრძე',
  gangs: 'ღილაკები',
  type: 'ტიპი',
  height: 'სიმაღლე',
};

export const CATEGORIES: Category[] = [
  {
    id: 'holiday',
    title: 'საახალწლო განათება',
    shortTitle: 'საახალწლო',
    description:
      'გირლიანდები ნაძვის ხისთვის, ფანჯრისა და ეზოსთვის — ფარდები, ლოლუები და ვარსკვლავები.',
    image: unsplash('1612979168796-bcae1575b8c5', 'ნაძვის ხე თბილი გირლიანდით'),
    seasonal: true,
  },
  {
    id: 'track',
    title: 'რელსური განათება',
    shortTitle: 'რელსური',
    description: 'რელსები, სპოტები და მაგნიტური სისტემები — სინათლე ზუსტად იქ, სადაც გჭირდება.',
    image: unsplash('1789749754444-91a3744e187e', 'შავი ხაზოვანი რელსი და LED ხაზი ჭერზე'),
  },
  {
    id: 'led',
    title: 'LED განათება',
    shortTitle: 'LED',
    description: 'LED ზოლები, პროფილები, პანელები და ჩაშენებული სპოტები.',
    image: unsplash('1642610956697-99ead57cec7b', 'ფარული LED ზოლი ჭერის კარნიზში'),
  },
  {
    id: 'bulbs',
    title: 'ნათურები',
    shortTitle: 'ნათურები',
    description: 'ეკონომიური LED, ფილამენტური ედისონი და ჭკვიანი RGB ნათურები.',
    image: unsplash('1761318120543-2ad58b4dc1df', 'ჩამოკიდებული ფილამენტური ნათურები'),
  },
  {
    id: 'sockets',
    title: 'როზეტები',
    shortTitle: 'როზეტები',
    description: 'დამიწებული, USB-ით, გარე და მრავალადგილიანი როზეტები.',
    image: unsplash('1761213949443-17464417dc8c', 'ორმაგი როზეტი ტექსტურიან კედელზე'),
  },
  {
    id: 'switches',
    title: 'ჩამრთველები',
    shortTitle: 'ჩამრთველები',
    description: 'კლავიშიანი, ტუმბლერის ჩამრთველები და დიმერები.',
    image: unsplash('1788245741531-27d3ee7bf319', 'შავი ჩამრთველი ლატუნის ტუმბლერით'),
  },
  {
    id: 'smart',
    title: 'სენსორული ჩამრთველები',
    shortTitle: 'სენსორული',
    description: 'მინის სენსორული პანელები, სცენები და ჭკვიანი სახლის ჰაბები.',
    image: unsplash('1631551045549-9a735b8e4ea3', 'შავი სენსორული ღილაკი ON/OFF'),
  },
];

type ProductInput = {
  slug: string;
  title: string;
  categoryId: CategoryId;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: [id: string, alt: string][];
  colorImages?: Partial<Record<string, [id: string, alt: string][]>>;
  colors: ProductColor[];
  /** `surcharges`: lari added to the base price per value. */
  option?: { name: string; values: string[]; surcharges?: number[] };
  badges?: ProductBadge[];
  specs: [label: string, value: string][];
  daysAgo: number;
};

const SEED_DATE = Date.UTC(2026, 9, 15);

/** A stable pseudo-random stock (0–12) per variant, so some show as sold out or nearly. */
function stockFor(key: string) {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return Math.max(0, (hash % 14) - 1);
}

function product(input: ProductInput, index: number): Product {
  const id = `p${String(index + 1).padStart(3, '0')}`;
  const badges = input.badges ?? [];
  const optionValues: (string | undefined)[] = input.option?.values ?? [undefined];
  const toImages = (list: [string, string][]) => list.map(([photo, alt]) => unsplash(photo, alt));

  return {
    id,
    slug: input.slug,
    title: input.title,
    categoryId: input.categoryId,
    description: input.description,
    price: lari(input.price),
    compareAtPrice: input.compareAtPrice ? lari(input.compareAtPrice) : undefined,
    images: toImages(input.images),
    colorImages: input.colorImages
      ? Object.fromEntries(
          Object.entries(input.colorImages).map(([color, list]) => [color, toImages(list ?? [])]),
        )
      : undefined,
    colors: input.colors,
    option: input.option && { name: input.option.name, values: input.option.values },
    variants: input.colors.flatMap((color) =>
      optionValues.map((value, valueIndex) => {
        const surcharge = input.option?.surcharges?.[valueIndex] ?? 0;
        const suffix = value ? `-${value.replace(/[^\p{L}\p{N}]+/gu, '')}` : '';
        return {
          id: `${id}-${color.id}${suffix}`,
          sku: `BT-${id.slice(1)}-${color.id.slice(0, 3).toUpperCase()}${suffix.toUpperCase()}`,
          colorId: color.id,
          option: value,
          price: lari(input.price + surcharge),
          compareAtPrice: input.compareAtPrice ? lari(input.compareAtPrice + surcharge) : undefined,
          stock: stockFor(`${input.slug}-${color.id}-${value ?? ''}`),
        };
      }),
    ),
    badges: input.compareAtPrice && !badges.includes('sale') ? [...badges, 'sale'] : badges,
    specs: input.specs.map(([label, value]): ProductSpec => ({ label, value })),
    createdAt: new Date(SEED_DATE - input.daysAgo * 86_400_000).toISOString(),
  };
}

const KELVIN_WARM_NEUTRAL = ['3000K', '4000K'];

const PRODUCT_INPUTS: ProductInput[] = [
  {
    slug: 'track-spot-focus',
    title: 'რელსური სპოტი Focus 20W',
    categoryId: 'track',
    description:
      'მბრუნავი და დახრილი სპოტი ერთფაზიანი რელსისთვის. 24°-იანი ლინზა სინათლეს ზუსტად იქ აგროვებს, სადაც გჭირდება — ნახატზე, სამზარეულოს კუნძულზე ან თაროზე.',
    price: 89,
    images: [
      ['1526116638181-d787e552d669', 'შავი რელსი ორი სპოტით თეთრ ჭერზე'],
      ['1553419096-550fab84d0a4', 'შავი სპოტები ბადისებრ ჭერზე'],
    ],
    colors: [COLORS.black, COLORS.white],
    option: { name: OPTION_NAMES.kelvin, values: KELVIN_WARM_NEUTRAL },
    badges: ['bestseller'],
    specs: [
      ['სიმძლავრე', '20W'],
      ['სინათლის ნაკადი', '1 800 lm'],
      ['ფერის გადმოცემა', 'CRI > 90'],
      ['სხივის კუთხე', '24°, მბრუნავი 350°'],
      ['ძაბვა', '220–240V'],
      ['დაცვის კლასი', 'IP20'],
      ['სიცოცხლის ხანგრძლივობა', '30 000 სთ'],
      ['გარანტია', '2 წელი'],
    ],
    daysAgo: 60,
  },
  {
    slug: 'track-rail',
    title: 'ერთფაზიანი რელსი',
    categoryId: 'track',
    description:
      'ალუმინის რელსი სპოტების დასამაგრებლად — პირდაპირ ჭერზე ან დაკიდებით. კომპლექტშია კვების ბოლო, საფარი და სამაგრები.',
    price: 45,
    images: [['1789749754444-91a3744e187e', 'შავი ხაზოვანი რელსი ჭერზე']],
    colors: [COLORS.black, COLORS.white],
    option: { name: OPTION_NAMES.length, values: ['1 მ', '2 მ', '3 მ'], surcharges: [0, 30, 60] },
    specs: [
      ['მასალა', 'ალუმინი'],
      ['ტიპი', 'ერთფაზიანი, 3 სადენი'],
      ['მაქს. დატვირთვა', '3 500W'],
      ['მონტაჟი', 'ჭერზე ან დაკიდებით'],
      ['გარანტია', '5 წელი'],
    ],
    daysAgo: 120,
  },
  {
    slug: 'track-kit',
    title: 'რელსური კომპლექტი: 2 მ + 4 სპოტი',
    categoryId: 'track',
    description:
      'ყველაფერი ერთ ყუთში: 2-მეტრიანი რელსი, ოთხი სპოტი, კონექტორები და სამაგრები. იდეალურია სამზარეულოსთვის, მისაღებისთვის და შოურუმისთვის.',
    price: 349,
    compareAtPrice: 419,
    images: [
      ['1742196642261-b1b232abf483', 'თეთრი რელსური სპოტები ჭერზე'],
      ['1588854337236-6889d631faa8', 'სამზარეულო რელსური განათებით'],
    ],
    colors: [COLORS.white, COLORS.black],
    option: { name: OPTION_NAMES.kelvin, values: KELVIN_WARM_NEUTRAL },
    specs: [
      ['შემადგენლობა', 'რელსი 2 მ, 4 × სპოტი 15W, 2 კონექტორი'],
      ['ჯამური სიმძლავრე', '60W'],
      ['სინათლის ნაკადი', '5 400 lm'],
      ['ფერის გადმოცემა', 'CRI > 90'],
      ['ძაბვა', '220–240V'],
      ['გარანტია', '2 წელი'],
    ],
    daysAgo: 35,
  },
  {
    slug: 'magnetic-linear',
    title: 'მაგნიტური ხაზოვანი მოდული 24W',
    categoryId: 'track',
    description:
      '48V მაგნიტური სისტემის ხაზოვანი სანათი: ჩადე რელსში და გადაადგილე ხელსაწყოს გარეშე. თანაბარი, უჩრდილო სინათლე სამუშაო ზედაპირისთვის.',
    price: 119,
    images: [
      ['1770816306397-f4517ccbf63d', 'ხაზოვანი LED სანათები ბნელ ინტერიერში'],
      ['1652540166492-4b700df31f56', 'ხაზოვანი სანათები თეთრ ჭერზე'],
    ],
    colors: [COLORS.black],
    option: { name: OPTION_NAMES.kelvin, values: KELVIN_WARM_NEUTRAL },
    badges: ['new'],
    specs: [
      ['სიმძლავრე', '24W'],
      ['სინათლის ნაკადი', '2 200 lm'],
      ['სიგრძე', '600 მმ'],
      ['ძაბვა', '48V DC (მაგნიტური რელსი)'],
      ['ფერის გადმოცემა', 'CRI > 90'],
      ['გარანტია', '3 წელი'],
    ],
    daysAgo: 6,
  },
  {
    slug: 'track-globe',
    title: 'რელსური სანათი Globe',
    categoryId: 'track',
    description:
      'მატოვი შუშის ბურთი რელსზე: რბილი, გაფანტული სინათლე, რომელიც თვალს არ ჭრის. კაფეებისთვის, სასადილოებისთვის და დერეფნებისთვის.',
    price: 69,
    images: [['1570745096194-6d51a9fe3d95', 'რელსური სანათები თეთრი ბურთებით']],
    colors: [COLORS.black, COLORS.white],
    option: { name: OPTION_NAMES.kelvin, values: ['2700K', '4000K'] },
    specs: [
      ['ცოკოლი', 'E27 (ნათურა შედის)'],
      ['სიმძლავრე', '8W'],
      ['დიამეტრი', '120 მმ'],
      ['ძაბვა', '220–240V'],
      ['გარანტია', '2 წელი'],
    ],
    daysAgo: 90,
  },
  {
    slug: 'surface-cylinder',
    title: 'ზედაპირული ცილინდრი 12W',
    categoryId: 'track',
    description:
      'ჭერზე დასამაგრებელი ცილინდრი ღრმად ჩამჯდარი LED-ით: არ ჭრის თვალს და კედელზე ხატავს ლამაზ სინათლის ლაქას.',
    price: 59,
    images: [['1636891852883-862c06a10c90', 'ცილინდრული სანათი თბილი სინათლით']],
    colors: [COLORS.black, COLORS.white],
    option: { name: OPTION_NAMES.kelvin, values: KELVIN_WARM_NEUTRAL },
    badges: ['new'],
    specs: [
      ['სიმძლავრე', '12W'],
      ['სინათლის ნაკადი', '1 000 lm'],
      ['სხივის კუთხე', '36°'],
      ['დიამეტრი', '75 მმ'],
      ['დაცვის კლასი', 'IP20'],
      ['გარანტია', '2 წელი'],
    ],
    daysAgo: 9,
  },
  {
    slug: 'led-strip',
    title: 'LED ზოლი 5 მ, 12V',
    categoryId: 'led',
    description:
      'მოქნილი LED ზოლი წებოვანი ზურგით — კარნიზისთვის, თაროებისთვის, კიბისთვის. 120 დიოდი მეტრზე: ხაზი ერთიანია, წერტილების გარეშე.',
    price: 39,
    images: [['1642610956697-99ead57cec7b', 'ფარული LED ზოლი ჭერის კარნიზში']],
    colors: [COLORS.white],
    option: { name: OPTION_NAMES.kelvin, values: ['3000K', '4000K', '6000K'] },
    badges: ['bestseller'],
    specs: [
      ['სიგრძე', '5 მ'],
      ['სიმძლავრე', '9,6W/მ'],
      ['დიოდები', '120/მ'],
      ['ძაბვა', '12V DC (კვების ბლოკი ცალკე)'],
      ['ჭრა', 'ყოველ 5 სმ-ში'],
      ['დაცვის კლასი', 'IP20'],
    ],
    daysAgo: 150,
  },
  {
    slug: 'led-strip-rgb-wifi',
    title: 'RGB LED ზოლი Wi-Fi, 5 მ',
    categoryId: 'led',
    description:
      '16 მილიონი ფერი, სცენები და მუსიკაზე რეაგირება — იმართება აპით და ხმით. კვების ბლოკი და კონტროლერი კომპლექტშია.',
    price: 79,
    compareAtPrice: 99,
    images: [
      ['1659066019874-7a15628cea60', 'ფერადი LED ზოლი ბნელ ფონზე'],
      ['1618403323851-ac3d38029495', 'ცისფერი LED შლანგი ბნელ ფონზე'],
    ],
    colors: [COLORS.rgb],
    specs: [
      ['სიგრძე', '5 მ'],
      ['ფერები', 'RGB, 16 მლნ'],
      ['მართვა', 'Wi-Fi, აპი, Alexa, Google Home'],
      ['ძაბვა', '12V DC'],
      ['დაცვის კლასი', 'IP20'],
    ],
    daysAgo: 45,
  },
  {
    slug: 'aluminium-profile',
    title: 'ალუმინის LED პროფილი',
    categoryId: 'led',
    description:
      'ჩასაშენებელი პროფილი მქრქალი დიფუზორით: LED ზოლი იქცევა ერთიან, ნათელ ხაზად. გიფსოკარდონისთვის, ავეჯისთვის და კედლისთვის.',
    price: 25,
    images: [['1584259097630-4d5cb684a0ec', 'ნათელი LED ხაზი კედლის კუთხეში']],
    colors: [COLORS.aluminium, COLORS.black],
    option: { name: OPTION_NAMES.length, values: ['1 მ', '2 მ'], surcharges: [0, 22] },
    specs: [
      ['მასალა', 'ანოდირებული ალუმინი'],
      ['დიფუზორი', 'მქრქალი, ოპალი'],
      ['ზოლის მაქს. სიგანე', '12 მმ'],
      ['სიღრმე', '15 მმ'],
      ['კომპლექტში', 'საცობები და სამაგრები'],
    ],
    daysAgo: 70,
  },
  {
    slug: 'led-panel',
    title: 'LED პანელი 60×60, 40W',
    categoryId: 'led',
    description:
      'თხელი პანელი Armstrong-ის ჭერისთვის ან ზედაპირზე: თანაბარი, არამბრწყინავი სინათლე ოფისისთვის, სამზარეულოსთვის და საკლასო ოთახისთვის.',
    price: 65,
    images: [['1789713340650-6f3b3cbe3ae7', 'კვადრატული LED პანელები ჭერზე']],
    colors: [COLORS.white],
    option: { name: OPTION_NAMES.kelvin, values: ['4000K', '6000K'] },
    specs: [
      ['სიმძლავრე', '40W'],
      ['სინათლის ნაკადი', '4 000 lm'],
      ['ზომა', '595 × 595 მმ'],
      ['მბრწყინვარება', 'UGR < 19'],
      ['გარანტია', '3 წელი'],
    ],
    daysAgo: 200,
  },
  {
    slug: 'recessed-downlight',
    title: 'ჩაშენებული LED სპოტი 7W',
    categoryId: 'led',
    description:
      'ღრმა რეფლექტორიანი სპოტი გიფსოკარდონის ჭერისთვის. ჭრილი Ø75 მმ — მონტაჟი წუთში, ზამბარიანი სამაგრებით.',
    price: 19,
    images: [
      ['1771599141394-bc646d21cd61', 'ჩაშენებული სანათები ბნელ ჭერზე'],
      ['1763718476503-8d0b81eb1746', 'ჩაშენებული სანათები თბილი სინათლით'],
    ],
    colors: [COLORS.white, COLORS.black],
    option: { name: OPTION_NAMES.kelvin, values: KELVIN_WARM_NEUTRAL },
    badges: ['bestseller'],
    specs: [
      ['სიმძლავრე', '7W'],
      ['სინათლის ნაკადი', '600 lm'],
      ['ჭრილი', 'Ø75 მმ'],
      ['სხივის კუთხე', '38°'],
      ['ფერის გადმოცემა', 'CRI > 90'],
      ['დაცვის კლასი', 'IP20'],
    ],
    daysAgo: 110,
  },
  {
    slug: 'wall-light-duo',
    title: 'კედლის სანათი Duo',
    categoryId: 'led',
    description:
      'ორმხრივი სანათი: სინათლე ზემოთ და ქვემოთ, კედელზე მკაფიო ფიგურებით. დერეფნისთვის, კიბისთვის და ფასადისთვის — IP54.',
    price: 85,
    images: [
      ['1788170396975-6e64e0f8c4ae', 'ორმაგი მილისებრი კედლის სანათი ქვის კედელზე'],
      ['1760977817633-86910d0dfe3d', 'კედლის სანათების სინათლის ფიგურები'],
    ],
    colors: [COLORS.black, COLORS.brass],
    badges: ['new'],
    specs: [
      ['სიმძლავრე', '2 × 6W'],
      ['ფერის ტემპერატურა', '3000K'],
      ['დაცვის კლასი', 'IP54 (გარეთაც)'],
      ['მასალა', 'ალუმინი'],
      ['გარანტია', '2 წელი'],
    ],
    daysAgo: 12,
  },
  {
    slug: 'led-bulb-a60',
    title: 'LED ნათურა E27, 10W',
    categoryId: 'bulbs',
    description:
      'ჩვეულებრივი ნათურის ფორმა და 85%-ით ნაკლები ხარჯი. ინთება მყისიერად, არ ციმციმებს და 15 წელი ძლებს.',
    price: 6,
    images: [
      ['1532007271951-c487760934ae', 'თეთრი LED ნათურა შავ ფონზე'],
      ['1674659719067-8735479ba10c', 'LED ნათურა თეთრ ზედაპირზე'],
    ],
    colors: [COLORS.opal],
    option: { name: OPTION_NAMES.kelvin, values: ['3000K', '4000K', '6000K'] },
    badges: ['bestseller'],
    specs: [
      ['სიმძლავრე', '10W (= 75W ჩვეულებრივი)'],
      ['სინათლის ნაკადი', '1 055 lm'],
      ['ცოკოლი', 'E27'],
      ['ძაბვა', '220–240V'],
      ['სიცოცხლის ხანგრძლივობა', '15 000 სთ'],
      ['ციმციმი', 'არა (flicker-free)'],
    ],
    daysAgo: 300,
  },
  {
    slug: 'led-bulb-15w',
    title: 'LED ნათურა E27, 15W',
    categoryId: 'bulbs',
    description:
      'მაღალი სიმძლავრის ნათურა დიდი ოთახებისთვის და ჭაღებისთვის — ცვლის 100-ვატიან ჩვეულებრივ ნათურას.',
    price: 9,
    images: [
      ['1590845947698-8924d7409b56', 'LED ნათურა ყვითელ ფონზე'],
      ['1775876201255-509501deb444', 'თეთრი LED ნათურა ყვითელ ფონზე'],
    ],
    colors: [COLORS.opal],
    option: { name: OPTION_NAMES.kelvin, values: ['3000K', '4000K', '6000K'] },
    specs: [
      ['სიმძლავრე', '15W (= 100W ჩვეულებრივი)'],
      ['სინათლის ნაკადი', '1 520 lm'],
      ['ცოკოლი', 'E27'],
      ['ძაბვა', '220–240V'],
      ['სიცოცხლის ხანგრძლივობა', '15 000 სთ'],
    ],
    daysAgo: 260,
  },
  {
    slug: 'filament-st64',
    title: 'ფილამენტური ნათურა ST64',
    categoryId: 'bulbs',
    description:
      'ედისონის სტილის ნათურა თბილი, ქარვისფერი ნათებით. დიმირდება — საღამოს ატმოსფეროსთვის და ღია სანათებისთვის.',
    price: 15,
    images: [
      ['1495291916458-c12f594151e7', 'ფილამენტური ნათურა შავ ზედაპირზე'],
      ['1761318120543-2ad58b4dc1df', 'ჩამოკიდებული ფილამენტური ნათურები'],
    ],
    colorImages: {
      clear: [['1556401615-c909c3d67480', 'გამჭვირვალე ფილამენტური ნათურა']],
    },
    colors: [COLORS.amber, COLORS.clear],
    option: { name: OPTION_NAMES.kelvin, values: ['2200K', '2700K'] },
    badges: ['bestseller'],
    specs: [
      ['სიმძლავრე', '6W (= 40W ჩვეულებრივი)'],
      ['სინათლის ნაკადი', '600 lm'],
      ['ცოკოლი', 'E27'],
      ['დიმირება', 'დიახ'],
      ['სიცოცხლის ხანგრძლივობა', '15 000 სთ'],
    ],
    daysAgo: 80,
  },
  {
    slug: 'filament-globe',
    title: 'ფილამენტური გლობუსი G125',
    categoryId: 'bulbs',
    description:
      'დიდი, 125 მმ-იანი ბურთი სპირალური ძაფით — თვითონ არის დეკორი და აბაჟური არ სჭირდება.',
    price: 25,
    images: [
      ['1513518647365-91830a8800b3', 'ფილამენტური გლობუსი ახლოდან'],
      ['1529704193007-e8c78f0f46f9', 'ანთებული გლობუსი ნათურა'],
    ],
    colors: [COLORS.clear, COLORS.amber],
    badges: ['new'],
    specs: [
      ['სიმძლავრე', '4W'],
      ['სინათლის ნაკადი', '400 lm'],
      ['ფერის ტემპერატურა', '2200K'],
      ['ცოკოლი', 'E27'],
      ['დიამეტრი', '125 მმ'],
      ['დიმირება', 'დიახ'],
    ],
    daysAgo: 14,
  },
  {
    slug: 'filament-tube',
    title: 'ფილამენტური მილი T30',
    categoryId: 'bulbs',
    description:
      'წაგრძელებული, 30-სანტიმეტრიანი ნათურა ვერტიკალური ძაფებით — ვინტაჟური კაფეებისა და ბარების საყვარელი.',
    price: 19,
    images: [['1766012513097-ff9d96be5d7b', 'წაგრძელებული ფილამენტური ნათურა']],
    colors: [COLORS.amber],
    specs: [
      ['სიმძლავრე', '4W'],
      ['ფერის ტემპერატურა', '2200K'],
      ['ცოკოლი', 'E27'],
      ['სიგრძე', '300 მმ'],
      ['დიმირება', 'დიახ'],
    ],
    daysAgo: 140,
  },
  {
    slug: 'smart-bulb-rgb',
    title: 'ჭკვიანი ნათურა RGB, Wi-Fi',
    categoryId: 'bulbs',
    description:
      'ნებისმიერი ფერი და თეთრის ნებისმიერი ტემპერატურა (2700–6500K). განრიგი, სცენები და ხმოვანი მართვა — ჰაბის გარეშე.',
    price: 29,
    compareAtPrice: 39,
    images: [
      ['1712294252418-680891540aa8', 'ჭკვიანი ნათურა ვარდისფერი და ნარინჯისფერი სინათლით'],
      ['1707727115439-eec63e83997d', 'ფერადი სინათლის ნათურა'],
    ],
    colors: [COLORS.rgb],
    specs: [
      ['სიმძლავრე', '9W'],
      ['სინათლის ნაკადი', '806 lm'],
      ['ფერები', 'RGB + თეთრი 2700–6500K'],
      ['ცოკოლი', 'E27'],
      ['კავშირი', 'Wi-Fi 2,4 GHz'],
      ['ხმოვანი მართვა', 'Alexa, Google Home'],
    ],
    daysAgo: 30,
  },
  {
    slug: 'double-socket',
    title: 'ორმაგი როზეტი დამიწებით',
    categoryId: 'sockets',
    description:
      'ორმაგი როზეტი დამიწებით და ბავშვთა დაცვით (შიდა ფარდებით). ჩარჩო და მექანიზმი ერთადაა.',
    price: 18,
    images: [
      ['1484024091473-858a1e7ece52', 'თეთრი ორმაგი როზეტი თეთრ კედელზე'],
      ['1761213949443-17464417dc8c', 'ორმაგი როზეტი ტექსტურიან კედელზე'],
    ],
    colors: [COLORS.white, COLORS.black],
    badges: ['bestseller'],
    specs: [
      ['დენი / ძაბვა', '16A, 250V'],
      ['დამიწება', 'დიახ'],
      ['ბავშვთა დაცვა', 'დიახ'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
      ['მასალა', 'ცეცხლგამძლე პოლიკარბონატი'],
    ],
    daysAgo: 220,
  },
  {
    slug: 'usb-socket',
    title: 'როზეტი USB-A + USB-C',
    categoryId: 'sockets',
    description:
      'ჩვეულებრივი როზეტი და ორი USB პორტი: დამუხტე ტელეფონი ადაპტერის გარეშე. USB-C — 20W სწრაფი დამუხტვით.',
    price: 45,
    images: [['1572805539340-6b743bb1d41d', 'კვადრატული თეთრი როზეტი კედელზე']],
    colors: [COLORS.white, COLORS.black],
    badges: ['new'],
    specs: [
      ['დენი / ძაბვა', '16A, 250V'],
      ['USB-A', '5V, 2,4A'],
      ['USB-C', 'PD 20W'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
    ],
    daysAgo: 8,
  },
  {
    slug: 'matte-black-socket',
    title: 'მატოვი შავი როზეტი',
    categoryId: 'sockets',
    description:
      'მატოვი, soft-touch ზედაპირი, რომელიც თითის ანაბეჭდებს არ იჭერს. იდეალურია მუქი და ნაცრისფერი ინტერიერისთვის.',
    price: 22,
    images: [
      ['1761479373576-ad4c1c5bb9af', 'შავი როზეტი და ჩამრთველი კედელზე'],
      ['1762330464388-de535963b42e', 'შავი შტეფსელები როზეტში'],
    ],
    colors: [COLORS.black],
    specs: [
      ['დენი / ძაბვა', '16A, 250V'],
      ['დამიწება', 'დიახ'],
      ['ბავშვთა დაცვა', 'დიახ'],
      ['ზედაპირი', 'მატოვი, soft-touch'],
    ],
    daysAgo: 55,
  },
  {
    slug: 'outdoor-socket',
    title: 'გარე როზეტი IP44 სახურავით',
    categoryId: 'sockets',
    description:
      'ტენგამძლე ორმაგი როზეტი აივნისთვის, ეზოსთვის და ავტოფარეხისთვის. ზამბარიანი სახურავი თავისით იკეტება.',
    price: 35,
    compareAtPrice: 42,
    images: [['1789540450428-1dad16ebcf9a', 'ორმაგი გარე როზეტი აგურის კედელზე']],
    colors: [COLORS.grey],
    specs: [
      ['დაცვის კლასი', 'IP44'],
      ['დენი / ძაბვა', '16A, 250V'],
      ['მონტაჟი', 'ზედაპირული'],
      ['სამუშაო ტემპერატურა', '−25…+40°C'],
    ],
    daysAgo: 100,
  },
  {
    slug: 'socket-block',
    title: 'როზეტების ბლოკი, 3 ადგილი',
    categoryId: 'sockets',
    description:
      'სამი როზეტი ერთ ჩარჩოში — სამუშაო მაგიდისთვის, სამზარეულოს ზედაპირისთვის და ტელევიზორის კედლისთვის.',
    price: 49,
    images: [['1759772237947-0c14aef755d5', 'როზეტების რიგი ტექსტურიან კედელზე']],
    colors: [COLORS.white],
    specs: [
      ['როზეტები', '3 × 16A'],
      ['ძაბვა', '250V'],
      ['ჩარჩოს ზომა', '228 × 86 მმ'],
      ['მონტაჟი', 'ჩაშენებული'],
    ],
    daysAgo: 180,
  },
  {
    slug: 'toggle-switch',
    title: 'ტუმბლერის ჩამრთველი, ლატუნი',
    categoryId: 'switches',
    description:
      'რეტრო ტუმბლერი მასიური ლატუნის ბერკეტით და ხრახნებით — ჩამრთველი, რომელიც ინტერიერის დეტალად იქცევა.',
    price: 59,
    images: [
      ['1784829054577-4e6bc11dec2d', 'თეთრი ჩამრთველი ლატუნის ტუმბლერით'],
      ['1788245741531-27d3ee7bf319', 'შავი ჩამრთველი ლატუნის ტუმბლერით'],
    ],
    colorImages: {
      white: [['1784829054577-4e6bc11dec2d', 'თეთრი ჩამრთველი ლატუნის ტუმბლერით']],
      black: [['1788245741531-27d3ee7bf319', 'შავი ჩამრთველი ლატუნის ტუმბლერით']],
      bronze: [
        ['1784853786388-3061d36644b4', 'ბრინჯაოს ჩამრთველი შავი ტუმბლერით'],
        ['1784929518875-6ff2ae2043e6', 'ბრინჯაოს ჩამრთველი ვერცხლისფერი ტუმბლერით'],
      ],
    },
    colors: [COLORS.white, COLORS.black, COLORS.bronze],
    option: {
      name: OPTION_NAMES.type,
      values: ['ერთპოლუსიანი', 'გადამრთველი'],
      surcharges: [0, 8],
    },
    badges: ['new', 'bestseller'],
    specs: [
      ['დენი / ძაბვა', '10A, 250V'],
      ['ბერკეტი', 'მასიური ლატუნი'],
      ['ჩარჩო', 'ფოლადი, ფხვნილოვანი საღებავი'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
    ],
    daysAgo: 4,
  },
  {
    slug: 'rocker-switch',
    title: 'კლავიშიანი ჩამრთველი',
    categoryId: 'switches',
    description: 'ჩუმი კლავიში რბილი სვლით. ერთმაგი ან ორმაგი — ორი სანათის ცალ-ცალკე სამართავად.',
    price: 12,
    images: [
      ['1505049590664-32c45c900585', 'თეთრი კლავიშიანი ჩამრთველი თეთრ კედელზე'],
      ['1623707430101-9e74cefe05e2', 'ორმაგი კლავიშიანი ჩამრთველი ახლოდან'],
    ],
    colors: [COLORS.white, COLORS.black],
    option: { name: OPTION_NAMES.gangs, values: ['1 კლავიში', '2 კლავიში'], surcharges: [0, 4] },
    badges: ['bestseller'],
    specs: [
      ['დენი / ძაბვა', '10A, 250V'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
      ['კლემები', 'ხრახნიანი'],
      ['მასალა', 'ცეცხლგამძლე პოლიკარბონატი'],
    ],
    daysAgo: 240,
  },
  {
    slug: 'rotary-dimmer',
    title: 'მბრუნავი დიმერი',
    categoryId: 'switches',
    description:
      'სიკაშკაშე ერთი ბრუნით, დაჭერით — ჩართვა/გამორთვა. მუშაობს LED-თან და ფილამენტურ დიმირებად ნათურებთან.',
    price: 39,
    images: [['1759647020638-72224b9003b1', 'მბრუნავი დიმერი კედელზე, თბილ სინათლეზე']],
    colors: [COLORS.white],
    specs: [
      ['LED დატვირთვა', '5–200W'],
      ['ჩვეულებრივი ნათურები', '400W-მდე'],
      ['კონტროლი', 'ფაზის ბოლო (trailing edge)'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
    ],
    daysAgo: 75,
  },
  {
    slug: 'touch-switch-glass',
    title: 'სენსორული ჩამრთველი, მინის პანელი',
    categoryId: 'smart',
    description:
      'ნაწრთობი მინის პანელი და ნაზი ღამის განათება. მართე შეხებით, აპით, ხმით ან განრიგით — Wi-Fi, ჰაბის გარეშე.',
    price: 69,
    images: [['1631551045549-9a735b8e4ea3', 'შავი სენსორული ღილაკი ON/OFF']],
    colors: [COLORS.black, COLORS.white],
    option: {
      name: OPTION_NAMES.gangs,
      values: ['1 ღილაკი', '2 ღილაკი', '3 ღილაკი'],
      surcharges: [0, 10, 20],
    },
    badges: ['bestseller'],
    specs: [
      ['მართვა', 'შეხება, აპი, ხმა, განრიგი'],
      ['კავშირი', 'Wi-Fi 2,4 GHz'],
      ['დატვირთვა', '600W ერთ ღილაკზე'],
      ['ნეიტრალი', 'საჭიროა'],
      ['ზომა', '86 × 86 მმ'],
      ['ხმოვანი მართვა', 'Alexa, Google Home'],
    ],
    daysAgo: 50,
  },
  {
    slug: 'scene-panel',
    title: 'სცენების პანელი, 4 ღილაკი',
    categoryId: 'smart',
    description:
      'ერთი შეხებით — „სტუმრები“, „კინო“, „ძილი“: პანელი ერთდროულად მართავს რამდენიმე სანათს, ჟალუზს და კონდიციონერს.',
    price: 129,
    images: [['1739083168122-f1f59db99e78', 'ჭკვიანი სცენების პანელი კედელზე']],
    colors: [COLORS.graphite],
    badges: ['new'],
    specs: [
      ['ღილაკები', '4 ღილაკი, 12-მდე სცენა'],
      ['კავშირი', 'Zigbee 3.0'],
      ['კვება', '230V'],
      ['ჰაბი', 'საჭიროა'],
    ],
    daysAgo: 3,
  },
  {
    slug: 'smart-panel-display',
    title: 'ჭკვიანი პანელი ეკრანით',
    categoryId: 'smart',
    description:
      'ტემპერატურა, სინათლე და სცენები ერთ პანელზე. ეკრანი თავისით ქრება, როცა არ გჭირდება.',
    price: 189,
    images: [
      ['1774876549389-e82a7bea84a3', 'შავი ჭკვიანი პანელი ციფრული ეკრანით'],
      ['1774876549476-254b00a5d648', 'შავი პანელი ეკრანით კედელზე'],
    ],
    colors: [COLORS.black],
    specs: [
      ['ეკრანი', '1,8"'],
      ['კავშირი', 'Wi-Fi + Zigbee'],
      ['ფუნქციები', 'თერმოსტატი, სინათლე, სცენები'],
      ['მონტაჟი', 'ჩაშენებული, Ø68 მმ ყუთი'],
    ],
    daysAgo: 20,
  },
  {
    slug: 'touch-switch-mini',
    title: 'სენსორული ჩამრთველი Mini',
    categoryId: 'smart',
    description:
      'კომპაქტური უსადენო ჩამრთველი: მონტაჟი კედლის ჭრის გარეშე, ორმხრივ წებოვანზე. ბატარეა 2 წელი ძლებს.',
    price: 49,
    compareAtPrice: 59,
    images: [['1576155031361-9bed5219ccc5', 'თეთრი სენსორული ჩამრთველები']],
    colors: [COLORS.white],
    specs: [
      ['კავშირი', 'Zigbee 3.0'],
      ['კვება', 'ბატარეა CR2032'],
      ['ბატარეის რესურსი', '~2 წელი'],
      ['მონტაჟი', 'ზედაპირული, წებოვანი'],
    ],
    daysAgo: 65,
  },
  {
    slug: 'smart-hub',
    title: 'ჭკვიანი სახლის ჰაბი Zigbee',
    categoryId: 'smart',
    description:
      'აერთიანებს 100-მდე Zigbee მოწყობილობას: ჩამრთველებს, სენსორებს, ნათურებს. სცენები მუშაობს ინტერნეტის გარეშეც.',
    price: 99,
    images: [['1752262167753-37a0ec83f614', 'ჭკვიანი სახლის ჰაბი მაგიდაზე']],
    colors: [COLORS.white],
    specs: [
      ['პროტოკოლი', 'Zigbee 3.0 + Bluetooth'],
      ['მოწყობილობები', '100-მდე'],
      ['კავშირი', 'Wi-Fi ან Ethernet'],
      ['მართვა', 'ლოკალური, ინტერნეტის გარეშეც'],
    ],
    daysAgo: 160,
  },
  {
    slug: 'fairy-garland',
    title: 'LED გირლიანდა ნაძვის ხისთვის',
    categoryId: 'holiday',
    description:
      'კლასიკური გირლიანდა 10 სმ-ში ერთი LED-ით: შემოახვიე ნაძვის ხეს, თაროს ან კიბის მოაჯირს. 8 რეჟიმი და ტაიმერი — თავისით ირთვება საღამოს.',
    price: 15,
    images: [
      ['1543516352-d4d7a2b39714', 'ნაძვის ხე თბილი თეთრი გირლიანდით'],
      ['1513538416877-f11f5fb85d83', 'სპილენძისფერი გირლიანდა ბნელ ფონზე'],
    ],
    colorImages: {
      multi: [['1513606002315-fcf434460146', 'ნაძვის ხე ფერადი გირლიანდით ბნელში']],
    },
    colors: [COLORS.warm, COLORS.multi],
    option: { name: OPTION_NAMES.length, values: ['5 მ', '10 მ', '20 მ'], surcharges: [0, 10, 25] },
    badges: ['bestseller'],
    specs: [
      ['LED-ები', '50 / 100 / 200'],
      ['რეჟიმები', '8 + ტაიმერი 6 სთ'],
      ['ძაბვა', '31V (უსაფრთხო)'],
      ['დაცვის კლასი', 'IP44 — გარეთაც'],
      ['სადენი', 'მწვანე, ნაძვის ტოტებში არ ჩანს'],
    ],
    daysAgo: 5,
  },
  {
    slug: 'tree-wrap-cluster',
    title: 'ნაძვის ხის გირლიანდა „კლასტერი“, 1000 LED',
    categoryId: 'holiday',
    description:
      'ხშირი, მოკლე ტოტებიანი გირლიანდა დიდი ხეებისთვის: ეზოს ნაძვი ან ქუჩის ხე ერთ საღამოში იქცევა სინათლის სვეტად. პულტით.',
    price: 69,
    images: [
      ['1671202102016-728241136e68', 'ხეები, შემოხვეული გირლიანდებით'],
      ['1612979168796-bcae1575b8c5', 'ნაძვის ტოტები თბილი გირლიანდით'],
    ],
    colorImages: {
      multi: [['1638454447593-253835346e8a', 'თოვლიანი ნაძვი ფერადი ნათურებით']],
    },
    colors: [COLORS.warm, COLORS.multi],
    option: { name: OPTION_NAMES.length, values: ['10 მ', '20 მ'], surcharges: [0, 50] },
    badges: ['new'],
    specs: [
      ['LED-ები', '1000 / 2000'],
      ['რეჟიმები', '8, პულტით'],
      ['დაცვის კლასი', 'IP44 — გარეთ'],
      ['კვების სადენი', '5 მ'],
    ],
    daysAgo: 3,
  },
  {
    slug: 'smart-rgb-garland',
    title: 'ჭკვიანი RGB გირლიანდა Wi-Fi, 250 LED',
    categoryId: 'holiday',
    description:
      'ყოველი LED ცალკე იმართება: ეფექტები, მუსიკაზე ციმციმი და შენი ნახატები ნაძვის ხეზე — აპით ან ხმით.',
    price: 79,
    compareAtPrice: 99,
    images: [
      ['1701443936964-6afadbd4c2a9', 'ფერადი სინათლის ნაძვის ხე ბნელში'],
      ['1573757747798-62adbde0f981', 'ფერადი გირლიანდა იატაკზე'],
    ],
    colors: [COLORS.rgb],
    specs: [
      ['LED-ები', '250, თითოეული ცალკე'],
      ['მართვა', 'Wi-Fi + Bluetooth, აპი, Alexa, Google Home'],
      ['სიგრძე', '20 მ'],
      ['დაცვის კლასი', 'IP44'],
    ],
    daysAgo: 8,
  },
  {
    slug: 'festoon-string',
    title: 'ბურთულებიანი გირლიანდა Festoon, 10 მ',
    categoryId: 'holiday',
    description:
      'ათი ფილამენტური ნათურა მკვრივ, წყალგაუმტარ სადენზე — აივნისთვის, ეზოსთვის და საახალწლო სუფრისთვის.',
    price: 89,
    images: [
      ['1508172466753-aa5687ae25b5', 'ფილამენტური ნათურების გირლიანდა სახლის კედელთან'],
      ['1578643800480-7cb8e6dea0b4', 'ჩამოკიდებული ნათურების გირლიანდა'],
    ],
    colors: [COLORS.warm],
    specs: [
      ['ნათურები', '10 × E27, 2W ფილამენტი (შედის)'],
      ['სიგრძე', '10 მ'],
      ['დაცვის კლასი', 'IP65'],
      ['შეერთება', '3 გირლიანდამდე ერთ როზეტზე'],
    ],
    daysAgo: 40,
  },
  {
    slug: 'led-curtain',
    title: 'LED ფარდა ფანჯრისთვის, 3 × 2 მ',
    categoryId: 'holiday',
    description:
      'სინათლის ვერტიკალური ძაფები ფანჯარაზე ან კედელზე — გარედანაც ჩანს და ოთახშიც მყუდროებას ქმნის.',
    price: 45,
    images: [
      ['1516034037053-83125f4a9840', 'LED ფარდის ვერტიკალური ძაფები'],
      ['1733499625839-267296a7457b', 'თეთრი LED ფარდა კედელზე'],
    ],
    colorImages: {
      cold: [['1733499625839-267296a7457b', 'თეთრი LED ფარდა კედელზე']],
    },
    colors: [COLORS.warm, COLORS.cold],
    badges: ['bestseller'],
    specs: [
      ['LED-ები', '300'],
      ['ზომა', '3 × 2 მ, 10 ძაფი'],
      ['რეჟიმები', '8, პულტით'],
      ['კვება', 'USB ან ქსელი'],
    ],
    daysAgo: 25,
  },
  {
    slug: 'icicle-lights',
    title: 'LED ლოლუები, 5 მ',
    categoryId: 'holiday',
    description:
      'სხვადასხვა სიგრძის „ლოლუები“ სახურავის კიდეზე და აივანზე — სახლი შორიდანვე სადღესასწაულოდ გამოიყურება.',
    price: 39,
    compareAtPrice: 49,
    images: [
      ['1773574635060-8b7b46054074', 'LED ლოლუები ხის სახურავზე, შებინდებისას'],
      ['1764542617235-7dc6ad330442', 'LED ლოლუები ცისფერ კედელზე'],
    ],
    colors: [COLORS.cold, COLORS.warm],
    specs: [
      ['სიგრძე', '5 მ, ლოლუები 30–50 სმ'],
      ['LED-ები', '200'],
      ['დაცვის კლასი', 'IP44 — გარეთ'],
      ['შეერთება', '5 ცალამდე ერთ როზეტზე'],
    ],
    daysAgo: 60,
  },
  {
    slug: 'prelit-tree',
    title: 'ხელოვნური ნაძვის ხე, განათებით',
    categoryId: 'holiday',
    description:
      'ხშირი, ნატურალურის მსგავსი ტოტები და უკვე ჩამონტაჟებული თბილი გირლიანდა — ამოიღე ყუთიდან, გაშალე და ჩართე.',
    price: 249,
    images: [
      ['1603561128963-5f4d971c4959', 'ანთებული ნაძვის ხე ბნელ ოთახში'],
      ['1670704430616-ca0815049df0', 'ხელოვნური ნაძვის ხე თეთრ ფონზე'],
    ],
    colors: [COLORS.pine],
    option: {
      name: OPTION_NAMES.height,
      values: ['150 სმ', '180 სმ', '210 სმ'],
      surcharges: [0, 60, 130],
    },
    badges: ['new'],
    specs: [
      ['LED-ები', '300 / 400 / 550, თბილი თეთრი'],
      ['ტოტები', 'PE + PVC, ცეცხლგამძლე'],
      ['ფეხი', 'ლითონის, დასაკეცი'],
      ['რეჟიმები', '8 + ტაიმერი'],
    ],
    daysAgo: 2,
  },
  {
    slug: 'star-topper',
    title: 'ნათელი ვარსკვლავი კენწეროსთვის',
    categoryId: 'holiday',
    description:
      'ოქროსფერი ვარსკვლავი 20 LED-ით ნაძვის ხის კენწეროზე. ბატარეაზე მუშაობს — სადენი არ ჩანს.',
    price: 29,
    images: [['1480719598364-fe3123242a9d', 'ოქროსფერი ვარსკვლავი ნაძვის ხის კენწეროზე']],
    colors: [COLORS.brass],
    badges: ['new'],
    specs: [
      ['LED-ები', '20, თბილი თეთრი'],
      ['ზომა', '20 სმ'],
      ['კვება', 'ბატარეა 3 × AA'],
      ['ტაიმერი', '6 სთ ჩართული, 18 სთ გამორთული'],
    ],
    daysAgo: 12,
  },
  {
    slug: 'star-garland',
    title: 'ვარსკვლავების გირლიანდა, 3 მ',
    categoryId: 'holiday',
    description: 'ოცი პატარა ვარსკვლავი თხელ სადენზე — ფანჯრისთვის, საწოლის თავთან ან სარკისთვის.',
    price: 19,
    images: [
      ['1575108921171-14cf38728a41', 'ვარსკვლავების გირლიანდა ბნელ ფონზე'],
      ['1767153434535-89b4a3db366d', 'ვარსკვლავების გირლიანდა თეთრ ფონზე'],
    ],
    colors: [COLORS.warm],
    specs: [
      ['ვარსკვლავები', '20 LED'],
      ['სიგრძე', '3 მ'],
      ['კვება', 'USB ან ბატარეა 3 × AA'],
    ],
    daysAgo: 30,
  },
  {
    slug: 'copper-micro-lights',
    title: 'მიკრო-გირლიანდა სპილენძის სადენზე, 5 მ',
    categoryId: 'holiday',
    description:
      'თითქმის უხილავი სადენი და 50 პაწაწინა LED: ჩადე ქილაში, შემოახვიე გვირგვინს ან სუფრის დეკორს.',
    price: 12,
    images: [
      ['1579196174589-2b51599c3854', 'სპილენძის მიკრო-გირლიანდა'],
      ['1574771418749-6b05b4a4d5c3', 'სპილენძის გირლიანდა შუშის ქილაში'],
    ],
    colors: [COLORS.warm],
    badges: ['bestseller'],
    specs: [
      ['LED-ები', '50'],
      ['სიგრძე', '5 მ'],
      ['კვება', 'ბატარეა 2 × AA'],
      ['დაცვის კლასი', 'IP65 — წყალგამძლე'],
    ],
    daysAgo: 90,
  },
  {
    slug: 'neon-star',
    title: 'LED ვარსკვლავი ფანჯრისთვის',
    categoryId: 'holiday',
    description:
      'მოქნილი ნეონის ვარსკვლავი საკიდით: ფანჯარაზე გარედანაც ანათებს და ოთახსაც თბილად ავსებს.',
    price: 35,
    images: [['1784637282113-f4ef706e8183', 'ოქროსფრად მანათობელი ვარსკვლავი ბნელ ფონზე']],
    colors: [COLORS.warm],
    specs: [
      ['ზომა', '40 სმ'],
      ['სინათლე', 'LED ნეონი, თბილი თეთრი'],
      ['კვება', 'USB'],
    ],
    daysAgo: 18,
  },
];

export const PRODUCTS: Product[] = PRODUCT_INPUTS.map(product);
