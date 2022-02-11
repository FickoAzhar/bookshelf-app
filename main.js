const storageKey = "STORAGE_KEY";

function addBook(even) {
    even.preventDefault();
    const texttitle = document.getElementById("inputBookTitle");
    const textauthor = document.getElementById("inputBookAuthor");
    const timestamp = document.getElementById("inputBookYear");
    const boxcheck = document.getElementById("inputBookIsComplete");
    
    const databook = {
        id: +new Date,
        title: texttitle.value,
        author: textauthor.value,
        year: timestamp.value,
        isComplete: boxcheck.checked
    };
    console.log(databook),
    userData.push(databook),
    document.dispatchEvent(new Event("bookListChanged"))
}
    

function addTaskToCompleted(element) {
    const getindex = Number(element.target.id);
    const findex = userData.findIndex((function(event) {
        return event.id === getindex
    }
    ));
    
    -1 !== findex && (userData[findex] = {
        ...userData[findex],
        isComplete: !0
    },
    document.dispatchEvent(new Event("bookListChanged")))
}


function undoTaskFromCompleted(element) {
    const getindex = Number(element.target.id);
    const findex = userData.findIndex((function(event) {
        return event.id === getindex
    }
    ));
    -1 !== findex && (userData[findex] = {
        ...userData[findex],
        isComplete: !1
    },
    document.dispatchEvent(new Event("bookListChanged")))
}


function deleted(element) {
    const getindex = Number(element.target.id);
    const findex = userData.findIndex((function(event) {
        return event.id === getindex
    }
    ));
    if (confirm("Yakin ingin menghapus buku?")) {
        -1 !== findex && (userData.splice(findex, 1),
        document.dispatchEvent(new Event("bookListChanged")))
    }
}


function renderUserList() {
    const listuncomplete = document.querySelector("#incompleteBookshelfList");
    const listcomplete = document.querySelector("#completeBookshelfList");
    listuncomplete.innerHTML = "",
    listcomplete.innerHTML = "";
    
    for (const book of userData) {
        const newarticle = document.createElement("article");
        newarticle.classList.add("book_item");
        
        const elementtitle = document.createElement("h2");
        elementtitle.innerText = book.title;
            
        const elementauthor = document.createElement("p");
        elementauthor.innerText = "Penulis: " + book.author;
            
        const timestamp = document.createElement("p");
        if (timestamp.innerText = "Tahun: " + book.year,
            newarticle.appendChild(elementtitle),
            newarticle.appendChild(elementauthor),
            newarticle.appendChild(timestamp),
            book.isComplete) {
                const ndiv = document.createElement("div");
                ndiv.classList.add("action");
                const buttontnyet = document.createElement("button");
                buttontnyet.id = book.id,
                buttontnyet.innerText = "Belum Selesai dibaca",
                buttontnyet.classList.add("green"),
                buttontnyet.addEventListener("click", undoTaskFromCompleted);
                const buttondel = document.createElement("button");
                buttondel.id = book.id,
                buttondel.innerText = "Hapus buku",
                buttondel.classList.add("red"),
                buttondel.addEventListener("click", deleted),
                ndiv.appendChild(buttontnyet),
                ndiv.appendChild(buttondel),
                newarticle.appendChild(ndiv),
                listcomplete.appendChild(newarticle)
        } else {
                const ndiv = document.createElement("div");
                ndiv.classList.add("action");
                const buttonfinish = document.createElement("button");
                buttonfinish.id = book.id,
                buttonfinish.innerText = "Selesai dibaca",
                buttonfinish.classList.add("green"),
                buttonfinish.addEventListener("click", addTaskToCompleted);
                const buttondel = document.createElement("button");
                buttondel.id = book.id,
                buttondel.innerText = "Hapus buku",
                buttondel.classList.add("red"),
                buttondel.addEventListener("click", deleted),
                ndiv.appendChild(buttonfinish),
                ndiv.appendChild(buttondel),
                newarticle.appendChild(ndiv),
                listuncomplete.appendChild(newarticle)
        }
    }
}


function putUserList() {
    !function(data) {
        localStorage.setItem(storageKey, JSON.stringify(data))
    }(userData),
    renderUserList(userData)
}


window.addEventListener("load", (function() {
    userData = JSON.parse(localStorage.getItem(storageKey)) || [],
    renderUserList(userData);
    const addbook = document.querySelector("#inputBook");
    addbook.addEventListener("submit", addBook),
    document.addEventListener("bookListChanged", putUserList)
}
));