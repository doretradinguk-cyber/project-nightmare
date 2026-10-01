const pageLinks=[
  {id:'dashboard',n:'01',title:'NIGHTMARE DASHBOARD',desc:'Project command deck'},
  {id:'sprites',n:'02',title:'SPRITE / ANIMATION LAB',desc:'Sprites, layers and behaviour'},
  {id:'console',n:'03',title:'GAME CONSOLE',desc:'Engine, sandbox and controls'},
  {id:'voice',n:'04',title:'VOICE / AUDIO',desc:'Narration and sound'},
  {id:'database',n:'05',title:'DATABASE / DEV BRIDGE',desc:'Knowledge, prompts and administration'}
];

const matrixGlyphs=['ᚠ','ᛉ','ᛟ','𓂀','𐌗','7','101','404','☠','👁','ϟ','∴','∆','ᚱ'];
function matrixRain(){
 let s='<div class="page-matrix-rain" aria-hidden="true">';
 for(let i=0;i<56;i++){
   const a=(((i*17)%100)+2)%100;
   const delay=-(i%13);
   const duration=7+(i%8);
   const g=matrixGlyphs[i%matrixGlyphs.length]+' '+matrixGlyphs[(i+3)%matrixGlyphs.length];
   s+='<span style="left:'+a+'%;animation-delay:'+delay+'s;animation-duration:'+duration+'s">'+g+'</span>';
 }
 return s+'</div>';
}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const btn=(label,go)=>go?'<button class="glow-btn" data-go="'+go+'">'+label+'</button>':'<button class="glow-btn">'+label+'</button>';
function shell(p,body){
  return '<div class="page page-'+p.n+'" data-page="'+p.id+'"><div class="page-art"></div><div class="page-vignette"></div>'+matrixRain()+'<div class="page-content"><div class="page-heading"><span class="page-kicker">PROJECT NIGHTMARE / PAGE '+p.n+'</span><h2>'+p.title+'</h2><p>'+p.desc+'</p></div>'+body+'</div></div>';
}
function panel(title,body){return '<section class="art-panel"><div class="panel-title"><span>'+title+'</span><i></i></div><div class="panel-body">'+body+'</div></section>'}

