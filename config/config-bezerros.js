/* =====================================================
   CONFIG – BEZERROS / CRIAS
   Compatível 100% com o CSS original do sistema
===================================================== */

/* 🔥 FIREBASE */
const db = firebase.firestore();

/* 📌 CONTAINER PRINCIPAL */
const container = document.getElementById("config-conteudo");

/* 🎨 HTML (SOMENTE CLASSES JÁ EXISTENTES NO CSS) */
container.innerHTML = `
  <div class="container">

    <label>Idade máxima da cria (meses)</label>
    <input type="number" id="idade_cria_meses" min="0">

    <label>Idade máxima do bezerro (meses)</label>
    <input type="number" id="idade_bezerro_meses" min="0">

    <div style="
      margin-top:16px;
      padding:14px;
      border:1px dashed #d0b485;
      border-radius:10px;
      background:#f6efe7
    ">
      <strong style="display:block;margin-bottom:10px">
        Textos exibidos na tela
      </strong>

      <label>Título da tela</label>
      <input type="text" id="texto_titulo">

      <label>Mensagem quando não houver animais</label>
      <input type="text" id="texto_vazio">
    </div>

    <button class="salvar" style="margin-top:16px" onclick="salvarConfigBezerros()">
      💾 Salvar
    </button>

  </div>
`;

/* 🔹 CAMPOS */
const idadeCriaInput    = document.getElementById("idade_cria_meses");
const idadeBezerroInput = document.getElementById("idade_bezerro_meses");
const textoTituloInput  = document.getElementById("texto_titulo");
const textoVazioInput   = document.getElementById("texto_vazio");

/* 🔄 CARREGAR DADOS */
async function carregarConfigBezerros(){
  try{
    const snap = await db.collection("config").doc("bezerros").get();

    if(!snap.exists){
      alert("Configuração de Bezerros não encontrada.");
      return;
    }

    const data = snap.data();

    idadeCriaInput.value    = data.idade_cria_meses ?? "";
    idadeBezerroInput.value = data.idade_bezerro_meses ?? "";

    textoTituloInput.value  = data.textos?.titulo ?? "";
    textoVazioInput.value   = data.textos?.vazio ?? "";

  }catch(e){
    console.error(e);
    alert("Erro ao carregar configuração de Bezerros.");
  }
}

/* 💾 SALVAR */
async function salvarConfigBezerros(){

  const idadeCria    = Number(idadeCriaInput.value);
  const idadeBezerro = Number(idadeBezerroInput.value);

  if(isNaN(idadeCria) || isNaN(idadeBezerro)){
    alert("Informe valores numéricos válidos.");
    return;
  }

  const dados = {
    idade_cria_meses: idadeCria,
    idade_bezerro_meses: idadeBezerro,
    textos:{
      titulo: textoTituloInput.value.trim(),
      vazio: textoVazioInput.value.trim()
    }
  };

  try{
    await db.collection("config").doc("bezerros").update(dados);
    alert("Configuração de Bezerros salva com sucesso.");
  }catch(e){
    console.error(e);
    alert("Erro ao salvar configuração.");
  }
}

/* 🚀 INIT */
carregarConfigBezerros();
