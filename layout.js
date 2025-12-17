/* ===============================
   LAYOUT GLOBAL + CONTROLE ADM
   =============================== */

/* Verifica se está logado como administrador */
function isAdmin() {
  return localStorage.getItem("adminLogado") === "true";
}

/* Cabeçalho + menu padrão */
function renderLayout() {
  const header = document.createElement("header");

  header.innerHTML = `
    <h1>Sítio Córrego do Pinhal</h1>
    <nav>
      <a href="index.html">Início</a>
      <a href="vacas.html">Vacas</a>
      <a href="historico.html">Histórico</a>
      <a href="bezerros.html">Bezerros</a>
      <a href="vacinas.html">Vacinas</a>
      <a href="animais.html">Animais</a>
      ${isAdmin() ? `<a href="crias.html">Crias</a><a href="#" id="logout">Sair</a>` 
                 : `<a href="#" id="login">Administrador</a>`}
    </nav>
  `;

  document.body.prepend(header);

  if (isAdmin()) {
    const logout = document.getElementById("logout");
    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.removeItem("adminLogado");
        location.reload();
      });
    }
  } else {
    const login = document.getElementById("login");
    if (login) {
      login.addEventListener("click", () => {
        const senha = prompt("Digite a senha do administrador:");
        if (senha === "1234") {
          localStorage.setItem("adminLogado", "true");
          location.reload();
        } else {
          alert("Senha incorreta");
        }
      });
    }
  }
}

/* Garante que cada página tenha <main> */
function ensureMain() {
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    while (document.body.children.length > 1) {
      main.appendChild(document.body.children[1]);
    }
    document.body.appendChild(main);
  }
}

/* Inicialização */
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  ensureMain();
});
