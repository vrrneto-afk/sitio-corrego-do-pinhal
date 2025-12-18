import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vacasRef = collection(db, "vacas");
const tbody = document.getElementById("tbodyVacas");
const formAdd = document.getElementById("formAdd");

onSnapshot(vacasRef, (snapshot) => {
  tbody.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const v = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.nome}</td>
      <td>${v.raca}</td>
      <td>${v.touro}</td>
      <td>${v.prenhaDesde}</td>
      <td>${v.criaPrevista}</td>
      <td>
        <button data-id="${docSnap.id}" class="editar">Editar</button>
        <button data-id="${docSnap.id}" class="excluir">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
});

formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formAdd).entries());
  await addDoc(vacasRef, data);
  formAdd.reset();
});

tbody.addEventListener("click", async (e) => {
  const id = e.target.getAttribute("data-id");
  if (!id) return;

  if (e.target.classList.contains("excluir")) {
    await deleteDoc(doc(db, "vacas", id));
  }

  if (e.target.classList.contains("editar")) {
    const nome = prompt("Nome:");
    const raca = prompt("Raça:");
    const touro = prompt("Touro:");
    const prenhaDesde = prompt("Prenha desde (YYYY-MM-DD):");
    const criaPrevista = prompt("Cria prevista (YYYY-MM-DD):");
    await updateDoc(doc(db, "vacas", id), { nome, raca, touro, prenhaDesde, criaPrevista });
  }
});
