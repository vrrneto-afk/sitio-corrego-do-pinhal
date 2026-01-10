// auth-guard.js

// Firebase Auth (compat)
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCW-CuFDrOLO-dteckl_GrPTocmyS-IrzY",
    authDomain: "sitio-corrego-do-pinhal.firebaseapp.com",
    projectId: "sitio-corrego-do-pinhal"
  });
}

const auth = firebase.auth();

/*
 🔐 REGRA DE SEGURANÇA
 - Se NÃO estiver logado → redireciona para login.html
 - Se estiver logado → libera a página
*/
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.replace("login.html");
  }
});

/*
 🚪 FUNÇÃO DE LOGOUT
 Pode ser chamada de qualquer botão/menu ADM
*/
function logout() {
  auth.signOut().then(() => {
    window.location.replace("login.html");
  });
}
