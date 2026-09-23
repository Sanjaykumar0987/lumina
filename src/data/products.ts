import { FlavorProduct } from '../types';

export const FLAVOR_PRODUCTS: FlavorProduct[] = [
  {
    id: 'strawberry',
    name: 'Strawberry Field',
    subtitle: 'Strawberry',
    tagline: 'Sweet, ethereal, timeless.',
    category: 'Signature Collection',
    price: 24.0,
    description:
      'A delicate infusion of wild mountain strawberries and pure alpine essence. Experience the ethereal sweetness born from the void.',
    bottleImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuOq_dO2yrYHRp72ASJ6sx9SwLfv9nATdDuywzEcf_U9ZYryv5xfowmz-34s_AG9jLtBaWYt9l9412dS9-Rnky3hasXtlP0hOtpSufIMqtqyOpxePdyHEskHL9B8n3pYYTUMalk1NhsjcIPDjyv6vIuPwevByK6ha9BVagtvlbfK-KR6kgbTeyNXM33SLtfsdqm4gKlbXeOk4nyG7EvppmmYCD2Ke0P3iP9FWJpODJI263kZZPlw7T',
    studioImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbvlViXWvQyEl8i6CaDSKEoc937bzvW3oP3xfgwXa0O9ZmxO2Mudair6ce8KpRa1luIyXjgG0PBdhFq0Imo32YTELrrYy4nrgFjNNcaG3p2QDOgTry7mMRPqFP5h9K5sPkwDtyMMJ5zMvRsGUQZ72ET796UakmwhjK2Fs-VYeCyKFAWrOxiv3d1HAXTN5PDH9d6E0lYV5f_Fmr0dLZCjQ1qD1sGOYynU8xpTZm0xMqtC4U3fIx8SY',
    accentColor: '#ff4d6d',
    accentRgb: [0.35, 0.05, 0.12],
    glowColor: 'rgba(255, 77, 109, 0.35)',
    bgGradient: 'from-[#ff4d6d]/25 to-transparent',
    ingredients: [
      'Wild Alpine Strawberries (45%)',
      'Filtered Glacial Water',
      'Organic Cane Nectar',
      'Madagascan Vanilla Bean Extract',
    ],
    details: {
      volume: '350 ml / 11.8 fl oz',
      shelfLife: '45 Days Chilled',
      coldPressed: true,
      flavorNotes: ['Wild Berry', 'Crisp Floral', 'Velvet Vanilla'],
      energy: '110 kcal per serving',
    },
    servingNotes: [
      'Serve chilled at 4°C (39°F) in a crystal tumbler.',
      'Gently invert the bottle twice before uncapping to awaken suspended berry essence.',
      'Pairs exceptionally with bitter dark chocolate or light brioche.',
    ],
    icon: 'water_drop',
  },
  {
    id: 'badam',
    name: 'Badam Nectar',
    subtitle: 'Badam',
    tagline: 'Rich, nutty, profound.',
    category: 'Reserve Heritage',
    price: 26.0,
    description:
      'A dense elixir of stone-ground heirloom almonds kissed with Kashmiri saffron threads and green cardamom. Earthy warmth in liquid suspension.',
    bottleImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuWKBCg2XhWPi72-W3doVWWnpDdr3ZI7KFTWeHy0gtb8hbqVlS0RbB9E96i3ld6W526_Ulml9C5EPoq5Xujke821ZjzCg6B3eCZamlgjxw78xNw1eWpHrnoknnf6CbT5zdA-CCC8oV00MffFom1fk0R4q9zPpohuDMirhZK5Gl2Rm8-y04Tqt2sUMQ4uvGu4-gNA27kKpLBfcAxmnGni8voReY2FMv4BIgUIz5MDPixxYBPkeT5qU7',
    studioImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmFzO603rCC7O0EINR9yZTQ55C55jWLar6NldAgoFGbVTiz87Y47mauo3eHhdnVlnXltUUXQYzSX3vT6IQrOCWgJ3t3Wux1H-Ap7JQy1bRIuGhaAt79LGjwcL1O15SyB8_ak34jZlQYABteUMWHVLozWzqWZ8Tj9TFf6mqHCMrnDdnOao-rwp-gGSqAFFSHb0cD6OKEdXgM3wrV4fTS5idvnMXi3oKxOtMiMwwZY7vkhQoCa30jXb',
    accentColor: '#ffb703',
    accentRgb: [0.38, 0.24, 0.04],
    glowColor: 'rgba(255, 183, 3, 0.35)',
    bgGradient: 'from-[#ffb703]/25 to-transparent',
    ingredients: [
      'Heirloom California Almond Milk (42%)',
      'Kashmiri Grade-A Saffron',
      'Stone-Crushed Green Cardamom',
      'Wild Mountain Honey',
    ],
    details: {
      volume: '350 ml / 11.8 fl oz',
      shelfLife: '40 Days Chilled',
      coldPressed: true,
      flavorNotes: ['Roasted Marzipan', 'Golden Saffron', 'Warming Spices'],
      energy: '145 kcal per serving',
    },
    servingNotes: [
      'Best enjoyed slightly cool or gently warmed to 40°C in an ambient bath.',
      'Sip slowly to let the saffron bloom on the palate.',
      'Garnish with roasted slivered almonds for tactile indulgence.',
    ],
    icon: 'energy_savings_leaf',
  },
  {
    id: 'rose',
    name: 'Royal Rose',
    subtitle: 'Rose',
    tagline: 'Floral, delicate, radiant.',
    category: 'Botanical Series',
    price: 24.0,
    description:
      'Distilled from dusk-harvested Damask rose petals, blended with organic white nectar and wild blossom essence. An intoxicating floral aura.',
    bottleImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmycuhUQD7ed44S140JVlks5mow5ZZXCFd7K3noJrbQF5YJI-gucmRg-h_zyAYpDgkMWxZePApByW46ZHd999sFIoUvdNdX-fA09k5TeCMI7PQPITsx2DJ3xEST5qDJlUPJqTaP2kdSEzWEaJM8N9cUEEYUMotd2RoHjg1vmEK3wZIPnIyo0IffxhFi82ClOGXyZYfsKwRwsA2pHsEoRi14pY8UAdqerUIjBlWAKrc9fjv610eeLb_',
    studioImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmycuhUQD7ed44S140JVlks5mow5ZZXCFd7K3noJrbQF5YJI-gucmRg-h_zyAYpDgkMWxZePApByW46ZHd999sFIoUvdNdX-fA09k5TeCMI7PQPITsx2DJ3xEST5qDJlUPJqTaP2kdSEzWEaJM8N9cUEEYUMotd2RoHjg1vmEK3wZIPnIyo0IffxhFi82ClOGXyZYfsKwRwsA2pHsEoRi14pY8UAdqerUIjBlWAKrc9fjv610eeLb_',
    accentColor: '#fb6f92',
    accentRgb: [0.38, 0.08, 0.18],
    glowColor: 'rgba(251, 111, 146, 0.35)',
    bgGradient: 'from-[#fb6f92]/25 to-transparent',
    ingredients: [
      'Damask Rose Petal Hydrosol (38%)',
      'Pink Himalayan Spring Water',
      'Wild Blossom Honey',
      'Lychee & Pomegranate Distillate',
    ],
    details: {
      volume: '350 ml / 11.8 fl oz',
      shelfLife: '45 Days Chilled',
      coldPressed: true,
      flavorNotes: ['Damask Rose', 'Turkish Delight', 'Crisp Lychee'],
      energy: '95 kcal per serving',
    },
    servingNotes: [
      'Serve over a single clear ice sphere in an aromatic stemmed glass.',
      'Allow the floral aromatics to aerate for 60 seconds after opening.',
      'Sublime when paired with cardamom shortbread or Turkish pistachio confections.',
    ],
    icon: 'local_florist',
  },
  {
    id: 'geerthanda',
    name: 'Imperial Geerthanda',
    subtitle: 'Geerthanda',
    tagline: 'Cooling, restorative, legendary.',
    category: 'Ancient Alchemical',
    price: 25.0,
    description:
      'An ancient Madurai royal formulation featuring cooling gum tragacanth (badam pisin), nannari sarsaparilla root, and slow-reduced rich milk.',
    bottleImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuWKBCg2XhWPi72-W3doVWWnpDdr3ZI7KFTWeHy0gtb8hbqVlS0RbB9E96i3ld6W526_Ulml9C5EPoq5Xujke821ZjzCg6B3eCZamlgjxw78xNw1eWpHrnoknnf6CbT5zdA-CCC8oV00MffFom1fk0R4q9zPpohuDMirhZK5Gl2Rm8-y04Tqt2sUMQ4uvGu4-gNA27kKpLBfcAxmnGni8voReY2FMv4BIgUIz5MDPixxYBPkeT5qU7',
    studioImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmFzO603rCC7O0EINR9yZTQ55C55jWLar6NldAgoFGbVTiz87Y47mauo3eHhdnVlnXltUUXQYzSX3vT6IQrOCWgJ3t3Wux1H-Ap7JQy1bRIuGhaAt79LGjwcL1O15SyB8_ak34jZlQYABteUMWHVLozWzqWZ8Tj9TFf6mqHCMrnDdnOao-rwp-gGSqAFFSHb0cD6OKEdXgM3wrV4fTS5idvnMXi3oKxOtMiMwwZY7vkhQoCa30jXb',
    accentColor: '#38bdf8',
    accentRgb: [0.08, 0.22, 0.36],
    glowColor: 'rgba(56, 189, 248, 0.35)',
    bgGradient: 'from-[#38bdf8]/25 to-transparent',
    ingredients: [
      'Almond Gum Gond Katira (Slow Hydrated)',
      'Nannari Sarsaparilla Extract',
      'Condensed Double-Boiled Milk',
      'Pistachio Slivers & Rose Essence',
    ],
    details: {
      volume: '350 ml / 11.8 fl oz',
      shelfLife: '30 Days Chilled',
      coldPressed: false,
      flavorNotes: ['Botanical Sarsaparilla', 'Caramelized Dairy', 'Cooling Amber'],
      energy: '160 kcal per serving',
    },
    servingNotes: [
      'Serve intensely chilled (near freezing point) with crushed ice.',
      'Stir with a glass wand to distribute the natural cooling gum pearls.',
      'The ultimate elixir for deep cellular replenishment.',
    ],
    icon: 'ac_unit',
  },
  {
    id: 'chocolate',
    name: 'Velvet Cacao',
    subtitle: 'Chocolate',
    tagline: 'Decadent, dark, hypnotic.',
    category: 'Nocturne Series',
    price: 24.0,
    description:
      'Single-origin 72% Criollo cacao cold-steeped with roasted hazelnut butter and Madagascan bourbon vanilla. A dark, hypnotic nectar.',
    bottleImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbvlViXWvQyEl8i6CaDSKEoc937bzvW3oP3xfgwXa0O9ZmxO2Mudair6ce8KpRa1luIyXjgG0PBdhFq0Imo32YTELrrYy4nrgFjNNcaG3p2QDOgTry7mMRPqFP5h9K5sPkwDtyMMJ5zMvRsGUQZ72ET796UakmwhjK2Fs-VYeCyKFAWrOxiv3d1HAXTN5PDH9d6E0lYV5f_Fmr0dLZCjQ1qD1sGOYynU8xpTZm0xMqtC4U3fIx8SY',
    studioImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbvlViXWvQyEl8i6CaDSKEoc937bzvW3oP3xfgwXa0O9ZmxO2Mudair6ce8KpRa1luIyXjgG0PBdhFq0Imo32YTELrrYy4nrgFjNNcaG3p2QDOgTry7mMRPqFP5h9K5sPkwDtyMMJ5zMvRsGUQZ72ET796UakmwhjK2Fs-VYeCyKFAWrOxiv3d1HAXTN5PDH9d6E0lYV5f_Fmr0dLZCjQ1qD1sGOYynU8xpTZm0xMqtC4U3fIx8SY',
    accentColor: '#c084fc',
    accentRgb: [0.28, 0.12, 0.35],
    glowColor: 'rgba(192, 132, 252, 0.35)',
    bgGradient: 'from-[#c084fc]/25 to-transparent',
    ingredients: [
      'Single-Estate 72% Criollo Cacao',
      'Creamy Sprouted Oat Infusion',
      'Roasted Hazelnut Distillate',
      'Balinese Fleur de Sel',
    ],
    details: {
      volume: '350 ml / 11.8 fl oz',
      shelfLife: '45 Days Chilled',
      coldPressed: true,
      flavorNotes: ['Dark Truffle', 'Nutty Gianduja', 'Silken Mineral'],
      energy: '150 kcal per serving',
    },
    servingNotes: [
      'Shake vigorously for 10 seconds to create a micro-velvet foam on top.',
      'Serve in a chilled coupe glass.',
      'Superb as an evening digestif or post-meditation tonic.',
    ],
    icon: 'cookie',
  },
];

