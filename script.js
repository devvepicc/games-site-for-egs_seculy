const GEFORCE_URL = "https://play.geforcenow.com/";
const games = [
 {id:"retro-bowl",name:"Retro Bowl",category:"Sports",sub:"Sports · Football",label:"RETRO BOWL",c1:"#28794a",c2:"#123d35",url:"https://poki.com/en/g/retro-bowl",featured:true},
 {id:"slope",name:"Slope",category:"Arcade",sub:"Arcade · Endless Runner",label:"SLOPE",c1:"#0b6b36",c2:"#031b22",url:"https://poki.com/en/g/slope",featured:true},
 {id:"basketball-stars",name:"Basketball Stars",category:"Sports",sub:"Sports · Basketball",label:"BASKETBALL STARS",c1:"#1557a2",c2:"#db7a24",url:"https://www.miniclip.com/",featured:true},
 {id:"run-3",name:"Run 3",category:"Arcade",sub:"Platformer · Space",label:"RUN 3",c1:"#25165f",c2:"#070d24",url:"https://poki.com/en/g/run-3",featured:true},
 {id:"1v1lol",name:"1v1.LOL",category:"Action",sub:"Action · Building",label:"1v1.LOL",c1:"#087ed6",c2:"#1e3662",url:"https://1v1.lol/",featured:true},
 {id:"geometry-dash",name:"Geometry Dash",category:"Arcade",sub:"Rhythm · Platformer",label:"GEOMETRY DASH",c1:"#0750c9",c2:"#12a3d5",url:"https://www.robtopgames.com/",featured:true},
 {id:"agar",name:"Agar.io",category:"IO Games",sub:"IO Games · Multiplayer",label:"Agar.io",c1:"#dbe7ff",c2:"#8cc8ff",url:"https://agar.io/"},
 {id:"krunker",name:"Krunker.io",category:"Action",sub:"Action · FPS",label:"KRUNKER",c1:"#64492f",c2:"#111b29",url:"https://krunker.io/"},
 {id:"shell-shockers",name:"Shell Shockers",category:"Action",sub:"Action · Shooter",label:"SHELL SHOCKERS",c1:"#369847",c2:"#b1d77d",url:"https://shellshock.io/"},
 {id:"stickman-fight",name:"Stickman Fight",category:"Action",sub:"Action · Fighting",label:"STICKMAN FIGHT",c1:"#172958",c2:"#d12c54",url:"https://poki.com/"},
 {id:"minecraft-classic",name:"Minecraft Classic",category:"Strategy",sub:"Strategy · Sandbox",label:"MINECRAFT",c1:"#5b9d53",c2:"#263d2a",url:"https://classic.minecraft.net/"},
 {id:"happy-wheels",name:"Happy Wheels",category:"Racing",sub:"Racing · Physics",label:"HAPPY WHEELS",c1:"#1880bf",c2:"#f0d7a1",url:"https://www.totaljerkface.com/happy_wheels.thtml"},
 {id:"football-legends",name:"Football Legends",category:"Sports",sub:"Sports · Football",label:"FOOTBALL",c1:"#8a2e2e",c2:"#16385c",url:"https://poki.com/"},
 {id:"rooftop-snipers",name:"Rooftop Snipers",category:"Action",sub:"Action · Versus",label:"ROOFTOP SNIPERS",c1:"#1a3e50",c2:"#131a2a",url:"https://poki.com/"},
 {id:"tanki",name:"Tanki Online",category:"Action",sub:"Action · Tanks",label:"TANKI ONLINE",c1:"#d1a45b",c2:"#34433d",url:"https://tankionline.com/"},
 {id:"idle-breakout",name:"Idle Breakout",category:"Puzzle",sub:"Puzzle · Idle",label:"IDLE BREAKOUT",c1:"#b93e22",c2:"#283e9e",url:"https://www.coolmathgames.com/"},
 {id:"color-switch",name:"Color Switch",category:"Arcade",sub:"Arcade · Reflex",label:"COLOR SWITCH",c1:"#112e7a",c2:"#efba18",url:"https://poki.com/"},
 {id:"zombs-royale",name:"Zombs Royale",category:"IO Games",sub:"IO Games · Battle Royale",label:"ZOMBS ROYALE",c1:"#448b36",c2:"#a6c96d",url:"https://zombsroyale.io/"}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let category = "All", view = "all", search = "";
const saved = new Set(JSON.parse(localStorage.getItem("stracath-favorites") || "[]"));
let history = JSON.parse(localStorage.getItem("stracath-history") || "[]");
const featuredGrid = $("#featuredGrid"), allGamesGrid = $("#allGamesGrid");
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function card(g, small=false){
 const isSaved=saved.has(g.id);
 return `<article class="game-card"><div class="game-art" style="--c1:${g.c1};--c2:${g.c2}"><span>${escapeHTML(g.label)}</span></div><div class="game-info"><div class="game-title" title="${escapeHTML(g.name)}">${escapeHTML(g.name)}</div>${small?'':`<div class="game-category">${escapeHTML(g.sub)}</div>`}<div class="card-actions"><button class="play-btn" data-play="${g.id}">Play ↗</button><button class="heart-btn ${isSaved?'saved':''}" data-fav="${g.id}" aria-label="${isSaved?'Remove from':'Add to'} favorites">${isSaved?'♥':'♡'}</button></div></div></article>`;
}
function filteredGames(){
 let list=games.filter(g=>(category==="All"||g.category===category)&&g.name.toLowerCase().includes(search));
 if(view==="favorites") list=list.filter(g=>saved.has(g.id));
 if(view==="history") list=list.filter(g=>history.includes(g.id));
 return list;
}
function render(){
 featuredGrid.innerHTML=games.filter(g=>g.featured).map(g=>card(g)).join("");
 const list=filteredGames();
 allGamesGrid.innerHTML=list.map(g=>card(g,true)).join("");
 $("#resultsCount").textContent=`${list.length} games`;
 $("#emptyState").hidden=list.length>0;
 $("#featuredSection").hidden=view!=="all"||search.length>0||category!=="All";
 $$(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category===category));
 $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.category===category && !b.dataset.view));
 renderHistory();
}
function renderHistory(){
 const wrap=$("#historyList");
 const list=history.map(id=>games.find(g=>g.id===id)).filter(Boolean).slice(0,5);
 wrap.innerHTML=list.length?list.map(g=>`<div class="mini-item"><div class="mini-thumb" style="background:linear-gradient(135deg,${g.c1},${g.c2})">${escapeHTML(g.label)}</div><div class="mini-text"><strong>${escapeHTML(g.name)}</strong><small>Recently opened</small></div><button class="mini-open" data-play="${g.id}" aria-label="Open ${escapeHTML(g.name)}">›</button></div>`).join(""):'<p class="muted">Games you open will appear here.</p>';
}
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2600)}
function openGame(id){
 const g=games.find(x=>x.id===id); if(!g)return;
 history=[id,...history.filter(x=>x!==id)].slice(0,10);
 localStorage.setItem("stracath-history",JSON.stringify(history));renderHistory();
 // Open the publisher or established hosting page; the directory does not proxy game traffic.
 window.open(g.url,"_blank","noopener,noreferrer");
}
document.addEventListener("click",e=>{
 const play=e.target.closest("[data-play]");
 if(play){openGame(play.dataset.play);return}
 const fav=e.target.closest("[data-fav]");
 if(fav){const id=fav.dataset.fav;saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem("stracath-favorites",JSON.stringify([...saved]));render();toast(saved.has(id)?"Added to favorites":"Removed from favorites");return}
 const filter=e.target.closest("[data-category]");
 if(filter){category=filter.dataset.category;view="all";$$("[data-view]").forEach(b=>b.classList.remove("active"));render();$("#allGamesSection").scrollIntoView({behavior:"smooth",block:"start"});return}
 const viewBtn=e.target.closest("[data-view]");
 if(viewBtn){view=viewBtn.dataset.view;category="All";render();$("#allGamesSection").scrollIntoView({behavior:"smooth",block:"start"});}
});
$("#searchInput").addEventListener("input",e=>{search=e.target.value.trim().toLowerCase();view="all";render()});
$("#exploreBtn").addEventListener("click",()=>$("#allGamesSection").scrollIntoView({behavior:"smooth"}));
$("#viewAllBtn").addEventListener("click",()=>{$("#allGamesSection").scrollIntoView({behavior:"smooth"});});
$("#geforceBtn").addEventListener("click",()=>window.open(GEFORCE_URL,"_blank","noopener,noreferrer"));
$("#sideGeforce").addEventListener("click",()=>window.open(GEFORCE_URL,"_blank","noopener,noreferrer"));
render();