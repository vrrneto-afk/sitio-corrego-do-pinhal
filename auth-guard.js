// auth-guard.js — GUARDA CENTRAL DE AUTENTICAÇÃO

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
    authDomain: "sitio-corrego-do-pinhal.firebaseapp.com",
    projectId: "sitio-corrego-do-pinhal"
  });
}

const auth = firebase.auth();
const db = firebase.firestore();

/*
 🔐 REGRA CENTRAL DE ACESSO
 - Não logado → login.html
 - Logado mas sem perfil → bloqueia
 - Inativo → bloqueia
 - Papel sem permissão → bloqueia
*/

// 👉 CONFIGURAÇÃO POR PÁGINA
// Defina isso ANTES de carregar o auth-guard.js
// Exemplo: window.PERMISSAO_MINIMA = "admin";

auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  try {
    const uid = user.uid;
    const doc = await db.collection("usuarios").doc(uid).get();

    // Usuário não cadastrado no Firestore
    if (!doc.exists) {
      alert("Usuário sem perfil de acesso.");
      await auth.signOut();
      window.location.replace("login.html");
      return;
    }

    const perfil = doc.data();

    // Usuário inativo
    if (!perfil.ativo) {
      alert("Usuário desativado.");
      await auth.signOut();
      window.location.replace("login.html");
      return;
    }

    // Controle de papel (role)
    if (window.PERMISSAO_MINIMA) {
      const hierarquia = {
        admin: 3,
        operador: 2,
        leitura: 1
      };

      const papelUsuario = hierarquia[perfil.papel] || 0;
      const papelNecessario = hierarquia[window.PERMISSAO_MINIMA];

      if (papelUsuario < papelNecessario) {
        alert("Você não tem permissão para acessar esta página.");
        window.location.replace("index.html");
        return;
      }
    }

    // ✅ Se chegou aqui, está tudo certo
    console.log("Acesso liberado:", perfil.nome, perfil.papel);

  } catch (erro) {
    console.error("Erro no auth-guard:", erro);
    alert("Erro de autenticação.");
    window.location.replace("login.html");
  }
});
