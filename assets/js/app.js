(() => {
const { links: LINKS, rows: ROWS } = SITE, $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const I = {
ios:'<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
and:'<svg viewBox="0 0 24 24"><path d="M6 17v-6a6 6 0 0 1 12 0v6zM8.5 5 7 3M15.5 5 17 3M9.5 11h.01M14.5 11h.01"/></svg>',
win:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>'};
const ICON = {
azkar:(()=>{let s='<svg viewBox="0 0 48 48"><path d="M24 30v12M21 42h6"/>';for(let i=0;i<10;i++){const a=i*Math.PI/5;s+=`<circle cx="${(24+13*Math.sin(a)).toFixed(1)}" cy="${(17-13*Math.cos(a)).toFixed(1)}" r="2.6"/>`}return s+'<circle cx="24" cy="17" r="3"/></svg>'})(),
quran:'<img src="assets/img/quran/icon.webp" alt="">'};
const K = { pwa:"PWA", apk:"APK", exe:"EXE" };
/* screenshots: file names inside assets/img/<app>/ (without .webp) */
const SH = {
  azkar:{ ios:["ios-home","ios-sleep","ios-evening-dark"], win:["win-home-fa-dark","win-home-ar-dark","win-home-ar-light","win-morning-light","win-evening-dark","win-audio-light"] },
  quran:{ ios:["ios-welcome","ios-read-light","ios-read-dark","ios-index"], win:["win-welcome","win-read-green","win-read-blue","win-read-light"] }
};

const sq = (s,c) => [0,22.5,45,67.5].map(a => `<rect x="${-s/2}" y="${-s/2}" width="${s}" height="${s}" transform="rotate(${a})" stroke="${c}"/>`).join("");
$("#star").innerHTML = `<g transform="translate(200 200)"><circle r="198" stroke="var(--line)"/><circle r="160" stroke="var(--line)" stroke-dasharray="2 6"/>
<g class="l">${sq(300,"var(--gold)")}</g><g class="l r">${sq(210,"var(--tq)")}</g></g>`;

let L = "fa", th = "dark";
try { L = localStorage.getItem("lang") || "fa"; th = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") } catch (e) {}
if (!T[L]) L = "fa";

function render() {
  const t = T[L], d = document.documentElement;
  d.lang = L; d.dir = t.dir; document.title = t.brand;
  $$("[data-t]").forEach(e => e.textContent = t[e.dataset.t]);
  $$("[data-l]").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === L));
  $("#chips").innerHTML = ["ios","and","win"].map(o => `<span class="chip">${I[o]}${t.os[o]}</span>`).join("");
  const app = (id, n) => {
    const alt = t[n+"T"];
    const pic = f => `<button type="button" data-src="assets/img/${id}/${f}.webp"><img loading="lazy" src="assets/img/${id}/${f}.webp" alt="${alt}"></button>`;
    const tiles = ROWS[id].map(([os,k]) => `<a class="tile" href="${LINKS[id][k]}"${k==="pwa" ? ' target="_blank" rel="noopener"' : " download"}><span class="pi">${I[os]}</span><span class="pn"><b>${t.os[os]}</b><small>${K[k]}</small></span><span class="go">${t.act[k]}</span></a>`).join("");
    const gal = `<div class="gal"><h4>${I.ios}${t.os.ios}</h4><div class="ph">${SH[id].ios.map(pic).join("")}</div><h4>${I.win}${t.os.win}</h4><div class="wn ${id==="azkar"?"p":"w"}">${SH[id].win.map(pic).join("")}</div></div>`;
    return `<article class="app"><div class="vis"><div class="arch">${ICON[id]}</div></div><div class="info"><h3>${alt}</h3><p>${t[n+"D"]}</p><div class="tiles">${tiles}</div></div>${gal}</article>`;
  };
  $("#grid").innerHTML = app("azkar","az") + app("quran","qu") + `<div class="soon"><h3>${t.soonT}</h3><p>${t.soonD}</p></div>`;
  $("#gd").innerHTML = ["ios","and","win"].map((o,i) => `<div><span class="pi">${I[o]}</span><h4>${t["g"+(i+1)+"h"]}</h4><p>${t["g"+(i+1)]}</p></div>`).join("");
}

const MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
const SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
function setTheme(v) {
  th = v; document.documentElement.dataset.theme = v;
  $("#tg").innerHTML = v === "dark" ? SUN : MOON;
  $("meta[name=theme-color]").content = v === "dark" ? "#061427" : "#f3f7f6";
}
$$("[data-l]").forEach(b => b.onclick = () => { L = b.dataset.l; try { localStorage.setItem("lang", L) } catch (e) {} render(); });
$("#tg").onclick = () => { setTheme(th === "dark" ? "light" : "dark"); try { localStorage.setItem("theme", th) } catch (e) {} };

/* click a screenshot to enlarge it */
const lb = $("#lb");
$("#grid").onclick = e => { const b = e.target.closest("button[data-src]"); if (b) { lb.querySelector("img").src = b.dataset.src; lb.showModal(); } };
lb.onclick = () => lb.close();

setTheme(th); $("#yr").textContent = new Date().getFullYear(); render();
})();
