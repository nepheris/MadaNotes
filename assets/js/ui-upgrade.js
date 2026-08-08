(()=>{
const B='/MadaNotes/';
if(!document.querySelector('link[href*="ui-v2.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href=B+'assets/css/ui-v2.css?v=2.0';document.head.appendChild(l)}
function loadIcons(done){if(window.MadaNotesIcons)return done();const existing=document.querySelector('script[src*="ui-icons.js"]');if(existing){existing.addEventListener('load',done,{once:true});return}const s=document.createElement('script');s.src=B+'assets/js/ui-icons.js?v=2.0';s.onload=done;document.head.appendChild(s)}
function setIcon(el,icon,label){if(!el||!icon)return;el.innerHTML=icon+(label?`<span class="ui-control-label">${label}</span>`:'');}
function stripLeading(text){return text.replace(/^[\s☰❓↗⟲×↑⋯⚓]+/u,'').trim()}
function upgrade(){const I=window.MadaNotesIcons;if(!I)return;
setIcon(document.querySelector('.floating-tools .tool-grip'),I.anchor);
setIcon(document.querySelector('.floating-tools [data-toolbar-help]'),I.help);
setIcon(document.querySelector('.floating-tools [data-top]'),I.top);
setIcon(document.querySelector('.floating-tools [data-toolbar-collapse]'),I.more);
const headerHelp=document.querySelector('[data-global-help]');if(headerHelp)setIcon(headerHelp,I.help,stripLeading(headerHelp.textContent)||'Aide');
const menuSummary=document.querySelector('.site-menu>summary');if(menuSummary)setIcon(menuSummary,I.menu,'Navigation');
document.querySelectorAll('.help-inline').forEach(b=>setIcon(b,I.help));
const panel=document.querySelector('[data-global-help-panel]');if(panel){setIcon(panel.querySelector('.help-grip'),I.anchor);setIcon(panel.querySelector('[data-help-reset]'),I.reset);setIcon(panel.querySelector('[data-help-full]'),I.external);setIcon(panel.querySelector('[data-help-close]'),I.close);const title=panel.querySelector('[data-help-panel-title]');if(title){const txt=stripLeading(title.textContent)||'Aide contextuelle';title.innerHTML=I.help+`<span>${txt}</span>`}}
document.querySelectorAll('a.btn,button.btn').forEach(el=>{const t=el.textContent.trim();if(t.startsWith('↗'))setIcon(el,I.external,stripLeading(t));else if(t.startsWith('⟲')||t.startsWith('↻'))setIcon(el,I.reset,stripLeading(t));});
}
loadIcons(()=>{upgrade();const mo=new MutationObserver(()=>upgrade());mo.observe(document.body,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),4000)});
})();