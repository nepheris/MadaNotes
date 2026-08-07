
const ACCESS_HASH="9afaf34e";
function fnv1a(v){
 let h=0x811c9dc5;
 const bytes=new TextEncoder().encode(v);
 for(const b of bytes){h^=b;h=Math.imul(h,0x01000193)>>>0;}
 return h.toString(16).padStart(8,"0");
}
function unlock(){document.getElementById("gate").classList.add("hidden");sessionStorage.setItem("mada-access","1");}
window.addEventListener("DOMContentLoaded",()=>{
 if(sessionStorage.getItem("mada-access")==="1") unlock();
 const f=document.getElementById("access-form"); if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();const v=document.getElementById("access-code").value;
 if(fnv1a(v)===ACCESS_HASH) unlock(); else document.getElementById("access-error").textContent="Code incorrect."; });
});
