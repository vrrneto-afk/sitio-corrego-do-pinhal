/* =====================================================
   CONFIG – BEZERROS / CRIAS
   PADRÃO IDÊNTICO AOS CADASTROS DO SISTEMA
===================================================== */

const db = firebase.firestore();
const container = document.getElementById("config-conteudo");

/* HTML NO PADRÃO DOS CADASTROS */
container.innerHTML = `
  <div class="container">

    <label>Idade máxima da cria (meses)</label>
    <input type="number" id="idade_cria_meses" min="0">

    <label>Idade máxima do bezerro (meses)</label>
    <input type="number" id="idade_bezerro_meses" min="0">

    <div style="
      margin-top:14px;
      padding:14px;
      border:1px dashed #d0b485;
      border-radius:12px;
      background:#f6efe7
    ">
      <label>Título da tela</label>
      <input type="text" id="texto_titulo">

      <label>Mensagem quando não houver animais</label>
      <input type="text" id="texto_vazio">
    </div>

    <button class="salvar" onclick="salvarConfigBezerros()">
      💾 Salvar
    </button>

  </div>
`;

/* CAMPOS */
const idadeCriaInput    = document.getElementById("idade_cria_meses");
const idadeBezerroInput = document.getElementById("idade_bezerro_meses");
const textoTituloInput  = document.getElementById("texto_titulo");
const textoVazioInput   = document.getElementById("texto_vazio");

/* CARREGAR */
async function carregarConfigBezerros(){
  const snap = await db.collection("config").doc("bezerros").get();
  if(!snap.exists) return;

  const data = snap.data();

  idadeCriaInput.value    = data.idade_cria_meses ?? "";
  idadeBezerroInput.value = data.idade_bezerro_meses ?? "";
  textoTituloInput.value  = data.textos?.titulo ?? "";
  textoVazioInput.value   = data.textos?.vazio ?? "";
}

/* SALVAR */
async function salvarConfigBezerros(){
  const idadeCria = Number(idadeCriaInput.value);
  const idadeBez  = Number(idadeBezerroInput.value);

  if(isNaN(idadeCria) || isNaN(idadeBez)){
    alert("Informe valores numéricos válidos.");
    return;
  }

  await db.collection("config").doc("bezerros").update({
    idade_cria_meses: idadeCria,
    idade_bezerro_meses: idadeBez,
    textos:{
      titulo: textoTituloInput.value.trim(),
      vazio: textoVazioInput.value.trim()
    }
  });

  alert("Configuração de Bezerros salva com sucesso.");
}

/* INIT */
carregarConfigBezerros();
