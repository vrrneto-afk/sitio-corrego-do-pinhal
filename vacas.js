const STORAGE_KEY = "vacas_prenhas";

let vacas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    nome: "BONECA",
    raca: "JERSOLANDO",
    touro: "BANGUELA",
    prenhez: "20/04/2025",
    parto: "20/01/2026"
  },
  {
    nome: "CACHOEIRA",
    raca: "GIROLANDO",
    touro: "FERDINANDO",
    prenhez: "02/08/2025",
    parto: "02/05/2026"
  }
];

let ordemAsc = true;
let colunaAtual = "";

function salvar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vacas));
}

function render() {
  const tbody = document.getElementById("tabelaVacas");
  tbody.innerHTML = "";

  vacas.forEach((vaca, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${vaca.nome}</td>
        <td>${vaca.raca}</td>
        <td>${vaca.touro}</td>
        <td>${vaca.prenhez}</td>
        <td>${vaca.parto}</td>
        <td class="actions">
          <button class="edit" onclick="editarVaca(${index})">Editar</button>
          <button class="delete" onclick="excluirVaca(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function adicionarVaca() {
  const nome = prompt("Nome da vaca:");
  if (!nome) return;

  const raca = prompt("Raça:");
  const touro = prompt("Touro:");
  const prenhez = prompt("Prenha desde (dd/mm/aaaa):");
  const parto = prompt("Cria prevista (dd/mm/aaaa):");

  vacas.push({ nome, raca, touro, prenhez, parto });
  salvar();
  render();
}

function editarVaca(index) {
  const v = vacas[index];

  v.nome = prompt("Nome:", v.nome);
  v.raca = prompt("Raça:", v.raca);
  v.touro = prompt("Touro:", v.touro);
  v.prenhez = prompt("Prenha desde:", v.prenhez);
  v.parto = prompt("Cria prevista:", v.parto);

  salvar();
  render();
}

function excluirVaca(index) {
  if (!confirm("Deseja excluir esta vaca?")) return;
  vacas.splice(index, 1);
  salvar();
  render();
}

function ordenar(coluna) {
  if (colunaAtual === coluna) ordemAsc = !ordemAsc;
  else ordemAsc = true;

  colunaAtual = coluna;

  vacas.sort((a, b) => {
    if (a[coluna] < b[coluna]) return ordemAsc ? -1 : 1;
    if (a[coluna] > b[coluna]) return ordemAsc ? 1 : -1;
    return 0;
  });

  render();
}

render();
