import {initAtmosphere} from './atmosphere.js';
import {PAGES,navigate} from './pages.js';
import {initEyeTracking} from './eyes.js';
import {initStorage} from './storage.js';

const nav=document.querySelector('#nav'),view=document.querySelector('#view'),status=document.querySelector('#status');
PAGES.forEach(p=>{const b=document.createElement('button');b.textContent=p.short;b.dataset.page=p.id;b.onclick=()=>navigate(p.id);nav.appendChild(b)});

async function launchSandbox(){
 const mount=document.querySelector('#sandboxMount');
 if(!mount)return;
 mount.innerHTML='<div class="readout">LOADING NIGHTMARE / MANSION...</div>';
 try{const m=await import('./sandbox3d.js');m.mountSandbox(mount)}catch(e){mount.innerHTML='<div class="readout">SANDBOX LOAD ERROR: '+e.message+'</div>';console.error(e)}
}

function render(id=location.hash.slice(1)||'dashboard'){
 const p=PAGES.find(x=>x.id===id)||PAGES[0];
 view.innerHTML=p.render();
 nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.page===p.id));
 if(p.mount)p.mount();
 status.textContent='SYSTEM / '+p.short.toUpperCase()+' / ONLINE';
 if(location.hash!=='#'+p.id)history.replaceState(null,'','#'+p.id);
}

window.addEventListener('hashchange',()=>render());
window.addEventListener('click',e=>{
 const go=e.target.closest('[data-go]');
 if(go){e.preventDefault();navigate(go.dataset.go);return}
 if(e.target.closest('[data-action="launch-sandbox"]'))launchSandbox();
});
initAtmosphere();
initEyeTracking();
initStorage();
render();
