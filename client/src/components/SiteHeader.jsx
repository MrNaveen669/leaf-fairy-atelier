import { useEffect,useState } from 'react';
import { Link,NavLink,useLocation } from 'react-router-dom';
import { Menu,X,Search,UserRound,Heart,ShoppingBag,ArrowUpRight } from 'lucide-react';
import { api } from '../api/client.js';
export default function SiteHeader(){
 const location=useLocation();
 const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false),[collections,setCollections]=useState([]);
 const isHeroPage=location.pathname==='/'||location.pathname.startsWith('/collections/');
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{api.get('/collections').then(setCollections).catch(()=>{})},[]);
 const links=[...collections.map(c=>({label:c.title,to:`/collections/${c.slug}`})),{label:'Contact',to:'/contact'}];
 useEffect(()=>{setOpen(false)},[location.pathname]);
 useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
 useEffect(()=>{const onKeyDown=(event)=>{if(event.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKeyDown);return()=>window.removeEventListener('keydown',onKeyDown)},[]);
 const utility=[{label:'Search',icon:Search},{label:'Account',icon:UserRound},{label:'Wishlist',icon:Heart},{label:'Bag',icon:ShoppingBag}];
 const headerClass=`site-header ${isHeroPage?'site-header--hero':''} ${!isHeroPage||scrolled?'site-header--scrolled':''}`;
 return <header className={headerClass}>
  <div className="announcement-bar"><div className="announcement-bar__inner">Private botanical styling for considered interiors <span aria-hidden="true">·</span> Mumbai atelier</div></div>
  <div className="site-header__bar site-container">
   <nav className="site-header__nav" aria-label="Primary navigation">{links.map(l=><NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}</nav>
   <Link to="/" className="site-header__brand" aria-label="Leaf Fairy home">Leaf Fairy</Link>
   <div className="site-header__utility" aria-label="Utility navigation">{utility.map(({label,icon:Icon})=><button key={label} type="button" aria-label={`${label} (coming soon)`} title={`${label} (coming soon)`}><Icon/></button>)}</div>
   <button className="site-header__menu-button" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'}>{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"><div className="mobile-nav__inner">{links.map(l=><NavLink onClick={()=>setOpen(false)} key={l.to} to={l.to}>{l.label}<ArrowUpRight size={15} aria-hidden="true"/></NavLink>)}<div className="mobile-nav__utility" aria-label="Utility navigation">{utility.map(({label,icon:Icon})=><button key={label} type="button" aria-label={`${label} (coming soon)`}><Icon/><span>{label}</span></button>)}</div></div></nav>}
 </header>
}
