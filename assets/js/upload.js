const MAX_FILE_SIZE=10*1024*1024;
const UPLOAD_ENDPOINT=''; // URL backend uniquement. Ne jamais placer de secret GitHub ici.
const form=document.getElementById('upload-form'),status=document.getElementById('upload-status'),fileInput=document.getElementById('upload-file'),submit=document.getElementById('upload-submit');
const password=document.getElementById('upload-password'),toggle=document.getElementById('toggle-upload-password');
function msg(text,error=false){status.textContent=text;status.className=error?'err':'notice';}
function validate(){const f=fileInput.files?.[0];if(!f){submit.disabled=true;msg('Mode démonstration : choisissez un fichier pour tester la validation locale.');return;}if(f.size>MAX_FILE_SIZE){msg('Fichier refusé : taille maximale 10 Mo.',true);submit.disabled=true;return;}if(!UPLOAD_ENDPOINT){msg(`Fichier valide : ${f.name} (${(f.size/1024/1024).toFixed(2)} Mo). Backend non configuré : aucun envoi réel n’est effectué.`);submit.disabled=true;return;}submit.disabled=false;msg(`Fichier prêt : ${f.name}.`);}
if(toggle&&password){toggle.addEventListener('click',()=>{const show=password.type==='password';password.type=show?'text':'password';toggle.textContent=show?'Masquer':'Afficher';toggle.setAttribute('aria-pressed',String(show));password.focus();});}
fileInput.addEventListener('change',validate);
form.addEventListener('submit',async e=>{e.preventDefault();if(!UPLOAD_ENDPOINT)return validate();const f=fileInput.files?.[0];if(!f||f.size>MAX_FILE_SIZE)return validate();submit.disabled=true;msg('Envoi en cours…');const body=new FormData(form);try{const r=await fetch(UPLOAD_ENDPOINT,{method:'POST',body,credentials:'omit'});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.message||`HTTP ${r.status}`);msg(data.message||'Fichier envoyé.');form.reset();}catch(err){msg(`Échec : ${err.message}`,true);}finally{validate();}});
validate();
