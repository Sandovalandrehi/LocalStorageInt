document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.getElementById('addNoteBtn');
  const noteTitle = document.getElementById('noteTitle');
  const noteContent = document.getElementById('noteContent');
  const notesContainer = document.getElementById('notesContainer');

  // Recover notes from localStorage or initialize empty ones
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
      const div = document.createElement('div');
      div.classList.add('note');
      div.innerHTML = `
        <button class="delete-btn" data-index="${index}">✖</button>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      `;
      notesContainer.appendChild(div);
    });

    // Assign deletion events
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        notes.splice(idx, 1);
        saveNotes();
        renderNotes();
      });
    });
  }

  addNoteBtn.addEventListener('click', () => {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (title === '' || content === '') {
      alert('Please complete both fields');
      return;
    }

    notes.push({ title, content });
    saveNotes();
    renderNotes();

    noteTitle.value = '';
    noteContent.value = '';
  });

  // Initial render
  renderNotes();
});
