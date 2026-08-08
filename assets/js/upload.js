const MAX_FILE_SIZE=10*1024*1024;
const UPLOAD_ENDPOINT=''; // À renseigner uniquement avec une URL backend (Worker/API), jamais avec un token GitHub.
const form=document.getElementById('upload-form'),status=document.getElementById('upload-status'),fileInput=document.getElementById('upload-file'),submit=document.getElementById('upload-submit');
function msg(text,error=false){status.textContent=text;status.className=error?'err':'notice';}
function validate(){const f=fileInput.files?.[0];if(!f){submit.disabled=true;return;}if(f.size>MAX_FILE_SIZE){msg('Fichier refusé : taille maximale 10 Mo.',true);submit.disabled=true;return;}if(!UPLOAD_ENDPOINT){msg('Interface prête, mais backend d’upload non configuré. Aucun secret n’est exposé dans cette page.',false);submit.disabled=true;return;}msg(`Fichier prêt : ${f.name} (${(f.size/1024/1024).toFixed(2)} Mo).`);submit.disabled=false;}
fileInput.addEventListener('change',validate);
form.addEventListener('submit',async e=>{e.preventDefault();if(!UPLOAD_ENDPOINT)return validate();const f=fileInput.files?.[0];if(!f||f.size>MAX_FILE_SIZE)return validate();submit.disabled=true;msg('Envoi en cours…');const body=new FormData(form);try{const r=await fetch(UPLOAD_ENDPOINT,{method:'POST',body,credentials:'omit'});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.message||`HTTP ${r.status}`);msg(data.message||'Fichier envoyé. Il apparaîtra après publication GitHub Pages.');form.reset();}catch(err){msg(`Échec de l’envoi : ${err.message}`,true);}finally{validate();}});
validate();
