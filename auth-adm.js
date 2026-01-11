// auth-adm.js
// Funções comuns de autenticação para área administrativa

(function () {
  // Garante que o Firebase Auth exista
  function getAuth() {
    if (!firebase || !firebase.auth) {
      console.error("Firebase Auth não disponível.");
      return null;
    }
    return firebase.auth();
  }

  // Logout padrão do ADM
  window.logout = function () {
    const auth = getAuth();
    if (!auth) return;

    auth.signOut()
      .then(() => {
        // Sempre volta para a tela inicial/login
        window.location.href = "index.html";
      })
      .catch(err => {
        console.error("Erro ao fazer logout:", err);
        alert("Erro ao sair. Tente novamente.");
      });
  };
})();
