const REPO_OWNER="nepheris",REPO_NAME="MadaNotes",REPO_BRANCH="main";
const REPO_API=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const PAGES_ROOT=`https://${REPO_OWNER}.github.io/${REPO_NAME}/`;
const RAW_ROOT=`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/`;
const OPENABLE=new Set(['pdf','html','htm','txt','csv','png','jpg','jpeg','webp','svg','gif','mp4','webm']);

function encodePath(path){return path.split('/').map(encodeURIComponent).join('/');}
function fileExt(name){const p=name.lastIndexOf('.');return p>=0?name.slice(p+1).toLowerCase():'';}
function formatBytes(bytes){if(!Number.isFinite(bytes))return '';const u=['o','Ko','Mo','Go'];let n=bytes,i=0;while(n>=1024&&i<u.length-1){n/=1024;i++;}return `${n.toFixed(i?1:0)} ${u[i]}`;}
function fileIcon(ext){return ({pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',csv:'📊',txt:'📝',zip:'🗜️',png:'🖼️',jpg:'🖼️',jpeg:'🖼️',webp:'🖼️',svg:'🖼️',html:'🌐',htm:'🌐',mp4:'🎬',webm:'🎬'})[ext]||'📦';}
function canOpen(name){return OPENABLE.has(fileExt(name));}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

let treePromise=null;
async function loadRepoTree(){
  if(!treePromise){
    treePromise=fetch(`${REPO_API}/git/trees/${REPO_BRANCH}?recursive=1&_=${Date.now()}`,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}})
      .then(r=>{if(!r.ok)throw new Error(`GitHub API ${r.status}`);return r.json();})
      .then(data=>data.tree||[]);
  }
  return treePromise;
}

async function downloadRepoFile(path,name){
  const url=RAW_ROOT+encodePath(path);
  try{
    const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const blob=await r.blob();const objectUrl=URL.createObjectURL(blob);const a=document.createElement('a');
    a.href=objectUrl;a.download=name||path.split('/').pop();document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(objectUrl),1500);
  }catch(err){window.open(url,'_blank','noopener');}
}
window.downloadRepoFile=downloadRepoFile;

function renderRepoRow(file,sourceLabel){
  const name=file.path.split('/').pop(),ext=fileExt(name),icon=fileIcon(ext),publicUrl=PAGES_ROOT+encodePath(file.path);
  const open=canOpen(name)?`<a class="btn" href="${publicUrl}" target="_blank" rel="noopener">Ouvrir</a>`:'';
  const dl=`<button class="btn" type="button" data-repo-download="${encodeURIComponent(file.path)}" data-repo-name="${encodeURIComponent(name)}">Télécharger</button>`;
  const source=sourceLabel?`<span class="badge info">${esc(sourceLabel)}</span> `:'';
  return `<article class="file-row"><div><div class="file-name">${icon} ${esc(name)}</div><div class="file-meta">${source}${esc(file.path)} ${file.size?`· ${formatBytes(file.size)}`:''}</div></div><div class="file-actions">${open}${dl}</div></article>`;
}

async function populateRepoFiles(el){
  const prefixes=(el.dataset.prefixes||el.dataset.prefix||'').split(';').map(v=>v.trim()).filter(Boolean);
  const matchText=el.dataset.match||'',match=matchText?new RegExp(matchText,'i'):null;
  const extensions=(el.dataset.extensions||'pdf,doc,docx,xls,xlsx,csv,txt,zip,png,jpg,jpeg,webp,svg,html,mp4,webm').split(',').map(v=>v.trim().toLowerCase()).filter(Boolean);
  const status=el.previousElementSibling?.matches('[data-repo-status]')?el.previousElementSibling:null;
  const sourceLabel=el.dataset.sourceLabel||'Dépôt MadaNotes';
  try{
    const tree=await loadRepoTree();
    const files=tree.filter(i=>i.type==='blob'&&!i.path.endsWith('/.gitkeep'))
      .filter(i=>!prefixes.length||prefixes.some(p=>i.path.startsWith(p)))
      .filter(i=>extensions.includes(fileExt(i.path))).filter(i=>!match||match.test(i.path))
      .sort((a,b)=>a.path.localeCompare(b.path,'fr'));
    el.innerHTML=files.length?files.map(f=>renderRepoRow(f,sourceLabel)).join(''):`<p class="muted">${esc(el.dataset.empty||'Aucun document correspondant actuellement dans le dépôt.')}</p>`;
    if(status)status.textContent=`${files.length} document(s) détecté(s) automatiquement.`;
  }catch(err){
    el.innerHTML='<p class="muted">Recherche automatique indisponible. Les liens fixes restent utilisables.</p>';
    if(status)status.textContent='Recherche automatique indisponible.';
  }
}

async function refreshRepoFiles(){treePromise=null;await Promise.all([...document.querySelectorAll('[data-repo-files]')].map(populateRepoFiles));}
window.refreshRepoFiles=refreshRepoFiles;
document.addEventListener('click',e=>{const b=e.target.closest('[data-repo-download]');if(!b)return;downloadRepoFile(decodeURIComponent(b.dataset.repoDownload),decodeURIComponent(b.dataset.repoName));});
window.addEventListener('DOMContentLoaded',refreshRepoFiles);
