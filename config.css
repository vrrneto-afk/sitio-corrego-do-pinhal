firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});
const db = firebase.firestore();

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const conteudo = document.getElementById("conteudo");
const menuConfig = document.getElementById("menuConfig");

let CONFIG = {};

function toggleMenu(){
  drawer.classList.toggle("open");
  overlay.classList.toggle("show");
}
function fecharMenu(){
  drawer.classList.remove("open");
  overlay.classList.remove("show");
}

/* 🔹 CARREGA CONFIG COMPLETA */
async function carregarConfig(){
  const snap = await db.collection("config").get();
  snap.forEach(d=>{
    CONFIG[d.id] = d.data();
  });

  montarMenu();
}

/* 🔹 MENU */
function montarMenu(){
  menuConfig.innerHTML="";
  Object.keys(CONFIG).forEach(k=>{
    const nome = k.charAt(0).toUpperCase() + k.slice(1);
    const a = document.createElement("a");
    a.textContent = nome.replace("_"," ");
    a.onclick = ()=>{
      document.querySelectorAll("#menuConfig a").forEach(x=>x.classList.remove("ativo"));
      a.classList.add("ativo");
      fecharMenu();
      renderConfig(k);
    };
    menuConfig.appendChild(a);
  });
}

/* 🔹 RENDER GENÉRICO (TODOS OS CAMPOS) */
function renderConfig(sec){
  const data = CONFIG[sec];

  let html = `<div class="card"><h3>Configuração – ${sec.charAt(0).toUpperCase()+sec.slice(1)}</h3><form>`;

  for(const [k,v] of Object.entries(data)){
    if(k==="seed") continue;

    if(typeof v==="object" && !Array.isArray(v)){
      html+=`<fieldset><legend>${k}</legend>`;
      for(const [ck,cv] of Object.entries(v)){
        html+=campo(`${k}.${ck}`,cv);
      }
      html+=`</fieldset>`;
    }else{
      html+=campo(k,v);
    }
  }

  html+=`<button type="button" class="salvar" onclick="salvar('${sec}')">💾 Salvar</button></form></div>`;
  conteudo.innerHTML = html;
}

/* 🔹 CAMPO */
function campo(nome,valor){
  return `
    <label>${nome.replace(/_/g," ")}</label>
    <input id="${nome}" value="${valor}">
  `;
}

/* 🔹 SALVAR */
async function salvar(sec){
  const data = CONFIG[sec];
  const novo = {};

  for(const k in data){
    if(k==="seed") continue;

    if(typeof data[k]==="object" && !Array.isArray(data[k])){
      novo[k]={};
      for(const ck in data[k]){
        novo[k][ck]=document.getElementById(`${k}.${ck}`).value;
      }
    }else{
      novo[k]=document.getElementById(k).value;
    }
  }

  await db.collection("config").doc(sec).update(novo);
  alert("Configuração salva com sucesso");
  CONFIG[sec]=novo;
}

/* INIT */
carregarConfig();
