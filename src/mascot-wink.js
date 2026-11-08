// Un seul clin d’œil de la mascotte latérale par ouverture du document.
// Les nouveaux rendus de l'application ne relancent pas l'animation.
const still=new URL('../assets/mascotte.png',import.meta.url).href;
const wink=new URL('../assets/mascotte-clin-oeil.gif',import.meta.url).href;
const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
let consumed=false,timer,activeImage;
const observer=new MutationObserver(start);
function stop(){clearTimeout(timer);if(activeImage?.isConnected)activeImage.src=still;}
function start(){
  const target=document.querySelector('.side-mascot img');
  if(!target||consumed)return;
  consumed=true;observer.disconnect();
  if(preference.matches)return;
  const preload=new Image();
  preload.onload=()=>{
    if(preference.matches||!target.isConnected)return;
    activeImage=target;target.src=wink;
    // Le GIF ne boucle pas ; retour au PNG pour garder l'illustration originale.
    timer=window.setTimeout(stop,1700);
  };
  preload.src=wink;
}
preference.addEventListener('change',e=>{if(e.matches)stop();});
observer.observe(document.documentElement,{childList:true,subtree:true});
start();
