firebase.initializeApp({
  apiKey:"AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
  authDomain:"sitio-corrego-do-pinhal.firebaseapp.com",
  projectId:"sitio-corrego-do-pinhal"
});
const db = firebase.firestore();

/* DOM */
const tituloSecao = document.getElementById('tituloSecao');
const conteudo = document.getElementById('conteudo');
const menuConfig = document.getElementById('menuConfig');

/* CACHE */
let configCache = {};
let secaoAtual = null;

/* UI */
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed');
}

/* LOAD CONFIG */
async function carregarConfig(){
  const snap = await db.collection('config').get();
  snap.forEach(doc => configCache[doc.id] = doc.data());
  montarMenu();
}

/* MENU DINÂMICO */
function montarMenu(){
  menuConfig.innerHTML = '';
  Object.keys(configCache).forEach((sec,i)=>{
    const a = document.createElement('a');
    a.href = '#';
    a.dataset.sec = sec;
    a.className = i === 0 ? 'ativo' : '';
    a.innerHTML = `<span>⚙️</span> ${sec}`;
    a.onclick = e => {
      e.preventDefault();
      document.querySelectorAll('.menu a').forEach(x=>x.classList.remove('ativo'));
      a.classList.add('ativo');
      renderSecao(sec);
    };
    menuConfig.appendChild(a);
  });
}

/* RENDER SEÇÃO */
function renderSecao(sec){
  secaoAtual = sec;
  tituloSecao.innerText = 'Configuração – ' + sec;
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

/* RENDER GENÉRICO */
function renderObjeto(obj, path=''){
  let html = '';

  for(const key in obj){
    if(key === 'seed') continue;

    const value = obj[key];
    const p = path ? `${path}.${key}` : key;

    if(typeof value === 'string'){
      html += `<label>${key}</label><input data-path="${p}" value="${value}">`;
    }
    else if(typeof value === 'number'){
      html += `<label>${key}</label><input type="number" data-path="${p}" value="${value}">`;
    }
    else if(typeof value === 'boolean'){
      html += `<label><input type="checkbox" data-path="${p}" ${value?'checked':''}> ${key}</label>`;
    }
    else if(Array.isArray(value)){
      html += `<fieldset><legend>${key}</legend>`;
      value.forEach((item,i)=>{
        html += renderObjeto(item, `${p}[${i}]`);
      });
      html += `</fieldset>`;
    }
    else if(typeof value === 'object'){
      html += `<fieldset><legend>${key}</legend>`;
      html += renderObjeto(value, p);
      html += `</fieldset>`;
    }
  }
  return html;
}

/* SAVE */
async function salvarSecao(){
  const inputs = document.querySelectorAll('[data-path]');
  const novo = JSON.parse(JSON.stringify(configCache[secaoAtual]));

  inputs.forEach(el=>{
    const path = el.dataset.path;
    const val = el.type === 'checkbox'
      ? el.checked
      : el.type === 'number'
      ? Number(el.value)
      : el.value;
    setValor(novo, path, val);
  });

  await db.collection('config').doc(secaoAtual).set(novo, {merge:true});
  configCache[secaoAtual] = novo;
  alert('Configuração salva');
}

/* UTIL */
function setValor(obj, path, valor){
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let o = obj;
  while(parts.length > 1){
    const p = parts.shift();
    if(!(p in o)) o[p] = {};
    o = o[p];
  }
  o[parts[0]] = valor;
}

/* BOOT */
(async()=>{
  await carregarConfig();
  const primeira = Object.keys(configCache)[0];
  if(primeira) renderSecao(primeira);
})();
