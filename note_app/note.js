const addBox = document.querySelector(".add-box");
popupBox = document.querySelector(".popup-box");
closeIcon = popupBox.querySelector("header i");
titleTag = popupBox.querySelector("input");
descTag = popupBox.querySelector("textarea");
addBtn = popupBox.querySelector("button");

const months = ["January", "Feburary", "Mearch", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// getting localstorage notes if exist and parsing them
// to js object else passing a empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
});

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
    titleTag.value = "";
    descTag.value = "";
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach(note => {
        let liTag = `<li class="note">
       <div class="details">
           <p>${note.title}</p>
           <span>${note.description}</span>
       </div>
       <div class="bottom-content">
           <span>${note.date}</span>
           <div class="settings">
             <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
           </div>
       </div>
   </li>`;
   addBox.insertAdjacentHTML("afterend",liTag);
    });
}
showNotes();

function showMenu(elem){
    console.log(elem.parentElement.add("show"));
}
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;
    if (noteTitle || noteDesc) {
        let dateObj = new Date()
        month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        notes.push(noteInfo)//adding new note to notes
        // saving notes to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }

});