export const DETAIL_IMAGES = {
  strawberryDetailBottle:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpyTclqmbZbu7Av3pnryYI_xADxex1l6BkZx3pCbE-fwXaxVruqQRTVEJNR1tq-8NFBSFVTGrVQux5iFrLFsh6phGr0YCp2PrPfME45ktZsIU6UlqlTeGh9qxlMh7ASm_GgtO3KyCnPzMu6waQGRrxRMQKWPLzgC6aQGPfssFYDfbsXmmes_WRhbj7FHxoEwxhn3_G-O22zrBHr0KsjX64tQtqO8JbaCi1hmvbBgfP3xEwIzDzQVOK',
  strawberryPiece:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuASPqR2yqY227HQeVo8lsSUYfgmUbu5GbiObGYWJThLucJZE7aO4xXMRjpAKc9b74gJUoRH7eFMBHLAsAtH5GgDma1gqBlzkMAr0tQNXpodq7wsPUJfrcfupKmNiWnFfnAExFsB7uwH9mKu5HVpZoaByr7jYS_9LwAIM8B9cxuk9AbCGJU9DC-gIg2I8KdPmP3fByCkDzQ4VNV9y9aEYyKXwWyV-uCtW8ybsF6xBCOLG5vmMAgp17iB',
  rosePetal:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4i-kJTKLlGAQro2Cn2kDSVojgIGpxqlzMHvu_l_0FWudFVbqkf5VKPNHedKd0YV3o05ILxiYFFdxQ0J_VUJAKKDJ6pBMITo9X3Drxvk-6NSeS2qSqaK5KSsuVspYDEsKkBC1UupaxRyB_Y8g-DY4ik2qAez5xn0F3wRAcl734Bn2aCTh9d875rpuYk2n_BiuWE4MhHimG_sx08kZ58wQunVQuqGNQ4ygJyZ6FlG3jINd8Z7nkjvXs',
  milkSplash:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIYePwTyjBRpmceSuOrp39eyb37W33opX3wOsoTZQzJjV4Qw0C1uB-9HLxtWdTIMYlsdvEmK1ETx7NnzVPA_1siMfn3oENizNrxi_z7E8LbY2xijfCJIq1d1fKD0TGrFWXe6jkirL-nTyUglC3tgUwXpKDhRYYaByBQ-22rkfYILrAkt7-os7x1HkyJ2gg4RmqBUDow1VDMpxoakdeCKg-djaz0Qqm3IfvLZeoc4OwdFAmjuwGz8XG',
};
