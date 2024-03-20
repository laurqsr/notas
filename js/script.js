/**
 * ===================== PRINCIPAIS OBJETOS  =======================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

/**
 * =========================EVENTOS================================s
 */

addNote.addEventListener("click", (evt)=>{
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
});

btnSaveNote.addEventListener("click", (evt)=>{
  evt.preventDefault();
  let data = {
    id: document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value,

  };

  saveNote(data);

});

/**===============================FUNÇÕES========================== */

const saveNote = (note) => {
  let notes =loadNotes();

  note.lastTime = new Date().getTime();
  console.log(note.lastTime);
  if(note.id.length > 0){

  }else{
    note.id = new Date().getTime();
  }
  notes.push(note);

  notes = JSON.stringify(notes);
  localStorage.setItem('notes', notes);
};

const loadNotes = () => {
  let notes = localStorage.getItem('notes');

  if(!notes){
    notes = [];
  }
  else{
    notes = JSON.parse(notes);
  }

  return notes;
}

const listNotes = () => {
  let listNotes = localStorage.getItem('notes');
  listNotes = JSON.parse(listNotes);
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
    plastTime.innerText = "Ultima alteração: "+lastTime;

    divCardBody.appendChild(h1);
    divCardBody.appendChild(pContent);
    divCardBody.appendChild(plastTime);

    divCard.appendChild(divCardBody);
    notes.appendChild(divCard);
    divCard.addEventListener("click", (evt) =>{
      evt.preventDefault();
      showNote(item);
    });
  });
};

const showNote = (note) => {
  notes.style.display ='none';
  addNote.style.display ='none';
  modalView.style.display = 'block';
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
   
  document.querySelector('#content-note')
  .appendChild(document.createElement('p')
  .appendChild(document.createTextNode(note.content)));

  document.querySelector('#content-note')
  .appendChild(document.createElement('p')
  .appendChild(document.createTextNode(
    new Date(note.lastTime).toLocaleDateString('pt-BR'))));
}

listNotes ();