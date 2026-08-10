import heroImg from "@/assets/hero.jpg";
import treesImg from "@/assets/col-trees.jpg";
import botanicalImg from "@/assets/col-botanical.jpg";
import floralsImg from "@/assets/col-florals.jpg";
import decorImg from "@/assets/col-decor.jpg";

export { heroImg };

export type Product = {
  name: string;
  description: string;
  priceRange: string;
  image: string;
  alt: string;
};

export type Collection = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  heroLine: string;
  image: string;
  alt: string;
  products: Product[];
};

export const collections: Collection[] = [
  {
    slug: "statement-trees",
    title: "Statement Trees",
    kicker: "Collection 01",
    summary:
      "Architectural artificial trees, hand-assembled leaf by leaf, scaled for double-height lobbies and living rooms.",
    heroLine:
      "Sculptural scale for rooms that deserve a centrepiece. Each tree is built on a real hardwood armature and finished to your ceiling height.",
    image: treesImg,
    alt: "Tall artificial olive tree in a matte black planter inside a dark, brass-accented luxury interior",
    products: [
      {
        name: "Andalusia Olive",
        description:
          "Gnarled hardwood trunk with silvered olive foliage. Reads authentic from arm's length.",
        priceRange: "₹68,000 – ₹1,40,000",
        image: treesImg,
        alt: "Artificial olive tree with silvery foliage in a dark interior",
      },
      {
        name: "Ficus Alii Column",
        description:
          "Slim, upright canopy for narrow entryways and stairwell landings. 7 to 12 feet.",
        priceRange: "₹52,000 – ₹1,10,000",
        image: botanicalImg,
        alt: "Slender artificial ficus tree with narrow green leaves",
      },
      {
        name: "Banyan Study",
        description:
          "Aerial-root detailing and a broad canopy — a single-piece focal point for atriums.",
        priceRange: "₹1,20,000 – ₹2,60,000",
        image: treesImg,
        alt: "Broad-canopied artificial banyan tree with aerial root detailing",
      },
      {
        name: "Nordic Birch Grove",
        description:
          "A set of three pale birch stems, staged at graduated heights for depth.",
        priceRange: "₹74,000 – ₹1,30,000",
        image: decorImg,
        alt: "Group of three pale artificial birch stems arranged at different heights",
      },
      {
        name: "Bonsai Pine, Aged",
        description:
          "Tabletop scale with a weathered trunk and cloud-pruned needle pads.",
        priceRange: "₹34,000 – ₹58,000",
        image: botanicalImg,
        alt: "Aged artificial bonsai pine with cloud-pruned foliage on a dark surface",
      },
      {
        name: "Palm Atrium",
        description:
          "Wide-frond kentia palm engineered for humid coastal lobbies and pool decks.",
        priceRange: "₹58,000 – ₹1,15,000",
        image: treesImg,
        alt: "Wide-frond artificial kentia palm suited to atrium spaces",
      },
    ],
  },
  {
    slug: "botanical-studies",
    title: "Botanical Studies",
    kicker: "Collection 02",
    summary:
      "Table and console-scale greenery — ferns, philodendrons and trailing forms in considered vessels.",
    heroLine:
      "The quiet layer. Small-scale botanicals that finish a room the way a bracelet finishes a sleeve.",
    image: botanicalImg,
    alt: "Three artificial potted plants — fern, philodendron and monstera — on a black stone console",
    products: [
      {
        name: "Boston Fern, Cascading",
        description: "Feathered fronds with a soft, uneven fall for shelving and niches.",
        priceRange: "₹6,500 – ₹14,000",
        image: botanicalImg,
        alt: "Cascading artificial Boston fern in a stone-finish pot",
      },
      {
        name: "Philodendron Broadleaf",
        description: "Deep, waxy leaves on brass-toned stems in a speckled stoneware pot.",
        priceRange: "₹9,000 – ₹18,000",
        image: botanicalImg,
        alt: "Artificial broadleaf philodendron with glossy green leaves",
      },
      {
        name: "Moss Terrace Tray",
        description: "Preserved-look moss bed in a low brass tray — for dining tables and consoles.",
        priceRange: "₹7,500 – ₹16,000",
        image: decorImg,
        alt: "Low brass tray holding a dense bed of preserved-look moss",
      },
      {
        name: "Eucalyptus Cluster",
        description: "Silver-blue rounded foliage, three stems, styled loose and unfussy.",
        priceRange: "₹4,800 – ₹11,000",
        image: floralsImg,
        alt: "Cluster of silver-blue artificial eucalyptus stems",
      },
      {
        name: "Snake Plant Trio",
        description: "Upright architectural blades in a matte charcoal cylinder.",
        priceRange: "₹8,000 – ₹17,500",
        image: botanicalImg,
        alt: "Three upright artificial snake plants in a matte charcoal cylinder pot",
      },
      {
        name: "Trailing Ivy Ledge",
        description: "Two-metre trailing lengths for mezzanines, bar backs and stair edges.",
        priceRange: "₹5,200 – ₹12,000",
        image: treesImg,
        alt: "Long trailing artificial ivy hanging over a ledge",
      },
    ],
  },
  {
    slug: "florals-orchids",
    title: "Florals & Orchids",
    kicker: "Collection 03",
    summary:
      "Real-touch orchids and seasonal arrangements composed for reception desks, suites and private dining.",
    heroLine:
      "Composed, never crowded. Real-touch petals in vessels chosen to sit inside your palette.",
    image: floralsImg,
    alt: "White artificial orchid arrangement in a black ceramic vessel beside a brass candlestick",
    products: [
      {
        name: "Phalaenopsis, Ivory",
        description: "Twin-spike orchid in a glazed black bowl with a moss-and-bark base.",
        priceRange: "₹12,000 – ₹26,000",
        image: floralsImg,
        alt: "Ivory phalaenopsis orchid with two spikes in a glazed black bowl",
      },
      {
        name: "Peony Bloom Bowl",
        description: "Layered blush peonies, cut low and dense for centre-of-table height.",
        priceRange: "₹14,000 – ₹28,000",
        image: floralsImg,
        alt: "Dense low arrangement of blush artificial peonies in a round bowl",
      },
      {
        name: "Cymbidium Arc",
        description: "A long, sweeping single-stem gesture for a reception counter.",
        priceRange: "₹18,000 – ₹34,000",
        image: floralsImg,
        alt: "Long arcing cymbidium orchid stem in a tall vessel",
      },
      {
        name: "Wild Grass & Seedhead",
        description: "Muted dried-look grasses and seedheads for a restrained, textural table.",
        priceRange: "₹6,000 – ₹13,000",
        image: decorImg,
        alt: "Neutral arrangement of dried-look grasses and seedheads",
      },
      {
        name: "Suite Bud Set",
        description: "Set of three bud vessels with single stems — designed for hotel suites.",
        priceRange: "₹9,500 – ₹19,000",
        image: floralsImg,
        alt: "Three small bud vases each holding a single artificial stem",
      },
      {
        name: "Magnolia Branch",
        description: "Two tall branches in bud and half-bloom, staged for a floor vessel.",
        priceRange: "₹16,000 – ₹32,000",
        image: treesImg,
        alt: "Tall artificial magnolia branches in bud and half bloom",
      },
    ],
  },
  {
    slug: "decor-accessories",
    title: "Decor Accessories",
    kicker: "Collection 04",
    summary:
      "Planters, vessels and objects in brass, stone and matte ceramic — the frame around the greenery.",
    heroLine:
      "The vessel is half the composition. Brass, travertine and hand-finished ceramic, specified to your finishes.",
    image: decorImg,
    alt: "Still life of brass bowl, black ceramic vases and textured stones on a dark surface",
    products: [
      {
        name: "Brushed Brass Planter",
        description: "Spun brass with a living finish that patinas gently over years.",
        priceRange: "₹22,000 – ₹56,000",
        image: decorImg,
        alt: "Brushed brass cylindrical planter",
      },
      {
        name: "Travertine Bowl",
        description: "Solid stone, hand-honed, for tabletop moss or a single branch.",
        priceRange: "₹15,000 – ₹32,000",
        image: decorImg,
        alt: "Hand-honed travertine stone bowl",
      },
      {
        name: "Charcoal Ceramic Urn",
        description: "Matte glaze with a soft shoulder — pairs with the Statement Trees range.",
        priceRange: "₹18,000 – ₹42,000",
        image: decorImg,
        alt: "Matte charcoal ceramic urn with a rounded shoulder",
      },
      {
        name: "Ribbed Vessel, Onyx",
        description: "Fluted profile in deep onyx black for florals or standalone display.",
        priceRange: "₹11,000 – ₹24,000",
        image: floralsImg,
        alt: "Fluted onyx black ceramic vessel",
      },
      {
        name: "Brass Riser Set",
        description: "Three graduated risers for layering objects on long consoles.",
        priceRange: "₹13,500 – ₹27,000",
        image: decorImg,
        alt: "Set of three graduated brass display risers",
      },
      {
        name: "Custom Fibreglass Planter",
        description: "Made to your drawing — any diameter, any RAL, indoor or terrace grade.",
        priceRange: "On request",
        image: treesImg,
        alt: "Large custom fibreglass planter in a contemporary interior",
      },
    ],
  },
];

