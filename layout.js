// ===== CONTROLE DE LOGIN =====
function isAdmin() {
  return localStorage.getItem("admin") === "true";
}

function loginAdmin() {
  const senha = prompt("Digite a senha do administrador:");
  if (senha === "admin123") {
    localStorage.setItem("admin", "true");
    location.reload();
  } else {
    alert("Senha incorreta.");
  }
}

function logoutAdmin() {
  localStorage.removeItem("admin");
  location.reload();
}

// ===== MONTA LAYOUT PADRÃO =====
function renderLayout(tituloPagina) {
  const root = document.getElementById("app");

  root.innerHTML = `
    <header>
      <h1>Sítio Córrego do Pinhal</h1>
    </header>

    <nav>
      <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="vacas.html">Vacas</a></li>
        <li><a href="historico.html">Histórico</a></li>
        <li><a href="bezerros.html">Bezerros</a></li>
        <li><a href="vacinas.html">Vacinas</a></li>
        <li><a href="animais.html">Animais</a></li>
        ${
          isAdmin()
            ? `<li><a href="crias.html">Crias</a></li>
               <li><a href="#" onclick="logoutAdmin()">Sair</a></li>`
            : `<li><a href="#" onclick="loginAdmin()">Administrador</a></li>`
        }
      </ul>
    </nav>

    <div class="container">
      <h2>${tituloPagina}</h2>
      <div id="conteudo"></div>
    </div>
  `;
}
