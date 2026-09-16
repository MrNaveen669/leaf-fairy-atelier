const API_BASE=import.meta.env.VITE_API_URL||'/api';
const nativeFetch=window.fetch.bind(window);
let onUnauthorized=null;

export function setAdminUnauthorizedHandler(handler){onUnauthorized=handler}
export async function adminAuthRequest(path,options={}){
  const response=await nativeFetch(`${API_BASE}/admin/auth${path}`,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
  const data=response.status===204?{}:await response.json().catch(()=>({}));
  if(!response.ok)throw Object.assign(new Error(data.message||'Admin authentication failed'),{status:response.status});
  return data;
}
export function installAdminSessionFetch(){
  window.fetch=async(input,options={})=>{
    const url=typeof input==='string'?input:input?.url||'';
    const isAdmin=url.includes('/api/admin')||url.includes(`${API_BASE}/admin`);
    const headers=new Headers(options.headers||(typeof input!=='string'?input.headers:undefined)||{});
    headers.delete('x-admin-key');
    const response=await nativeFetch(input,{...options,headers,credentials:isAdmin?'include':options.credentials});
    if(isAdmin&&response.status===401&&!url.includes('/auth/login'))onUnauthorized?.();
    return response;
  };
  return()=>{window.fetch=nativeFetch};
}
