const REPO_OWNER="nepheris", REPO_NAME="MadaNotes", REPO_BRANCH="main";
const REPO_API=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const PAGES_ROOT=`https://${REPO_OWNER}.github.io/${REPO_NAME}/`;
const RAW_ROOT=`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/`;

function encodePath(path){return path.split('/').map(encodeURIComponent).join('/');}
function fileExt(name){const p=name.lastIndexOf('.');return p>=0?name.slice(p+1).toLowerCase():'';}
function formatBytes(bytes){if(!Number.isFinite(bytes))return '';const units=['o','Ko','Mo','Go'];let n=bytes,i=0;while(n>=1024&&i<units.length-1){n/=1024;i++;}return `${n.toFixed(i?1:0)} ${units[i]}`;}
function fileIcon(ext){return ({pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',csv:'📊',txt:'📝',zip:'🗜️',png:'🖼️',jpg:'🖼️',jpeg:'🖼️',webp:'🖼️',html:'🌐',htm:'🌐'})[ext]||'📦';}

let treePromise=null;
async function loadRepoTree(){
  if(!treePromise){
    treePromise=fetch(`${REPO_API}/git/trees/${REPO_BRANCH}?recursive=1&_=${Date.now()}`,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}})
      .then(r=>{if(!r.ok)throw new Error(`GitHub API ${r.status}`);return r.json();})
      .then(data=>data.tree||[]);
  }
  return treePromise;
}

function renderRepoRow(file){
  const name=file.path.split('/').pop();
  const ext=fileExt(name), icon=fileIcon(ext);
  const publicUrl=PAGES_ROOT+encodePath(file.path);
  const rawUrl=RAW_ROOT+encodePath(file.path);
  return `<article class="file-row"><div><div class="file-name">${icon} ${name}</div><div class="file-meta">${file.path} ${file.size?`· ${formatBytes(file.size)}`:''}</div></div><div class="file-actions"><a class="btn" href="${publicUrl}" target="_blank" rel="noopener">Ouvrir</a><a class="btn" href="${rawUrl}" download>Télécharger</a></div></article>`;
}

async function populateRepoFiles(el){
  const prefixes=(el.dataset.prefixes||el.dataset.prefix||'').split(';').map(v=>v.trim()).filter(Boolean);
  const matchText=el.dataset.match||'';
  const match=matchText?new RegExp(matchText,'i'):null;
  const extensions=(el.dataset.extensions||'pdf,doc,docx,xls,xlsx,csv,txt,zip,png,jpg,jpeg,webp,html').split(',').map(v=>v.trim().toLowerCase()).filter(Boolean);
  const status=el.previousElementSibling?.matches('[data-repo-status]')?el.previousElementSibling:null;
  try{
    const tree=await loadRepoTree();
    const files=tree.filter(item=>item.type==='blob'&&!item.path.endsWith('/.gitkeep'))
      .filter(item=>!prefixes.length||prefixes.some(prefix=>item.path.startsWith(prefix)))
      .filter(item=>extensions.includes(fileExt(item.path)))
      .filter(item=>!match||match.test(item.path))
      .sort((a,b)=>a.path.localeCompare(b.path,'fr'));
    el.innerHTML=files.length?files.map(renderRepoRow).join(''):`<p class="muted">${el.dataset.empty||'Aucun document correspondant actuellement dans le dépôt.'}</p>`;
    if(status)status.textContent=`${files.length} document(s) détecté(s) automatiquement dans le dépôt.`;
  }catch(err){
    el.innerHTML='<p class="muted">Impossible de charger automatiquement les documents pour le moment. Les liens fixes de la page restent utilisables.</p>';
    if(status)status.textContent='Recherche automatique indisponible.';
  }
}

async function refreshRepoFiles(){
  treePromise=null;
  await Promise.all([...document.querySelectorAll('[data-repo-files]')].map(populateRepoFiles));
}
window.refreshRepoFiles=refreshRepoFiles;
window.addEventListener('DOMContentLoaded',refreshRepoFiles);
