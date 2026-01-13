firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});
const db = firebase.firestore();

const menu = document.getElementById("menuConfig");
const conteudo = document.getElementById("conteudo");
const titulo = document.getElementById("tituloSecao");
const tituloTopo = document.getElementById("tituloTopo");

const LABELS = {
  geral:"Geral",
  vacas:"Vacas",
  bezerros:"Bezerros",
  especies:"Espécies",
  farmacia:"Farmácia",
  vacinas:"Vacinas",
  leite:"Leite",
  despesas:"Despesas",
  clima:"Clima",
  menu:"Menu"
};

let CONFIG = {};

/* MENU */
function toggleMenu(){
  menu.classList.toggle("aberto");
}

menu.querySelectorAll("a").forEach(a=>{
  a.onclick=()=>{
    menu.classList.remove("aberto");
    menu.querySelectorAll("a").forEach(x=>x.classList.remove("ativo"));
    a.classList.add("ativo");
    carregarSecao(a.dataset.sec);
  };
});

/* LOAD CONFIG */
async function carregarConfig(){
  const snap = await db.collection("config").get();
  snap.forEach(doc=>{
    CONFIG[doc.id] = doc.data();
  });
}

/* SEÇÕES */
function carregarSecao(sec){
  titulo.innerText = "Configuração de " + LABELS[sec];
  tituloTopo.innerText = LABELS[sec];
  renderFormulario(sec);
}

function renderFormulario(sec){
  const data = CONFIG[sec] || {};
  conteudo.innerHTML = gerarFormulario(sec,data);
}

function gerarFormulario(sec,data){
  let html = `<div class="card"><h3>${LABELS[sec]}</h3>`;

  Object.entries(data).forEach(([key,val])=>{
    if(typeof val === "object"){
      html+=`<fieldset><legend>${key}</legend>`;
      Object.entries(val).forEach(([k,v])=>{
        html+=campo(`${key}.${k}`,v);
      });
      html+=`</fieldset>`;
    }else{
      html+=campo(key,val);
    }
  });

  html+=`<button class="salvar" onclick="salvar('${sec}')">💾 Salvar</button></div>`;
  return html;
}

function campo(nome,valor){
  return `
    <label>${nome.replace(/_/g," ")}</label>
    <input id="${nome}" value="${valor ?? ""}">
  `;
}

async function salvar(sec){
  const inputs = conteudo.querySelectorAll("input");
  let novo = {};

  inputs.forEach(i=>{
    if(i.id.includes(".")){
      const [pai,filho]=i.id.split(".");
      novo[pai] = novo[pai] || {};
      novo[pai][filho] = isNaN(i.value)?i.value:Number(i.value);
    }else{
      novo[i.id] = isNaN(i.value)?i.value:Number(i.value);
    }
  });

  await db.collection("config").doc(sec).set(novo,{merge:true});
  alert("Configuração salva");
}

/* INIT */
(async()=>{
  await carregarConfig();
  carregarSecao("geral");
})();
