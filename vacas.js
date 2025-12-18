let vacas = [
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

let ordemAsc = true;
let colunaAtual = null;

function formatarData(data) {
  if (!data) return "";
  const [a, m, d] = data.split("-");
  return `${d}/${m}/${a}`;
}

function renderizar() {
  const tbody = document.getElementById("tabela-vacas");
  tbody.innerHTML = "";

  vacas.forEach((vaca, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${vaca.nome}</td>
      <td>${vaca.raca}</td>
      <td>${vaca.touro}</td>
      <td>${formatarData(vaca.prenhaDesde)}</td>
      <td>${formatarData(vaca.criaPrevista)}</td>
      <td>
        <button class="editar" onclick="editarVaca(${index})">Editar</button>
        <button class="excluir" onclick="excluirVaca(${index})">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function ordenar(coluna) {
  if (colunaAtual === coluna) {
    ordemAsc = !ordemAsc;
  } else {
    ordemAsc = true;
    colunaAtual = coluna;
  }

  vacas.sort((a, b) => {
    if (a[coluna] < b[coluna]) return ordemAsc ? -1 : 1;
    if (a[coluna] > b[coluna]) return ordemAsc ? 1 : -1;
    return 0;
  });

  renderizar();
}

function adicionarVaca() {
  const nome = prompt("Nome da vaca:");
  if (!nome) return;

  vacas.push({
    nome,
    raca: prompt("Raça:"),
    touro: prompt("Touro:"),
    prenhaDesde: prompt("Prenha desde (AAAA-MM-DD):"),
    criaPrevista: prompt("Cria prevista (AAAA-MM-DD):")
  });

  renderizar();
}

function editarVaca(index) {
  const v = vacas[index];

  v.nome = prompt("Nome:", v.nome);
  v.raca = prompt("Raça:", v.raca);
  v.touro = prompt("Touro:", v.touro);
  v.prenhaDesde = prompt("Prenha desde:", v.prenhaDesde);
  v.criaPrevista = prompt("Cria prevista:", v.criaPrevista);

  renderizar();
}

function excluirVaca(index) {
  if (confirm("Deseja excluir esta vaca?")) {
    vacas.splice(index, 1);
    renderizar();
  }
}

document.addEventListener("DOMContentLoaded", renderizar);
