/* =====================================================
   CONFIG LOADER — CAMADA DE COMPATIBILIDADE
===================================================== */

let CONFIG_DB = null;

/* Carrega config do Firestore */
async function carregarConfigFirestore(db){
  try{
    const doc = await db.collection("config").doc("geral").get();
    if(doc.exists){
      CONFIG_DB = doc.data();
    }
  }catch(e){
    console.warn("Config Firestore indisponível, usando fallback.");
  }
}

/* Getter seguro (fallback automático) */
function getConfig(chave, fallback){
  return (CONFIG_DB && CONFIG_DB[chave] != null)
    ? CONFIG_DB[chave]
    : fallback;
}
