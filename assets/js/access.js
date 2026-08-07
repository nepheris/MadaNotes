const ACCESS_HASH="6d421ca6";
function fnv1a(v){
 let h=0x811c9dc5;
 const bytes=new TextEncoder().encode(v);
 for(const b of bytes){h^=b;h=Math.imul(h,0x01000193)>>>0;}
 return h.toString(16).padStart(8,"0");
}
function unlock(){document.getElementById("gate").classList.add("hidden");sessionStorage.setItem("mada-access","1");}
window.addEventListener("DOMContentLoaded",()=>{
 if(sessionStorage.getItem("mada-access")==="1") unlock();
 const input=document.getElementById("access-code");
 const toggle=document.getElementById("toggle-password");
 if(toggle && input){
   toggle.addEventListener("click",()=>{
     const show=input.type==="password";
     input.type=show?"text":"password";
     toggle.textContent=show?"Masquer le mot de passe":"Afficher le mot de passe";
     input.focus();
   });
 }
 const f=document.getElementById("access-form"); if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();const v=input.value;
 if(fnv1a(v)===ACCESS_HASH) unlock(); else document.getElementById("access-error").textContent="Code incorrect."; });
});
