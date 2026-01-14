// auth-adm.js — utilidades ADM (SEM GUARD)

(function () {

  const auth = firebase.auth();

  // ❌ REMOVIDO auth.onAuthStateChanged daqui
  // Guard deve existir em APENAS UM lugar (auth-guard.js)

  // Logout global
  window.logout = function () {
    auth.signOut().then(() => {
      window.location.replace("login.html");
    });
  };

})();
