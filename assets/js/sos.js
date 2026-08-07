
const OWNER="nepheris", REPO="MadaNotes", PATH="sos/files";
const icons={pdf:"📄",html:"🌐",htm:"🌐",png:"🖼️",jpg:"🖼️",jpeg:"🖼️",webp:"🖼️",svg:"🖼️",txt:"📝",csv:"📊",xlsx:"📊",xls:"📊",docx:"📝",doc:"📝",zip:"🗜️",bat:"⚙️",exe:"⚙️"};
function ext(n){return (n.split(".").pop()||"").toLowerCase()}
function fmt(n){if(!Number.isFinite(n))return "";let u=["o","Ko","Mo","Go"],i=0;while(n>=1024&&i<u.length-1){n/=1024;i++}return `${n.toFixed(i?1:0)} ${u[i]}`}
function row(f){
 const e=ext(f.name), icon=icons[e]||"📦", pageUrl=`files/${encodeURIComponent(f.name)}`;
 const dl=pageUrl;
 return `<article class="file-row"><div><div class="file-name">${icon} ${f.name}</div><div class="file-meta">${e.toUpperCase()||"FICHIER"} ${f.size? "· "+fmt(f.size):""}</div></div><div class="file-actions"><a class="btn" href="${pageUrl}" target="_blank" rel="noopener">Ouvrir</a><a class="btn" href="${dl}" download>Télécharger</a></div></article>`;
}
async function load(){
 const box=document.getElementById("files"),status=document.getElementById("status");
 try{
   const r=await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,{headers:{"Accept":"application/vnd.github+json"}});
   if(!r.ok) throw new Error("GitHub API "+r.status);
   const data=await r.json(); const files=data.filter(x=>x.type==="file").sort((a,b)=>a.name.localeCompare(b.name,"fr"));
   box.innerHTML=files.map(row).join("")||"<p>Aucun fichier.</p>"; status.textContent=`${files.length} fichier(s) détecté(s) automatiquement.`;
 }catch(err){
   status.textContent="Mode local / secours : lecture du manifeste.";
   try{
     const r=await fetch("manifest.json"); const files=await r.json(); box.innerHTML=files.map(row).join("");
   }catch(e){box.innerHTML="<p>Impossible de charger la liste. Après publication GitHub Pages, la liste sera générée depuis le dépôt public.</p>";}
 }
}
window.addEventListener("DOMContentLoaded",load);
