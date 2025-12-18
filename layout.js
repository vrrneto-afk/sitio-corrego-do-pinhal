document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="topo">
      <h1>Sítio Córrego do Pinhal</h1>
    </div>

    <nav class="menu">
      <a href="index.html">Início</a>
      <a href="vacas.html">Vacas</a>
      <a href="historico.html">Histórico</a>
      <a href="bezerros.html">Bezerros</a>
      <a href="vacinas.html">Vacinas</a>
      <a href="animais.html">Animais</a>
      <a href="crias.html">Crias</a>
    </nav>
  `;

  document.body.prepend(header);
});
