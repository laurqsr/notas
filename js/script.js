/**
 * ===================== PRINCIPAIS OBJETOS  =======================
 */

let addNote = document.querySelector('#add-note'); // Botão para adicionar nota
let closeModal = document.querySelector('#close-modal'); // Fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); // Modal para edição das notas
let modalView = document.querySelector('#modal-view'); // Modal para exibição dos detalhes da nota
let notesContainer = document.querySelector('#notes'); // Lista divs com dados das notas

let btnSaveNote = document.querySelector("#btn-save-note"); // Botão para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); // Botão para fechar modal de edição de nota.

const btnEditNote = document.querySelector("#btn-edit-note");
const btnDeleteNote = document.querySelector("#btn-delete-note");

/**
 * ========================= EVENTOS ================================
 */

addNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  notesContainer.style.display = "none";
  modal.style.display = "block";
  addNote.style.display = "none";
});

btnCloseNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  notes.style.display = "none";
  modal.style.display = "none";
  addNote.style.display = "block";
});

btnSaveNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  let data = {
    id: document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value,
  };

  saveNote(data);
});

/** ============================== FUNÇÕES ========================== */

const saveNote = (note) => {
  let notes = loadNotes();

  note.lastTime = new Date().getTime();
  if (note.id.length > 0) {
    // Se a nota já tiver um ID, ela está sendo editada, então precisamos encontrar e atualizar a nota existente
    notes = notes.map(existingNote => {
      if (existingNote.id === note.id) {
        return note;
      } else {
        return existingNote;
      }
    });
  } else {
    note.id = new Date().getTime();
    notes.push(note);
  }

  notes = JSON.stringify(notes);
  localStorage.setItem('notes', notes);

  // Após salvar a nota, atualizar a lista de notas
  notesContainer.innerHTML = "";
  listNotes();
};

const loadNotes = () => {
  let notes = localStorage.getItem('notes');

  if (!notes) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  return notes;
}

const listNotes = () => {
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    const h1 = document.createElement('h1');
    h1.innerText = item.title;
    const pContent = document.createElement('p');
    pContent.innerText = item.content;
    const plastTime = document.createElement('p');
    let lastTime = new Date(item.lastTime).toLocaleDateString('pt-BR');
    plastTime.innerText = "Ultima alteração: " + lastTime;

    divCardBody.appendChild(h1);
    divCardBody.appendChild(pContent);
    divCardBody.appendChild(plastTime);

    divCard.appendChild(divCardBody);
    notesContainer.appendChild(divCard);
    divCard.addEventListener("click", (evt) => {
      evt.preventDefault();
      showNoteDetails(item);
    });
  });
};

const showNoteDetails = (note) => {
  notesContainer.style.display = 'none';
  addNote.style.display = 'none';
  modalView.style.display = 'block';
  document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";

  const contentNote = document.querySelector('#content-note');
  contentNote.innerHTML = ""; // Limpar o conteúdo antes de adicionar novos elementos

  contentNote.appendChild(document.createElement('p').appendChild(document.createTextNode(note.content)));

  const lastTimeNote = document.createElement('p');
  lastTimeNote.innerText = "Última alteração: " + new Date(note.lastTime).toLocaleDateString('pt-BR');
  contentNote.appendChild(lastTimeNote);

 
  const controlsNote = document.querySelector('#controls-note');
  controlsNote.innerHTML = "";

  const deleteButton = document.createElement('button');
  deleteButton.innerText = "Excluir";
  deleteButton.addEventListener("click", () => deleteNoteDetails(note.id));
  controlsNote.appendChild(deleteButton);
};



const deleteNoteDetails = (noteId) => {
  let notesList = loadNotes();
  notesList = notesList.filter(note => note.id !== noteId);
  localStorage.setItem('notes', JSON.stringify(notesList));

  notesContainer.innerHTML = "";
  listNotes();
}

listNotes();
