const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const emptyState = document.querySelector("#empty-state");
const charCount = document.querySelector("#char-count");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-button");

const STORAGE_KEY = "quicknotes-notes-v1";

function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(savedNotes)
      ? savedNotes.filter((note) =>
          note &&
          typeof note.id === "string" &&
          typeof note.text === "string" &&
          typeof note.createdAt === "string" &&
          Object.prototype.hasOwnProperty.call(categoryNames, note.category)
        )
      : [];
  } catch (error) {
    console.warn("Saved notes could not be loaded.", error);
    return [];
  }
}

let notes = loadNotes();

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    errorMessage.textContent = "Your browser couldn't save notes. Check available storage space or privacy settings.";
    console.warn("Notes could not be saved.", error);
  }
}

const categoryNames = {
  personal: "Personal",
  work: "Work",
  study: "Study"
};

function updateCount(count) {
  if (count === 0) noteCount.textContent = "You have no notes yet.";
  else if (count === 1) noteCount.textContent = "You have 1 note.";
  else noteCount.textContent = `You have ${count} notes.`;
}

function renderNotes() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
  notesList.replaceChildren();

  filteredNotes.forEach((note) => {
    const item = document.createElement("li");
    item.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.textContent = note.text;

    const footer = document.createElement("div");
    footer.className = "note-card-footer";

    const pill = document.createElement("span");
    pill.className = `category-pill category-${note.category}`;
    pill.textContent = categoryNames[note.category];

    const date = document.createElement("time");
    date.className = "note-date";
    date.dateTime = note.createdAt;
    date.textContent = new Date(note.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "delete-button";
    removeButton.textContent = "Delete";
    removeButton.setAttribute("aria-label", `Delete note: ${note.text.slice(0, 45)}`);
    removeButton.addEventListener("click", () => deleteNote(note.id));

    footer.append(pill, date, removeButton);
    item.append(text, footer);
    notesList.append(item);
  });

  updateCount(notes.length);
  emptyState.hidden = filteredNotes.length > 0;
  if (notes.length > 0 && filteredNotes.length === 0) {
    emptyState.querySelector("h3").textContent = "No notes match your search.";
    emptyState.querySelector("p").textContent = "Try another word or clear the search field.";
  } else {
    emptyState.querySelector("h3").textContent = "Your next idea starts here";
    emptyState.querySelector("p").textContent = "Add your first note above. Little thoughts can lead to big things.";
  }
  clearAllButton.hidden = notes.length === 0;
}

function addNote(text, category) {
  notes.unshift({
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    category,
    createdAt: new Date().toISOString()
  });
  saveNotes();
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

noteInput.addEventListener("input", () => {
  charCount.textContent = `${noteInput.value.length}/200`;
  errorMessage.textContent = "";
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();
  if (!text) {
    errorMessage.textContent = "Please enter a note before saving.";
    noteInput.focus();
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Your note must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }
  addNote(text, noteCategory.value);
  noteForm.reset();
  charCount.textContent = "0/200";
  errorMessage.textContent = "";
  noteInput.focus();
});

searchInput.addEventListener("input", renderNotes);

clearAllButton.addEventListener("click", () => {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    renderNotes();
  }
});

renderNotes();
