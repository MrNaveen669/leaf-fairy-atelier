import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Collection from '../models/Collection.js';
import Product from '../models/Product.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';

const A='https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets';
const img={hero:`${A}/hero.jpg`,trees:`${A}/col-trees.jpg`,botanical:`${A}/col-botanical.jpg`,florals:`${A}/col-florals.jpg`,decor:`${A}/col-decor.jpg`};

const collections=[
{slug:'statement-trees',title:'Statement Trees',kicker:'Collection 01',summary:'Architectural artificial trees, hand-assembled leaf by leaf, scaled for double-height lobbies and living rooms.',heroLine:'Sculptural scale for rooms that deserve a centrepiece. Each tree is built on a real hardwood armature and finished to your ceiling height.',image:img.trees,alt:'Tall artificial olive tree in a matte black planter inside a dark, brass-accented luxury interior'},
{slug:'botanical-studies',title:'Botanical Studies',kicker:'Collection 02',summary:'Table and console-scale greenery — ferns, philodendrons and trailing forms in considered vessels.',heroLine:'The quiet layer. Small-scale botanicals that finish a room the way a bracelet finishes a sleeve.',image:img.botanical,alt:'Three artificial potted plants — fern, philodendron and monstera — on a black stone console'},
{slug:'florals-orchids',title:'Florals & Orchids',kicker:'Collection 03',summary:'Real-touch orchids and seasonal arrangements composed for reception desks, suites and private dining.',heroLine:'Composed, never crowded. Real-touch petals in vessels chosen to sit inside your palette.',image:img.florals,alt:'White artificial orchid arrangement in a black ceramic vessel beside a brass candlestick'},
{slug:'decor-accessories',title:'Decor Accessories',kicker:'Collection 04',summary:'Planters, vessels and objects in brass, stone and matte ceramic — the frame around the greenery.',heroLine:'The vessel is half the composition. Brass, travertine and hand-finished ceramic, specified to your finishes.',image:img.decor,alt:'Still life of brass bowl, black ceramic vases and textured stones on a dark surface'}
];
const products=[
['statement-trees','Andalusia Olive','Gnarled hardwood trunk with silvered olive foliage. Reads authentic from arm\'s length.','₹68,000 – ₹1,40,000',img.trees,'Artificial olive tree with silvery foliage in a dark interior'],
['statement-trees','Ficus Alii Column','Slim, upright canopy for narrow entryways and stairwell landings. 7 to 12 feet.','₹52,000 – ₹1,10,000',img.botanical,'Slender artificial ficus tree with narrow green leaves'],
['statement-trees','Banyan Study','Aerial-root detailing and a broad canopy — a single-piece focal point for atriums.','₹1,20,000 – ₹2,60,000',img.trees,'Broad-canopied artificial banyan tree with aerial root detailing'],
['statement-trees','Nordic Birch Grove','A set of three pale birch stems, staged at graduated heights for depth.','₹74,000 – ₹1,30,000',img.decor,'Group of three pale artificial birch stems arranged at different heights'],
['statement-trees','Bonsai Pine, Aged','Tabletop scale with a weathered trunk and cloud-pruned needle pads.','₹34,000 – ₹58,000',img.botanical,'Aged artificial bonsai pine with cloud-pruned foliage on a dark surface'],
['statement-trees','Palm Atrium','Wide-frond kentia palm engineered for humid coastal lobbies and pool decks.','₹58,000 – ₹1,15,000',img.trees,'Wide-frond artificial kentia palm suited to atrium spaces'],
['botanical-studies','Boston Fern, Cascading','Feathered fronds with a soft, uneven fall for shelving and niches.','₹6,500 – ₹14,000',img.botanical,'Cascading artificial Boston fern in a stone-finish pot'],
['botanical-studies','Philodendron Broadleaf','Deep, waxy leaves on brass-toned stems in a speckled stoneware pot.','₹9,000 – ₹18,000',img.botanical,'Artificial broadleaf philodendron with glossy green leaves'],
['botanical-studies','Moss Terrace Tray','Preserved-look moss bed in a low brass tray — for dining tables and consoles.','₹7,500 – ₹16,000',img.decor,'Low brass tray holding a dense bed of preserved-look moss'],
['botanical-studies','Eucalyptus Cluster','Silver-blue rounded foliage, three stems, styled loose and unfussy.','₹4,800 – ₹11,000',img.florals,'Cluster of silver-blue artificial eucalyptus stems'],
['botanical-studies','Snake Plant Trio','Upright architectural blades in a matte charcoal cylinder.','₹8,000 – ₹17,500',img.botanical,'Three upright artificial snake plants in a matte charcoal cylinder pot'],
['botanical-studies','Trailing Ivy Ledge','Two-metre trailing lengths for mezzanines, bar backs and stair edges.','₹5,200 – ₹12,000',img.trees,'Long trailing artificial ivy hanging over a ledge'],
['florals-orchids','Phalaenopsis, Ivory','Twin-spike orchid in a glazed black bowl with a moss-and-bark base.','₹12,000 – ₹26,000',img.florals,'Ivory phalaenopsis orchid with two spikes in a glazed black bowl'],
['florals-orchids','Peony Bloom Bowl','Layered blush peonies, cut low and dense for centre-of-table height.','₹14,000 – ₹28,000',img.florals,'Dense low arrangement of blush artificial peonies in a round bowl'],
['florals-orchids','Cymbidium Arc','A long, sweeping single-stem gesture for a reception counter.','₹18,000 – ₹34,000',img.florals,'Long arcing cymbidium orchid stem in a tall vessel'],
['florals-orchids','Wild Grass & Seedhead','Muted dried-look grasses and seedheads for a restrained, textural table.','₹6,000 – ₹13,000',img.decor,'Neutral arrangement of dried-look grasses and seedheads'],
['florals-orchids','Suite Bud Set','Set of three bud vessels with single stems — designed for hotel suites.','₹9,500 – ₹19,000',img.florals,'Three small bud vases each holding a single artificial stem'],
['florals-orchids','Magnolia Branch','Two tall branches in bud and half-bloom, staged for a floor vessel.','₹16,000 – ₹32,000',img.trees,'Tall artificial magnolia branches in bud and half bloom'],
['decor-accessories','Brushed Brass Planter','Spun brass with a living finish that patinas gently over years.','₹22,000 – ₹56,000',img.decor,'Brushed brass cylindrical planter'],
['decor-accessories','Travertine Bowl','Solid stone, hand-honed, for tabletop moss or a single branch.','₹15,000 – ₹32,000',img.decor,'Hand-honed travertine stone bowl'],
['decor-accessories','Charcoal Ceramic Urn','Matte glaze with a soft shoulder — pairs with the Statement Trees range.','₹18,000 – ₹42,000',img.decor,'Matte charcoal ceramic urn with a rounded shoulder'],
['decor-accessories','Ribbed Vessel, Onyx','Fluted profile in deep onyx black for florals or standalone display.','₹11,000 – ₹24,000',img.florals,'Fluted onyx black ceramic vessel'],
['decor-accessories','Brass Riser Set','Three graduated risers for layering objects on long consoles.','₹13,500 – ₹27,000',img.decor,'Set of three graduated brass display risers'],
['decor-accessories','Custom Fibreglass Planter','Made to your drawing — any diameter, any RAL, indoor or terrace grade.','On request',img.trees,'Large custom fibreglass planter in a contemporary interior']
].map(([collectionSlug,name,description,priceRange,image,alt])=>({collectionSlug,name,description,priceRange,image,alt}));
const projects=[
{title:'Malabar Hill Residence',category:'Residential',location:'Mumbai',scope:'Olive tree, three botanical studies, custom brass planters',detail:'A sea-facing duplex where the client wanted greenery that would not fight the art. We anchored the double-height living room with a single aged olive and kept every other gesture below eye level.',image:img.trees,alt:'Dark luxury living room styled with a tall artificial tree in a brass planter'},
{title:'Bandra Boutique Hotel',category:'Hospitality',location:'Mumbai',scope:'Lobby installation, 42 suite arrangements, FR-treated',detail:'Forty-two suites, one lobby moment. Every arrangement is fire-retardant treated and built for a housekeeping team to lift, clean under and replace in under a minute.',image:img.florals,alt:'Hotel lobby styled with white orchid arrangements and warm brass lighting'},
{title:'BKC Headquarters',category:'Commercial',location:'Mumbai',scope:'Reception greenery, 14 floor planters, quarterly service',detail:'A corporate floorplate softened without a single maintenance contract for watering. Planters were colour-matched to the joinery veneer.',image:img.botanical,alt:'Corporate reception area with artificial potted greenery on stone consoles'},
{title:'Alibaug Weekend House',category:'Residential',location:'Alibaug',scope:'Terrace-grade palms, indoor florals, stone vessels',detail:'Salt air and a house that stays shut for five days a week. Terrace-grade UV foliage outside, real-touch florals in the bedrooms.',image:img.decor,alt:'Coastal weekend house terrace styled with artificial palms and stone vessels'},
{title:'Worli Sky Lounge',category:'Hospitality',location:'Mumbai',scope:'Bar-back trailing ivy, bud vessels, seasonal rotation',detail:'A low-light bar where real plants had failed twice. Trailing ivy along the back bar and a quarterly rotation of stems keeps it feeling seasonal.',image:img.botanical,alt:'Sky lounge bar back styled with trailing artificial ivy'},
{title:'Lower Parel Flagship Store',category:'Commercial',location:'Mumbai',scope:'Window trees, plinth arrangements, festive re-styling',detail:'Retail windows that change four times a year. We hold the client\'s inventory in our studio and re-style each season.',image:img.trees,alt:'Retail flagship window display styled with sculptural artificial trees'}
];
const testimonials=[
{quote:'The olive in our living room has been mistaken for real by every single guest. It has not needed a thing in two years.',name:'Sample Client',role:'Private residence, Malabar Hill',approved:true},
{quote:'Housekeeping stopped losing hours to wilted stems. The suites look considered every single morning.',name:'Sample Client',role:'General Manager, boutique hotel',approved:true},
{quote:'They specified the planters to our veneer without being asked. That is the level of attention we hire for.',name:'Sample Client',role:'Principal, interior design practice',approved:true}
];

async function seed(){await connectDB();await Promise.all([Collection.deleteMany({}),Product.deleteMany({}),Project.deleteMany({}),Testimonial.deleteMany({})]);await Collection.insertMany(collections);await Product.insertMany(products);await Project.insertMany(projects);await Testimonial.insertMany(testimonials);console.log(`Seeded ${collections.length} collections, ${products.length} products, ${projects.length} projects, ${testimonials.length} testimonials.`);await mongoose.disconnect();}
seed().catch(async err=>{console.error(err);await mongoose.disconnect();process.exit(1)});
