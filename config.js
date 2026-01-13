firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});

const db = firebase.firestore();
const conteudo = document.getElementById("conteudo");
const menu = document.getElementById("menu-config");
const drawer = document.getElementById("drawer");

let cache = {};
let atual = null;

/* UI MAP */
const UI = {
  geral:{icone:"🧭",titulo:"Geral",grupos:[
    {titulo:"Textos globais",campos:{titulo_app:"Título da aplicação"}}
  ]},

  bezerros:{icone:"🐮",titulo:"Bezerros / Crias",grupos:[
    {titulo:"Faixa etária",campos:{
      idade_cria_meses:"Idade máxima da cria (meses)",
      idade_bezerro_meses:"Idade máxima do bezerro (meses)"
    }},
    {titulo:"Textos exibidos",origem:"textos",campos:{
      titulo:"Título da tela",
      vazio:"Mensagem vazia"
    }}
  ]},

  vacinas:{icone:"💉",titulo:"Vacinas",grupos:[
    {titulo:"Prioridades",origem:"prioridades",campos:{
      atrasada:"Atrasada",
      pendente:"Pendente",
      finalizada:"Finalizada"
    }},
    {titulo:"Status",origem:"status",campos:{
      pendente:"Pendente",
      atrasada:"Atrasada",
      finalizada:"Finalizada"
    }}
  ]},

  despesas:{icone:"💰",titulo:"Despesas",grupos:[
    {titulo:"Regras",campos:{
      vencimentos_max:"Quantidade de avisos"
    }},
    {titulo:"Textos",origem:"textos",campos:{
      vence_em:"Texto vence em",
      atrasada_ha:"Texto atrasada há"
    }}
  ]},

  vacas:{icone:"🐄",titulo:"Vacas",grupos:[
    {titulo:"Gestação",campos:{
      gestacao_meses:"Duração da gestação",
      idade_minima_meses:"Idade mínima"
    }}
  ]},

  leite:{icone:"🥛",titulo:"Leite",grupos:[
    {titulo:"Produção",campos:{
      preco_litro:"Preço do litro"
    }}
  ]},

  especies:{icone:"🧬",titulo:"Espécies",grupos:[
    {titulo:"Configuração",campos:{habilitar:"Ativo (1=sim)"}}
  ]},

  farmacia:{icone:"💊",titulo:"Farmácia",grupos:[
    {titulo:"Alertas",campos:{estoque_min:"Estoque mínimo"}}
  ]},

  clima:{icone:"🌦️",titulo:"Clima",grupos:[
    {titulo:"Exibição",campos:{mostrar_alerta:"Mostrar alerta (1=sim)"}}
  ]},

  menu:{icone:"📋",titulo:"Menu",grupos:[
    {titulo:"Exibição",campos:{ordem_fixa:"Ordem fixa (1=sim)"}}
  ]}
};

/* MENU */
Object.keys(UI).forEach(k=>{
  const li=document.createElement("li");
  li.innerHTML=`${UI[k].icone} ${UI[k].titulo}`;
  li.onclick=()=>abrir(k);
  menu.appendChild(li);
});

function toggleMenu(){
  drawer.classList.toggle("open");
}

/* LOAD */
async function carregar(){
  const snap=await db.collection("config").get();
  snap.forEach(d=>cache[d.id]=d.data());
  abrir("geral");
}

function abrir(sec){
  atual=sec;
  drawer.classList.remove("open");
  render();
}

/* RENDER */
function render(){
  const conf=UI[atual];
  const dados=cache[atual]||{};
  let html=`<div class="card"><h3>${conf.titulo}</h3>`;

  conf.grupos.forEach(g=>{
    html+=`<div class="grupo"><h4>${g.titulo}</h4>`;
    const origem=g.origem?dados[g.origem]||{}:dados;
    Object.keys(g.campos).forEach(c=>{
      html+=`
        <label>${g.campos[c]}</label>
        <input data-origem="${g.origem||""}" data-campo="${c}" value="${origem[c]||""}">
      `;
    });
    html+="</div>";
  });

  html+=`<button class="salvar" onclick="salvar()">💾 Salvar</button></div>`;
  conteudo.innerHTML=html;
}

/* SAVE */
async function salvar(){
  const inputs=document.querySelectorAll("input");
  let doc=cache[atual]||{};
  inputs.forEach(i=>{
    const o=i.dataset.origem;
    const c=i.dataset.campo;
    if(o){
      doc[o]=doc[o]||{};
      doc[o][c]=i.value;
    }else{
      doc[c]=i.value;
    }
  });

  await db.collection("config").doc(atual).set(doc,{merge:true});
  cache[atual]=doc;
  alert("Configuração salva");
}

carregar();
