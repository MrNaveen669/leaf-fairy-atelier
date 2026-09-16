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
  const [confirmAction,setConfirmAction]=useState(null);
  useEffect(()=>{
    const up=()=>setOnline(true),down=()=>setOnline(false);
    window.addEventListener('online',up);window.addEventListener('offline',down);
    const original=window.fetch.bind(window);
    window.fetch=(...args)=>{setPending(n=>n+1);return original(...args).finally(()=>setPending(n=>Math.max(0,n-1)))};
    return()=>{window.removeEventListener('online',up);window.removeEventListener('offline',down);window.fetch=original};
  },[]);
  useEffect(()=>{
    const protect=(event)=>{
      const button=event.target.closest?.('button');
      if(!button||button.dataset.confirmed==='true'||button.disabled)return;
      const label=button.textContent.trim().toLowerCase();
      const orderStatus=button.closest('.admin-detail')?.querySelector('.order-status select')?.value;
      const archive=label==='archive'||label.startsWith('archive ');
      const cancelOrder=label.includes('save order status')&&orderStatus==='cancelled';
      if(!archive&&!cancelOrder)return;
      event.preventDefault();event.stopPropagation();
      setConfirmAction({button,title:cancelOrder?'Cancel this order?':'Archive this item?',body:cancelOrder?'This changes the order status to cancelled. Confirm only after checking the customer and payment details.':'Archived content stays in the system but is removed from active merchant choices.',confirmLabel:cancelOrder?'Cancel order':'Archive'});
    };
    document.addEventListener('click',protect,true);
    return()=>document.removeEventListener('click',protect,true);
  },[]);
  const proceed=()=>{const button=confirmAction?.button;if(!button)return setConfirmAction(null);button.dataset.confirmed='true';setConfirmAction(null);button.click();queueMicrotask(()=>delete button.dataset.confirmed)};
  return <AdminErrorBoundary>
    {!online&&<div className="admin-network" role="status">You are offline. Changes cannot be saved until the connection returns.</div>}
    {pending>0&&<div className="admin-progress" role="status" aria-label="Admin request in progress"><span/></div>}
    <div className={pending>0?'admin-runtime-busy':''} aria-busy={pending>0}><AdminApp/></div>
    {confirmAction&&<div className="admin-confirm-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setConfirmAction(null)}}><section className="admin-confirm" role="alertdialog" aria-modal="true" aria-labelledby="admin-confirm-title"><p className="eyebrow">Confirm action</p><h2 id="admin-confirm-title">{confirmAction.title}</h2><p>{confirmAction.body}</p><div><button className="secondary-action" onClick={()=>setConfirmAction(null)}>Keep editing</button><button className="primary-action danger-action" onClick={proceed}>{confirmAction.confirmLabel}</button></div></section></div>}
  </AdminErrorBoundary>
}
