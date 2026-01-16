// auth-guard.js — GUARDA CENTRAL DE AUTENTICAÇÃO (ESTÁVEL)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
    authDomain: "sitio-corrego-do-pinhal.firebaseapp.com",
    projectId: "sitio-corrego-do-pinhal"
  });
}

const auth = firebase.auth();
const db   = firebase.firestore();

/*
 🔐 REGRA CENTRAL DE ACESSO
 - Não logado → login.html
 - Logado sem perfil → bloqueia
 - Inativo → bloqueia
 - Papel sem permissão → bloqueia
*/

// ⚠️ IMPORTANTE
// Defina antes de carregar este script:
// window.PERMISSAO_MINIMA = "admin" | "operador" | "leitura"

auth.onAuthStateChanged(async user => {

  // ⛔ NÃO LOGADO
  if (!user) {
    location.replace("login.html");
    return;
  }

  try {
    const uid = user.uid;

    // 🔎 BUSCA PERFIL
    const snap = await db.collection("usuarios").doc(uid).get();

    // ❌ SEM PERFIL
    if (!snap.exists) {
      await auth.signOut();
      alert("Usuário sem perfil de acesso.");
      location.replace("login.html");
      return;
    }

    const perfil = snap.data();

    // ❌ INATIVO
    if (perfil.ativo !== true) {
      await auth.signOut();
      alert("Usuário desativado.");
      location.replace("login.html");
      return;
    }

    // 🔐 CONTROLE DE PAPEL
    if (window.PERMISSAO_MINIMA) {
      const hierarquia = {
        admin: 3,
        operador: 2,
        leitura: 1
      };

      const papelUsuario   = hierarquia[perfil.papel] || 0;
      const papelNecessario = hierarquia[window.PERMISSAO_MINIMA] || 0;

      if (papelUsuario < papelNecessario) {
        alert("Você não tem permissão para acessar esta página.");
        location.replace("index.html");
        return;
      }
    }

    // ✅ ACESSO LIBERADO
    console.log("Acesso liberado:", perfil.nome, perfil.papel);

  } catch (e) {
    console.error("Erro no auth-guard:", e);
    await auth.signOut();
    alert("Erro de autenticação.");
    location.replace("login.html");
  }
});
