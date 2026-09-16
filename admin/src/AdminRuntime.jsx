import React,{Component,useEffect,useState} from 'react';
import AdminApp from './AdminApp';

class AdminErrorBoundary extends Component{
  constructor(props){super(props);this.state={error:null}}
  static getDerivedStateFromError(error){return {error}}
  componentDidCatch(error,info){console.error('Admin workspace error',error,info)}
  render(){if(!this.state.error)return this.props.children;return <main className="admin-fatal"><div><p className="eyebrow">Leaf Fairy Admin</p><h1>Workspace needs a refresh</h1><p>An unexpected interface error interrupted the merchant workspace. Your server data has not been deleted.</p><button onClick={()=>window.location.reload()}>Reload workspace</button></div></main>}
}

export default function AdminRuntime(){
  const [online,setOnline]=useState(()=>navigator.onLine);
  const [pending,setPending]=useState(0);
  useEffect(()=>{
    const up=()=>setOnline(true),down=()=>setOnline(false);
    window.addEventListener('online',up);window.addEventListener('offline',down);
    const original=window.fetch.bind(window);
    window.fetch=(...args)=>{setPending(n=>n+1);return original(...args).finally(()=>setPending(n=>Math.max(0,n-1)))};
    return()=>{window.removeEventListener('online',up);window.removeEventListener('offline',down);window.fetch=original};
  },[]);
  return <AdminErrorBoundary>{!online&&<div className="admin-network" role="status">You are offline. Changes cannot be saved until the connection returns.</div>}{pending>0&&<div className="admin-progress" role="status" aria-label="Admin request in progress"><span/></div>}<AdminApp/></AdminErrorBoundary>
}
