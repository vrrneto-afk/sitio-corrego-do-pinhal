// auth-guard.js — GUARDA CENTRAL DE AUTENTICAÇÃO

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
    authDomain: "sitio-corrego-do-pinhal.firebaseapp.com",
    projectId: "sitio-corrego-do-pinhal"
  });
}

const auth = firebase.auth();

/*
 🔐 REGRA CENTRAL
 - Não logado → login.html
 - Logado → libera a página
*/
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.replace("login.html");
  }
});
