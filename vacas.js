console.log("vacas.js carregado");

// =========================
// DADOS DE TESTE
// =========================
const vacas = [
  {
    nome: "BONECA",
    raca: "JERSOLANDO",
    touro: "BANGUELA",
    prenhaDesde: "2025-04-20",
    criaPrevista: "2026-01-20"
  },
  {
    nome: "CACHOEIRA",
    raca: "GIROLANDO",
    touro: "FERDINANDO",
    prenhaDesde: "2025-08-02",
    criaPrevista: "2026-05-02"
  }
];

// =========================
// FORMATA DATA
// =========================
function formatarData(data) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// =========================
// RENDERIZA
// =========================
function renderizarVacas() {
  const tbody = document.getElementById("tabela-vacas");

  if (!tbody) {
    console.error("tbody tabela-vacas não encontrado");
    return;
  }

  tbody.innerHTML = "";

  vacas.forEach(vaca => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${vaca.nome}</td>
      <td>${vaca.raca}</td>
      <td>${vaca.touro}</td>
      <td>${formatarData(vaca.prenhaDesde)}</td>
      <td>${formatarData(vaca.criaPrevista)}</td>
      <td>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// =========================
// INICIALIZA
// =========================
document.addEventListener("DOMContentLoaded", renderizarVacas);
