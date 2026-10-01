export function initEyeTracking(){
 const pupils=[...document.querySelectorAll('.jester-eye i')];
 const move=e=>pupils.forEach(p=>{
  const r=p.parentElement.getBoundingClientRect();
  const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
  const a=Math.atan2(dy,dx),d=Math.min(10,Math.hypot(dx,dy)/30);
  p.style.transform='translate(calc(-50% + '+Math.cos(a)*d+'px),calc(-50% + '+Math.sin(a)*d+'px))';
 });
 addEventListener('pointermove',move,{passive:true});
 addEventListener('pointerleave',()=>pupils.forEach(p=>p.style.transform='translate(-50%,-50%)'),{passive:true});
}