/* =====================================================
   CONFIG – BEZERROS / CRIAS
   Padrão visual e estrutural do sistema
===================================================== */

/* 🔥 FIREBASE (usa instância já inicializada no config.html) */
const db = firebase.firestore();

/* 📌 ELEMENTO ONDE O CONTEÚDO SERÁ RENDERIZADO */
const container = document.getElementById("config-conteudo");

/* 🎨 HTML DA TELA */
container.innerHTML = `
  <div class="container">

    <label>Idade máxima da cria (meses)</label>
    <input type="number" id="idade_cria_meses" min="0">

    <label>Idade máxima do bezerro (meses)</label>
    <input type="number" id="idade_bezerro_meses" min="0">

    <div style="
      margin-top:18px;
      padding:14px;
      border:1px dashed #ccc;
      border-radius:10px;
      background:#fafafa
    ">
      <strong style="display:block;margin-bottom:10px">
        Textos exibidos na tela
      </strong>

      <label>Título da tela</label>
      <input type="text" id="texto_titulo">

      <label>Mensagem quando não houver animais</label>
      <input type="text" id="texto_vazio">
    </div>

    <button class="salvar" onclick="salvarConfigBezerros()">💾 Salvar</button>

  </div>
`;

/* 🔹 REFERÊNCIAS DOS CAMPOS */
const idadeCriaInput = document.getElementById("idade_cria_meses");
const idadeBezerroInput = document.getElementById("idade_bezerro_meses");
const textoTituloInput = document.getElementById("texto_titulo");
const textoVazioInput = document.getElementById("texto_vazio");

/* 🔄 CARREGAR DADOS DO FIRESTORE */
async function carregarConfigBezerros(){
  const snap = await db.collection("config").doc("bezerros").get();

  if(!snap.exists){
    alert("Configuração de bezerros não encontrada.");
    return;
  }

  const data = snap.data();

  idadeCriaInput.value = data.idade_cria_meses ?? "";
  idadeBezerroInput.value = data.idade_bezerro_meses ?? "";

  textoTituloInput.value = data.textos?.titulo ?? "";
  textoVazioInput.value = data.textos?.vazio ?? "";
}

/* 💾 SALVAR CONFIGURAÇÃO */
async function salvarConfigBezerros(){

  const dados = {
    idade_cria_meses: Number(idadeCriaInput.value),
    idade_bezerro_meses: Number(idadeBezerroInput.value),
    textos: {
      titulo: textoTituloInput.value.trim(),
      vazio: textoVazioInput.value.trim()
    }
  };

  /* 🔒 VALIDAÇÃO BÁSICA */
  if(
    isNaN(dados.idade_cria_meses) ||
    isNaN(dados.idade_bezerro_meses)
  ){
    alert("Informe valores numéricos válidos para as idades.");
    return;
  }

  await db.collection("config").doc("bezerros").update(dados);

  alert("Configuração de Bezerros salva com sucesso.");
}

/* 🚀 INIT */
carregarConfigBezerros();
