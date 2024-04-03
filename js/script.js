/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note'); // Botão para adicionar nota
let closeModal = document.querySelector('#close-modal'); // Fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); // Modal para edição das notas
let modalView = document.querySelector('#modal-view'); // Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes'); // Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); // Ícone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); // Ícone para fechar modal de edição de nota.
const btnEditNote = document.querySelector("#btn-edit-note");
const btnDeleteNote = document.querySelector("#btn-delete-note");

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    notes.style.display = "none";
    modal.style.display = "block";
    addNote.style.display = "none";
});

btnCloseNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    notes.style.display = "flex";
    modal.style.display = "none";
    addNote.style.display = "block";
    resetInputs();
    listNotes();
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

btnDeleteNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    const noteId = document.querySelector('#input-id').value;
    deleteNoteDetails(parseInt(noteId));
});

const saveNote = (note) => {
    let notesList = loadNotes();
    note.lastTime = new Date().getTime();
    if (note.id.length > 0) {
        note.id = parseInt(note.id);
        notesList.forEach((item, i) => {
            if (item.id == note.id) {
                notesList[i] = note;
            }
        });
    } else {
        note.id = new Date().getTime();
        document.querySelector('#input-id').value = note.id;
        notesList.push(note);
    }
    localStorage.setItem('notes', JSON.stringify(notesList));
    listNotes();
};

const loadNotes = () => {
    let notesList = localStorage.getItem('notes');
    return notesList ? JSON.parse(notesList) : [];
};

const listNotes = () => {
    let listNotes = loadNotes();
    notes.innerHTML = "";
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
        const pLastTime = document.createElement('p');
        pLastTime.innerText = "Última alteração: " + new Date(item.lastTime).toLocaleDateString('pt-BR') + " " + new Date(item.lastTime).toLocaleTimeString('pt-BR');
        divCardBody.appendChild(h1);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);

        divCard.appendChild(divCardBody);
        notes.appendChild(divCard);

        divCard.addEventListener("click", (evt) => {
            evt.preventDefault();
            showNoteDetails(item);
        });
    });
};

const showNoteDetails = (note) => {
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";
    document.querySelector('#content-note').innerHTML = "<p>" + note.content + "</p>";

    const lastEdited = document.createElement('p');
    lastEdited.innerText = "Última edição: " + new Date(note.lastTime).toLocaleString();
    document.querySelector('#content-note').appendChild(lastEdited);

    const controlsNote = document.querySelector('#controls-note');
    controlsNote.innerHTML = "";

    const editButton = document.createElement('button');
    editButton.innerText = "Editar";
    editButton.addEventListener("click", () => editNoteDetails(note));
    controlsNote.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Excluir";
    deleteButton.addEventListener("click", () => deleteNoteDetails(note.id));
    controlsNote.appendChild(deleteButton);
};

const editNoteDetails = (note) => {
    notes.style.display = 'none';
    modal.style.display = 'block';
    modalView.style.display = 'none';

    document.querySelector('#input-id').value = note.id;
    document.querySelector('#input-title').value = note.title;
    document.querySelector('#input-content').value = note.content;
};

btnEditNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    const noteId = document.querySelector('#input-id').value;
    editNoteDetails(parseInt(noteId));
});

const deleteNoteDetails = (noteId) => {
    let notesList = loadNotes();
    notesList = notesList.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notesList));
    notes.style.display = 'flex';
    modalView.style.display = 'none';
    addNote.style.display = 'block';
    listNotes();
};

const resetInputs = () => {
    document.querySelector('#input-id').value = "";
    document.querySelector('#input-title').value = "";
    document.querySelector('#input-content').value = "";
};

listNotes();
