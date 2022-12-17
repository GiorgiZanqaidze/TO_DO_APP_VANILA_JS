// ***************** variables ***************
const alert = document.querySelector('.alert');
const form = document.querySelector('.form');
const inputValue = document.getElementById('input-value');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.container');
const list = document.querySelector('.list');
const clearBtn = document.querySelector('.clear-btn');


// global variables
let editElement;
let editID = ""
let editFlag = false;

// ****************** event listeners ***************
// form event 
form.addEventListener('submit', submitItem);
// clear button event
// clearBtn.addEventListener('click', clearItems);
// add window event
window.addEventListener('DOMContentLoaded', setupItems)
// ************ functions ***************
function submitItem(e) {
    // remove default function 
    e.preventDefault();
      // input value
    const value = inputValue.value
    // unique id for each item
    const id = new Date().getTime().toString()
  
    if (value && !editFlag) {
        createListItem(id, value)
        // show container
        container.classList.add('show-container')
        
        
        // alert
        alertText("item added", 'success')
        // add to local storage 
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        editElement.textContent = inputValue.value
        alertText("edit item", 'success')
        editLocalStorage(editID, value)
        setBackToDefault()
    } else {
        alertText("input value", 'danger')
    }

}
// delete item
function deleteItem(e) {
    const item = e.currentTarget.parentElement.parentElement
    const id = item.dataset.id
    list.removeChild(item)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    alertText("item delete", 'danger')
    removeFromLocalStorage(id)
    setBackToDefault()
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement

    submitBtn.textContent = "edit"
    editFlag = true;
    editElement = e.currentTarget.parentElement.previousElementSibling
    inputValue.value = editElement.textContent
    editID = element.dataset.id
    
}
// clear items
function clearItems() {
    const items = document.querySelectorAll('.item')    
    items.forEach(item => {
        list.removeChild(item)
    })
    container.classList.remove('show-container')
    alertText("clear all", 'danger')
    localStorage.removeItem('list')
    setBackToDefault()
}
// default
function setBackToDefault() {
    inputValue.value = "";
    editFlag = false;
    submitBtn.textContent = "submit"
}
// alert text
function alertText(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function() {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

// ***************** LOCAL STORAGE FUNCTIONS *******************
function addToLocalStorage(id, value) {
    let grocery = {id, value}
    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))
}
function removeFromLocalStorage(id){
    let items = getLocalStorage()

    items = items.filter(function(item) {
        if(item.id !== id) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function editLocalStorage(id, value){
    let items = getLocalStorage()
    items = items.filter(function(item) {
        if(item.id === id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))
}
// get local storage
function getLocalStorage() {
    if (localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}
// ****** SETUP ITEMS *********
function setupItems() {
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value) {
    const element = document.createElement('article')
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.classList.add('item')
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btns-container">
        <button class="edit-btn">
            <span class="material-symbols-outlined">
                edit
                </span>
        </button>
        <button class="delete-btn">
            <span class="material-symbols-outlined">
            delete
            </span>
        </button>
    </div>`
    // delete button
    const deleteBtn = element.querySelector('.delete-btn')
    // edit button
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    // clear btn
    clearBtn.addEventListener('click', clearItems);
    // append element
    list.appendChild(element)
}