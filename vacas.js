// =========================
// DADOS DE TESTE (SIMBÓLICOS)
// =========================
const dados = {
  vacas: [
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
  ]
};

// =========================
// FORMATAÇÃO DE DATA
// =========================
function formatarData(dataISO) {
  if (!dataISO || typeof dataISO !== "string") return "";

  const partes = dataISO.split("-");
  if (partes.length !== 3) return dataISO;

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

// =========================
// RENDERIZAÇÃO DA TABELA
// =========================
function renderizarTabela() {
  const corpo = document.getElementById("tabela-vacas");
  corpo.innerHTML = "";

  dados.vacas.forEach(vaca => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${vaca.nome}</td>
      <td>${vaca.raca}</td>
      <td>${vaca.touro}</td>
      <td>${formatarData(vaca.prenhaDesde)}</td>
      <td>${formatarData(vaca.criaPrevista)}</td>
      <td>
        <button class="editar" onclick="editarVaca('${vaca.nome}')">Editar</button>
        <button class="excluir" onclick="excluirVaca('${vaca.nome}')">Excluir</button>
      </td>
    `;

    corpo.appendChild(tr);
  });
}

// =========================
// ORDENAÇÃO
// =========================
let ordemNomeAsc = true;

function ordenarPorNome() {
  dados.vacas.sort((a, b) => {
    if (a.nome < b.nome) return ordemNomeAsc ? -1 : 1;
    if (a.nome > b.nome) return ordemNomeAsc ? 1 : -1;
    return 0;
  });

  ordemNomeAsc = !ordemNomeAsc;
  renderizarTabela();
}

// =========================
// AÇÕES (SIMULADAS)
// =========================
function editarVaca(nome) {
  alert("Editar vaca: " + nome);
}

function excluirVaca(nome) {
  if (confirm("Deseja excluir a vaca " + nome + "?")) {
    alert("Exclusão simulada (ainda não salva)");
  }
}

// =========================
// INICIALIZAÇÃO
// =========================
document.addEventListener("DOMContentLoaded", renderizarTabela);
