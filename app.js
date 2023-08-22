class App {
  constructor() {
    this.notes = [];
    this.title = "";
    this.text = "";
    this.id = "";
    this.$placeHolder = document.querySelector("#placeholder");
    this.$notes = document.querySelector("#notes");
    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    this.$formCloseButtons = document.querySelector("#form-close-button");
    this.$modal = document.querySelector(".modal");
    this.$modalTitle = document.querySelector(".modal-title");
    this.$modalText = document.querySelector(".modal-text");
    this.$modalCloseButton = document.querySelector(".modal-close-button");

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (e) => {
      this.handleFormClick(e);
      this.selectNote(e);
      this.openModal(e);
    });
    // adding note
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      // checking if we have a title or a text
      const hasNote = title || text;
      if (hasNote) {
        this.addNote({
          title,
          text,
        });
      }
    });
    this.$formCloseButtons.addEventListener("click", (e) => {
      // stop bubbling
      e.stopPropagation();

      this.closeForm();
    });
    this.$modalCloseButton.addEventListener("click", (e) => {
      this.closeModal(e);
    });
  }

  handleFormClick(e) {
    const isFormClicked = this.$form.contains(e.target);

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    // checking if we have a title or a text
    const hasNote = title || text;
    if (isFormClicked) {
      // open
      this.openForm();
    } else if (hasNote) {
      this.addNote({ title, text });
    } else {
      //close
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add("form-open");
    this.$noteTitle.style.display = "block";
    this.$formButtons.style.display = "block";
  }

  closeForm() {
    this.$form.classList.remove("form-open");
    this.$noteTitle.style.display = "none";
    this.$formButtons.style.display = "none";
    this.$noteText.value = "";
    this.$noteTitle.value = "";
  }

  openModal(e) {
    if (e.target.closest(".note")) {
      this.$modal.classList.toggle("open-modal");
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }
  }
  closeModal(e) {
    this.editNote();
    this.$modal.classList.toggle("open-modal");
  }

  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };
    this.notes = [...this.notes, newNote];
    this.displayNotes();
    this.closeForm();
  }
  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...this.notes, title, text } : note
    );
    this.displayNotes();
  }
  selectNote(e) {
    const $selectedNote = e.target.closest(".note");
    if (!$selectedNote) return;
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;
  }
  displayNotes() {
    // check if notes exist
    const hasNotes = this.notes.length > 0;
    this.$placeHolder.style.display = hasNotes ? "none" : "flex";
    // iterate

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
    <div style="background: ${note.color};" class="note" data-id="${note.id}">
      <div class="${note.title && "note-title"}>${note.title}</div>
      <div class="note-text">${note.text}</div>
      <div class="toolbar-container">
        <div class="toolbar">
          <img class="toolbar-color" src="https://icon.now.sh/palette"/>
          <img class="toolbar-delete" src="https://icon.now.sh/delete"/>
        </div>
      </div>
    </div>
   `
      )
      .join("");
  }
}
new App();
