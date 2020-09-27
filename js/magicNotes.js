// for menu function in navbar
function myFunction() {

    let menu = document.getElementById('myTopnav');
    if (menu.className === "navbar") {
        menu.className += " responsive";
    }
    else {
        menu.className = "navbar";
    }
}

showNotes();
// js code to add notes in localStorage when user click on add Note button 

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if(addTxt.value != ""){
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    }
    else {
        alert("It seems you didn't write anything in Add a Note Section!! ");
    }
    showNotes();
})

// function to show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="innerContent">
                    <b> Note: ${index + 1}</b>
                    <p id="${index}"  class="myList" onclick = "detailContent(this.id)"> ${element} </p>
                    <button id="${index}" onclick = "deleteNote(this.id) " class="dltbtn">Delete Note</button>
                </div> `;

    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value;
    let notesCards = document.getElementsByClassName("innerContent");

    Array.from(notesCards).forEach(function (element) {

        let cardText = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardText,inputVal);
        if (cardText.includes(inputVal)) {
            element.style.display = "grid";
        }
        else {
            element.style.display = "none";

        }
    })
})

//detailed content on click
function detailContent(index) { 
    let div = document.getElementById("notes");
    //for note 1 ,note 2 ...note[index]
    let y = div.getElementsByTagName("b")[index].innerText;
    let note = document.getElementById("note");
    note.innerText = y;
    //this will fetch the content and put it in modal
    let x= div.getElementsByTagName("p").item(index).innerText;
    let para = document.getElementById("modalP");
    para.innerText = x;
    //modal
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