export const stats = [
  { value: "12+", label: "Years composing interiors" },
  { value: "600+", label: "Spaces styled across India" },
  { value: "48", label: "Hospitality partners" },
  { value: "3 yr", label: "Colour-fastness guarantee" },
];

export const assurances = [
  {
    title: "3-Year Colour Guarantee",
    body: "Written assurance on fade and colour-fastness for every piece we install indoors.",
  },
  {
    title: "Fire-Retardant Options",
    body: "IS-compliant FR treatment available on request for hospitality and commercial fit-outs.",
  },
  {
    title: "In-House Installation",
    body: "Our own team crates, delivers and styles on site. No third-party handling.",
  },
  {
    title: "Annual Care Visit",
    body: "One complimentary detailing and re-styling visit within twelve months of handover.",
  },
];

export type Project = {
  title: string;
  category: "Residential" | "Hospitality" | "Commercial";
  location: string;
  scope: string;
  detail: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    title: "Malabar Hill Residence",
    category: "Residential",
    location: "Mumbai",
    scope: "Olive tree, three botanical studies, custom brass planters",
    detail:
      "A sea-facing duplex where the client wanted greenery that would not fight the art. We anchored the double-height living room with a single aged olive and kept every other gesture below eye level.",
    image: treesImg,
    alt: "Dark luxury living room styled with a tall artificial tree in a brass planter",
  },
  {
    title: "Bandra Boutique Hotel",
    category: "Hospitality",
    location: "Mumbai",
    scope: "Lobby installation, 42 suite arrangements, FR-treated",
    detail:
      "Forty-two suites, one lobby moment. Every arrangement is fire-retardant treated and built for a housekeeping team to lift, clean under and replace in under a minute.",
    image: floralsImg,
    alt: "Hotel lobby styled with white orchid arrangements and warm brass lighting",
  },
  {
    title: "BKC Headquarters",
    category: "Commercial",
    location: "Mumbai",
    scope: "Reception greenery, 14 floor planters, quarterly service",
    detail:
      "A corporate floorplate softened without a single maintenance contract for watering. Planters were colour-matched to the joinery veneer.",
    image: botanicalImg,
    alt: "Corporate reception area with artificial potted greenery on stone consoles",
  },
  {
    title: "Alibaug Weekend House",
    category: "Residential",
    location: "Alibaug",
    scope: "Terrace-grade palms, indoor florals, stone vessels",
    detail:
      "Salt air and a house that stays shut for five days a week. Terrace-grade UV foliage outside, real-touch florals in the bedrooms.",
    image: decorImg,
    alt: "Coastal weekend house terrace styled with artificial palms and stone vessels",
  },
  {
    title: "Worli Sky Lounge",
    category: "Hospitality",
    location: "Mumbai",
    scope: "Bar-back trailing ivy, bud vessels, seasonal rotation",
    detail:
      "A low-light bar where real plants had failed twice. Trailing ivy along the back bar and a quarterly rotation of stems keeps it feeling seasonal.",
    image: botanicalImg,
    alt: "Sky lounge bar back styled with trailing artificial ivy",
  },
  {
    title: "Lower Parel Flagship Store",
    category: "Commercial",
    location: "Mumbai",
    scope: "Window trees, plinth arrangements, festive re-styling",
    detail:
      "Retail windows that change four times a year. We hold the client's inventory in our studio and re-style each season.",
    image: treesImg,
    alt: "Retail flagship window display styled with sculptural artificial trees",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Consult",
    body: "We visit or video-walk the space, read the light, the palette and the way the room is actually used.",
  },
  {
    step: "02",
    title: "Compose",
    body: "You receive a styling scheme — species, scale, vessels and placement — rendered against your own interiors.",
  },
  {
    step: "03",
    title: "Craft",
    body: "Each piece is assembled in our Mumbai atelier, trimmed to your ceiling height and finished by hand.",
  },
  {
    step: "04",
    title: "Install & Care",
    body: "Our team installs, styles on site and returns within the year for a complimentary detailing visit.",
  },
];

/**
 * SAMPLE TESTIMONIALS — FICTIONAL PLACEHOLDER CONTENT.
 * These are illustrative only and must be replaced with real, attributable
 * client quotes (with written permission) before launch. Keep the same shape:
 * { quote, name, role }.
 */
export const testimonials = [
  {
    quote:
      "The olive in our living room has been mistaken for real by every single guest. It has not needed a thing in two years.",
    name: "Sample Client",
    role: "Private residence, Malabar Hill",
  },
  {
    quote:
      "Housekeeping stopped losing hours to wilted stems. The suites look considered every single morning.",
    name: "Sample Client",
    role: "General Manager, boutique hotel",
  },
  {
    quote:
      "They specified the planters to our veneer without being asked. That is the level of attention we hire for.",
    name: "Sample Client",
    role: "Principal, interior design practice",
  },
];
