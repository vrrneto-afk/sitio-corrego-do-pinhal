// auth-adm.js — autenticação central ADM

(function () {

  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });

  // Logout global
  window.logout = function () {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  };

})();
