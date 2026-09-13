export const imageLibrary = {
  hero: '/images/hero/hero-main.png',
  statementTrees: '/images/categories/statement-trees.png',
  artificialPlants: '/images/categories/artificial-plants.png',
  floralsOrchids: '/images/categories/florals-orchids.png',
  plantersDecor: '/images/categories/planters-decor.png',
  statementOlive: '/images/products/olive-tree.png',
  livingRoom: '/images/spaces/living-room.png',
  entrance: '/images/spaces/entrance.png',
};

export const heroImg = imageLibrary.hero;

export const homepageCategories = [
  {
    slug: 'statement-trees',
    title: 'Statement Trees',
    summary: 'Architectural scale for rooms that deserve a centrepiece.',
    image: imageLibrary.statementTrees,
    alt: 'Sculptural olive tree in a warm, considered interior',
  },
  {
    slug: 'botanical-studies',
    title: 'Artificial Plants',
    summary: 'Lifelike foliage, thoughtfully composed for everyday spaces.',
    image: imageLibrary.artificialPlants,
    alt: 'Collection of lifelike artificial plants in artisanal planters',
  },
  {
    slug: 'florals-orchids',
    title: 'Florals & Orchids',
    summary: 'Real-touch stems and elegant arrangements in refined vessels.',
    image: imageLibrary.floralsOrchids,
    alt: 'White orchids arranged in a refined ceramic vessel',
  },
  {
    slug: 'decor-accessories',
    title: 'Planters & Décor',
    summary: 'The considered vessels and finishing layers around greenery.',
    image: imageLibrary.livingRoom,
    alt: 'Sculptural stone planter in a refined botanical interior',
    position: '63% center',
  },
];

export const homepageProducts = [
  {
    collectionSlug: 'statement-trees',
    name: 'Andalusia Olive',
    priceRange: '₹68,000 – ₹1,40,000',
    image: imageLibrary.statementTrees,
    alt: 'Artificial olive tree with silvery foliage in a refined interior',
  },
  {
    collectionSlug: 'statement-trees',
    name: 'Ficus Alii Column',
    priceRange: '₹52,000 – ₹1,10,000',
    image: imageLibrary.artificialPlants,
    alt: 'Slender artificial ficus with upright green foliage',
  },
  {
    collectionSlug: 'florals-orchids',
    name: 'Phalaenopsis, Ivory',
    priceRange: '₹12,000 – ₹26,000',
    image: imageLibrary.floralsOrchids,
    alt: 'Ivory phalaenopsis orchids arranged in a ceramic vessel',
  },
  {
    collectionSlug: 'botanical-studies',
    name: 'Boston Fern, Cascading',
    priceRange: '₹6,500 – ₹14,000',
    image: imageLibrary.artificialPlants,
    alt: 'Lifelike artificial greenery in sculptural planters',
  },
  {
    collectionSlug: 'decor-accessories',
    name: 'Brushed Brass Planter',
    priceRange: '₹22,000 – ₹56,000',
    image: imageLibrary.livingRoom,
    alt: 'Sculptural planter in a refined botanical interior',
    position: '63% center',
  },
];

export const homepageSpaces = [
  {
    title: 'Living Room',
    image: imageLibrary.livingRoom,
    alt: 'Warm living room styled with a sculptural olive tree',
    position: 'center center',
  },
  {
    title: 'Entrance',
    image: imageLibrary.entrance,
    alt: 'Refined entrance styled with an artificial tree',
    position: '61% center',
  },
  {
    title: 'Bedroom',
    image: imageLibrary.floralsOrchids,
    alt: 'Bedroom-side floral arrangement with ivory orchids',
    position: 'center 54%',
  },
  {
    title: 'Office',
    image: imageLibrary.artificialPlants,
    alt: 'Office greenery arranged in sculptural planters',
    position: 'center 57%',
  },
  {
    title: 'Hospitality',
    image: imageLibrary.statementTrees,
    alt: 'Hospitality interior anchored by a statement tree',
    position: 'center 43%',
  },
];

export const stats = [
  { value: '12+', label: 'Years composing interiors' },
  { value: '600+', label: 'Spaces styled across India' },
  { value: '48', label: 'Hospitality partners' },
  { value: '3 yr', label: 'Colour-fastness guarantee' },
];

export const assurances = [
  { title: '3-Year Colour Guarantee', body: 'Written assurance on fade and colour-fastness for every piece we install indoors.' },
  { title: 'Fire-Retardant Options', body: 'IS-compliant FR treatment available on request for hospitality and commercial fit-outs.' },
  { title: 'In-House Installation', body: 'Our own team crates, delivers and styles on site. No third-party handling.' },
  { title: 'Annual Care Visit', body: 'One complimentary detailing and re-styling visit within twelve months of handover.' },
];

export const processSteps = [
  { step: '01', title: 'Consult', body: 'We visit or video-walk the space, read the light, the palette and the way the room is actually used.' },
  { step: '02', title: 'Compose', body: 'You receive a styling scheme — species, scale, vessels and placement — rendered against your own interiors.' },
  { step: '03', title: 'Craft', body: 'Each piece is assembled in our Mumbai atelier, trimmed to your ceiling height and finished by hand.' },
  { step: '04', title: 'Install & Care', body: 'Our team installs, styles on site and returns within the year for a complimentary detailing visit.' },
];
