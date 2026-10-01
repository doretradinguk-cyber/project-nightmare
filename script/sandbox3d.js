import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
export function mountSandbox(root){
 root.innerHTML='<div id="sandbox3d" style="height:420px;min-height:60vh;position:relative;background:#020303;overflow:hidden"></div><div class="controls" style="margin-top:10px"><button class="control" id="sandboxPlay">PLAY</button><button class="control" id="sandboxFullscreen">FULLSCREEN</button><span class="readout" id="sandboxState">MANSION / INITIALISING</span></div>';
 const host=root.querySelector('#sandbox3d'),state=root.querySelector('#sandboxState');
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x030505);scene.fog=new THREE.FogExp2(0x030505,.045);
 const camera=new THREE.PerspectiveCamera(70,host.clientWidth/host.clientHeight,.05,120);camera.position.set(0,1.65,7);
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(host.clientWidth,host.clientHeight);renderer.shadowMap.enabled=true;host.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0x8aa68f,0x050505,1.2));const lamp=new THREE.PointLight(0x9dffad,12,18);lamp.position.set(0,2.7,1);lamp.castShadow=true;scene.add(lamp);
 const mat=new THREE.MeshStandardMaterial({color:0x252b28,roughness:.82,metalness:.08}),dark=new THREE.MeshStandardMaterial({color:0x0a0d0c,roughness:1});
 const floor=new THREE.Mesh(new THREE.BoxGeometry(10,.2,70),mat);floor.position.y=-.1;floor.receiveShadow=true;scene.add(floor);
 function wall(x,y,z,w,h,d){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m)}
 wall(-5,2.5,-28,.35,5,60);wall(5,2.5,-28,.35,5,60);wall(0,5,-58,10,10,.35);
 for(let z=4;z>-55;z-=7){const ceiling=new THREE.Mesh(new THREE.BoxGeometry(10,.22,6),dark);ceiling.position.set(0,5,z);scene.add(ceiling);const l=new THREE.PointLight(0xb8ffcf,5,9);l.position.set(0,4.2,z);scene.add(l)}
 for(let z=1;z>-54;z-=7){for(const x of [-3.3,3.3]){const win=new THREE.Mesh(new THREE.BoxGeometry(.08,1.8,2.3),new THREE.MeshBasicMaterial({color:0x203e31}));win.position.set(x,2.3,z);scene.add(win)}}
 const keys={};addEventListener('keydown',e=>keys[e.code]=true);addEventListener('keyup',e=>keys[e.code]=false);
 let running=true,last=performance.now();function tick(now){const dt=Math.min(.04,(now-last)/1000);last=now;if(running){let speed=3.4;if(keys.ShiftLeft)speed=5.2;const f=(keys.KeyW?1:0)-(keys.KeyS?1:0),s=(keys.KeyD?1:0)-(keys.KeyA?1:0);camera.position.z-=f*speed*dt;camera.position.x+=s*speed*dt;camera.position.x=Math.max(-4.2,Math.min(4.2,camera.position.x));camera.position.z=Math.min(6,Math.max(-56,camera.position.z));lamp.position.copy(camera.position);lamp.position.y=2.7;renderer.render(scene,camera)}requestAnimationFrame(tick)}requestAnimationFrame(tick);
 addEventListener('resize',()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)});
 root.querySelector('#sandboxPlay').onclick=()=>{running=!running;state.textContent=running?'MANSION / RUNNING':'MANSION / PAUSED'};root.querySelector('#sandboxFullscreen').onclick=()=>host.requestFullscreen?.();
 state.textContent='MANSION / WEBGL READY — WASD + SHIFT';
}