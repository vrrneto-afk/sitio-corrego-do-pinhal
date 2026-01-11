// auth-adm.js — controle central de autenticação ADM

(function(){

  const auth = firebase.auth();

  auth.onAuthStateChanged(user=>{
    document.body.style.display = "block";

    if(user){
      const app = document.getElementById("app");
      if(app) app.classList.remove("hidden");
    }else{
      // Se não estiver logado, volta para o login
      window.location.href = "index.html";
    }
  });

  // Logout global (usado pelo menu)
  window.logout = function(){
    auth.signOut().then(()=>{
      window.location.href = "index.html";
    });
  };

})();
