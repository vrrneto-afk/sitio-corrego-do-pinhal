firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});

const db = firebase.firestore();

const menu = document.getElementById("menuConfig");
const tituloSecao = document.getElementById("tituloSecao");
const formulario = document.getElementById("formulario");

let CONFIG = {};

/* MAPA DE UI */
const UI = {
  bezerros:{
    titulo:"Bezerros / Crias",
    icone:"🐮",
    grupos:[
      {
        titulo:"Regras de idade",
        campos:{
          idade_cria_meses:"Idade máxima de cria (meses)",
          idade_bezerro_meses:"Idade máxima de bezerro (meses)"
        }
      },
      {
        titulo:"Textos exibidos",
        campos:{
          titulo:"Título da tela",
          vazio:"Mensagem quando não houver animais"
        }
      }
    ]
  }
};

/* MENU */
function montarMenu(){
  Object.keys(UI).forEach(sec=>{
    menu.innerHTML+=`
      <a href="#" onclick="abrir('${sec}',this)">
        ${UI[sec].icone} ${UI[sec].titulo}
      </a>
    `;
  });
}

/* ABRIR */
function abrir(sec,el){
  document.querySelectorAll(".menu a").forEach(a=>a.classList.remove("ativo"));
  el.classList.add("ativo");

  tituloSecao.innerText = "Configuração – " + UI[sec].titulo;
  render(sec);
  fecharMenu();
}

/* RENDER */
function render(sec){
  const data = CONFIG[sec] || {};
  const ui = UI[sec];

  let html = `<div class="card">`;

  ui.grupos.forEach(g=>{
    html+=`<div class="grupo"><h4>${g.titulo}</h4>`;
    Object.keys(g.campos).forEach(c=>{
      const val = data[c] ?? data.textos?.[c] ?? "";
      html+=`
        <label>${g.campos[c]}</label>
        <input id="${sec}_${c}" value="${val}">
      `;
    });
    html+=`</div>`;
  });

  html+=`<button class="btn-salvar" onclick="salvar('${sec}')">💾 Salvar</button></div>`;
  formulario.innerHTML = html;
}

/* SALVAR */
async function salvar(sec){
  const payload = {};
  UI[sec].grupos.forEach(g=>{
    Object.keys(g.campos).forEach(c=>{
      payload[c] = document.getElementById(`${sec}_${c}`).value;
    });
  });

  await db.collection("config").doc(sec).set(payload,{merge:true});
  alert("Configuração salva");
}

/* LOAD */
async function init(){
  const snap = await db.collection("config").get();
  snap.forEach(d=>CONFIG[d.id]=d.data());

  montarMenu();
  abrir("bezerros",menu.querySelector("a"));
}
init();

/* MOBILE */
function toggleMenu(){
  menu.classList.toggle("aberto");
}
function fecharMenu(){
  menu.classList.remove("aberto");
}
