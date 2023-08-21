class App {
  constructor() {
    this.notes = [];
    this.$placeHolder = document.querySelector("#placeholder");
    this.$notes = document.querySelector("#notes");
    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    this.$formCloseButtons = document.querySelector("#form-close-button");

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (e) => {
      this.handleFormClick(e);
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
    // this.
  }

  handleFormClick(e) {
    const isFormClicked = this.$form.contains(e.target);

    if (isFormClicked) {
      // open
      this.openForm();
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
    this.$noteText.value = " ";
    this.$noteTitle.value = " ";
  }

  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };
    this.notes = [...this.notes, newNote];
    this.displayNotes();
    this.closeForm();
  }
  displayNotes() {
    // check if notes exist
    const hasNotes = this.notes.length > 0;
    this.$placeHolder.style.display = hasNotes ? "none" : "flex";
    // iterate

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
    <div style="background: ${note.color};" class="note">
      <div class="${note.title && "note-title"}>${note.title}</div>
      <div class="note-text">${note.text}</div>
      <div class="toolbar-container">
        <div class="toolbar">
          <img class="toolbar-color" src="https://icon.now.sh/palette">
          <img class="toolbar-delete" src="https://icon.now.sh/delete">
        </div>
      </div>
    </div>
   `
      )
      .join("");
  }
}
new App();
