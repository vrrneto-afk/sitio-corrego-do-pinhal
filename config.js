firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});
const db = firebase.firestore();

/* DOM */
const menuConfig = document.getElementById('menuConfig');
const tituloSecao = document.getElementById('tituloSecao');
const conteudo = document.getElementById('conteudo');

/* CACHE */
let configCache = {};
let secaoAtual = null;

/* ICONES POR SEÇÃO */
const ICONES = {
  geral: "🧭",
  vacas: "🐄",
  bezerros: "🐮",
  especies: "🧬",
  farmacia: "💊",
  vacinas: "💉",
  leite: "🥛",
  despesas: "💰",
  clima: "🌦️",
  menu: "📋",
  historico: "📜",
  relatorios: "📊",
  usuarios: "🔐"
};

/* UI */
function toggleSidebar(){
  const s = document.getElementById('sidebar');
  if(window.innerWidth <= 768){
    s.classList.toggle('open');
  }else{
    s.classList.toggle('collapsed');
  }
}

function voltarSistema(){
  window.location.href = "cadastro_animais.html";
}

/* LOAD CONFIG */
async function carregarConfig(){
  const snap = await db.collection('config').get();
  snap.forEach(doc => configCache[doc.id] = doc.data());
  montarMenu();
}

/* MENU */
function montarMenu(){
  menuConfig.innerHTML = '';
  Object.keys(configCache).forEach((sec,i)=>{
    const a = document.createElement('a');
    a.href = "#";
    a.dataset.sec = sec;
    a.className = i === 0 ? 'ativo' : '';
    a.innerHTML = `<span>${ICONES[sec] || "⚙️"}</span> ${sec}`;
    a.onclick = e =>{
      e.preventDefault();
      document.querySelectorAll('.menu a').forEach(x=>x.classList.remove('ativo'));
      a.classList.add('ativo');
      renderSecao(sec);
      document.getElementById('sidebar').classList.remove('open');
    };
    menuConfig.appendChild(a);
  });
}

/* RENDER */
function renderSecao(sec){
  secaoAtual = sec;
  tituloSecao.innerText = `Configuração – ${sec}`;
  const data = configCache[sec];

  conteudo.innerHTML = `
    <div class="card">
      <h3>${sec}</h3>
      <form id="formConfig">
        ${renderObjeto(data)}
        <button type="button" onclick="salvarSecao()">Salvar</button>
      </form>
    </div>
  `;
}

function renderObjeto(obj, path=''){
  let html = '';
  for(const key in obj){
    const val = obj[key];
    const p = path ? `${path}.${key}` : key;

    if(typeof val === 'string'){
      html += `<label>${key}</label><input data-path="${p}" value="${val}">`;
    }
    else if(typeof val === 'number'){
      html += `<label>${key}</label><input type="number" data-path="${p}" value="${val}">`;
    }
    else if(typeof val === 'object' && !Array.isArray(val)){
      html += `<fieldset><legend>${key}</legend>${renderObjeto(val,p)}</fieldset>`;
    }
  }
  return html;
}

async function salvarSecao(){
  const inputs = document.querySelectorAll('[data-path]');
  const novo = JSON.parse(JSON.stringify(configCache[secaoAtual]));

  inputs.forEach(el=>{
    const path = el.dataset.path.split('.');
    let o = novo;
    while(path.length > 1){
      o = o[path.shift()];
    }
    o[path[0]] = el.type === 'number' ? Number(el.value) : el.value;
  });

  await db.collection('config').doc(secaoAtual).set(novo,{merge:true});
  configCache[secaoAtual] = novo;
  alert("Configuração salva");
}

/* BOOT */
(async()=>{
  await carregarConfig();
  const first = Object.keys(configCache)[0];
  if(first) renderSecao(first);
})();