export const PAGES=[
{id:'dashboard',short:'01 / Dashboard',n:'01',title:'NIGHTMARE DASHBOARD',render:function(){
 let cards=pageLinks.slice(1).map(p=>'<button class="art-card" data-go="'+p.id+'"><span>PAGE '+p.n+'</span><strong>'+p.title+'</strong><small>'+p.desc+'</small><b>ACCESS ▸</b></button>').join('');
 return shell(this,'<div class="hero-copy"><div class="eyes-mark">◉ ◉</div><h3>PROJECT NIGHTMARE</h3><p>brought to you by seumas dore &amp; lewis dore, all rights reserved by dore trading uk</p></div><div class="art-card-grid">'+cards+'</div>'+panel('SYSTEM CONTROLS','<div class="button-row">'+btn('SPRITE LAB','sprites')+btn('GAME CONSOLE','console')+btn('VOICE / AUDIO','voice')+btn('DATABASE / DEV','database')+'</div>'))}},
{id:'sprites',short:'02 / Sprite Lab',n:'02',title:'SPRITE / ANIMATION LAB',render:function(){
 return shell(this,panel('SPRITE INTAKE','<div class="drop-zone">DROP SPRITES / ANIMATIONS<br><input id="spriteFiles" type="file" multiple accept="image/*,.json"></div><div id="spriteOut" class="readout">NO ASSETS LOADED</div>')+
 panel('ANIMATION TESTING','<div class="timeline"></div><div class="button-row">'+btn('MOVE')+btn('RESIZE')+btn('REMOVE LAYER')+btn('PLAY')+btn('DEV WINDOW')+'</div>')+
 panel('BEHAVIOUR / LOGIC','<textarea class="night-input" placeholder="Describe sprite behaviour, triggers, states and rules..."></textarea><div class="button-row">'+btn('GENERATE LOGIC')+btn('TEST RULE')+'</div>')+
 '<div class="bottom-nav">'+btn('DASHBOARD','dashboard')+btn('GAME CONSOLE','console')+'</div>')}},
{id:'console',short:'03 / Game Console',n:'03',title:'GAME CONSOLE',render:function(){
 return shell(this,panel('ENGINE CONTROL','<div class="engine-row"><div class="disk">◉</div><div><label>ENGINE</label><select><option>Suemas</option><option>Ruby</option><option>Lewis</option></select></div></div><div class="button-row">'+btn('PORT ENGINE')+btn('MOUNT')+btn('EJECT')+'</div>')+
 panel('RUNTIME CONFIG','<div class="control-grid"><label>GRAPHICS<select><option>High</option><option>Medium</option><option>Low</option></select></label><label>FPS<select><option>60</option><option>30</option><option>120</option></select></label><label>INPUT<select><option>Keyboard + Mouse</option><option>Xbox Controller</option><option>PlayStation Controller</option><option>Touch / Mobile</option></select></label><label>CAMERA<select><option>First Person</option><option>Third Person</option></select></label></div>')+
 panel('VIRTUAL SANDBOX','<div id="sandboxMount" class="sandbox-slot"><button class="sandbox-launch" data-action="launch-sandbox">LOAD NIGHTMARE / MANSION</button></div><div class="button-row">'+btn('DASHBOARD','dashboard')+btn('VOICE / AUDIO','voice')+'</div>'))}},
{id:'voice',short:'04 / Voice Audio',n:'04',title:'VOICE / AUDIO',render:function(){
 return shell(this,panel('NARRATOR / SYNTH','<div class="robot">🤖</div><label>AUDIO TOOL<select><option>Kokoro TTS</option></select></label><label>PITCH<input type="range" min="0" max="100" value="50"></label><label>SPEED<input type="range" min="0" max="100" value="50"></label><textarea class="night-input" placeholder="Enter narration..."></textarea><div class="button-row">'+btn('GENERATE AUDIO')+btn('PLAY')+'</div>')+
 panel('AUDIO PLAYER / WAVEFORM','<div class="waveform"></div><div class="button-row">'+btn('UPLOAD AUDIO')+btn('PLAY')+btn('REVERSE')+btn('REWIND')+btn('RECORD')+'</div><label>EXPORT<select><option>JSON</option><option>MP3</option></select></label>')+
 panel('NAVIGATION','<div class="button-row">'+btn('DASHBOARD','dashboard')+btn('DATABASE / DEV','database')+'</div>'))}},
{id:'database',short:'05 / Database Dev',n:'05',title:'DATABASE / DEV BRIDGE',render:function(){
 return shell(this,panel('UPLOAD DATA BRIDGE','<div class="drop-zone">DATA / TEXT / JSON / MP3 / IMAGES / PROMPTS<input type="file" multiple></div><div class="button-row">'+btn('OPEN INTAKE')+btn('VIEW DATABASE')+'</div>')+
 panel('PIPELINE','<div class="pipeline"><span>INGEST</span><b>→</b><span>CLASSIFY</span><b>→</b><span>VALIDATE</span><b>→</b><span>INDEX</span><b>→</b><span>TEACH ENGINE</span></div>')+
 panel('DEV / KNOWLEDGE','<textarea class="night-input" placeholder="Build notes, handovers, rules, page changes..."></textarea><div class="button-row">'+btn('SAVE MEMO')+btn('INDEX KNOWLEDGE')+btn('GENERATE RULE')+'</div>')+
 '<div class="bottom-nav">'+btn('DASHBOARD','dashboard')+btn('SPRITE LAB','sprites')+'</div>')}}
];

export function navigate(id){location.hash=id}
