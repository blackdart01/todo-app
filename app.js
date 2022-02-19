let addBtn = document.getElementById("addBtn");

showNotes();

addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (addTxt.value.length < 4)
        alert("Note is too small");
    else {
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        showNotes();
    }
});

function showNotes() {
    let hiden = document.getElementById('hiden');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        hiden.style.display = "none";
        notesObj = [];
    }
    else {
        hiden.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
        notesObj = JSON.parse(notes)
    }
    let content = '';
    notesObj.forEach(function (e, index) {
        let addTxtValue = lengthyNote(e);
        content += `<div class="cardtextWrapper">
        <a href="#" onclick="editNote(${index})" id="x" class="cardtext">${addTxtValue}</a>
        <input type="checkbox" onclick="getCheckbox(${index})"  name="chkbox" id="chkbox${index}">
        </div>`;
        let notesElement = document.getElementById("notes");
        if (notesObj.length != 0) {
            notesElement.innerHTML = content;
            hiden.style.display = "none";
        }
        else {
            notesElement.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;

        }
    });
}

function getCheckbox(index) {
    let boxN = document.getElementById(`chkbox${index}`);
    if (boxN.checked == true) {
        setTimeout(() => {
            let notes = localStorage.getItem("notes");
            if (notes == null) {
                notesObj = [];
            }
            else {
                notesObj = JSON.parse(notes)
            }
            let boolval = confirm("Are you sure you want to delete the note");
            if (boolval === true) {
                notesObj.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notesObj));
                showNotes();
            }
            else {
                boxN.checked = false;
            }
        }, 150);
    }
}

function lengthyNote(addTxtValue) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    if (addTxtValue.length > 50) {
        // let newElement = document.createElement('a');
        // newElement.href = '#';
        // newElement.value = "[Read More]"
        // document.appendChild(newElement);
        addTxtValue = addTxtValue.substring(0, 15) + '...';
    }
    return addTxtValue;
}

function editNote(index) {
    // let x = document.getElementById('x');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let newNoteValue = prompt(`Your Notes is:
${notesObj[index]}.
Enter the new note below.`);
    let notesElement = document.getElementById("notes");
    if (notesObj.length != 0 && newNoteValue.length != 0) {
        notesElement.innerHTML = newNoteValue;
        notesObj.push(newNoteValue);
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
    else if (newNoteValue.length == 0)
        alert("Empty Note cannot be added");
}

// localStorage.clear();