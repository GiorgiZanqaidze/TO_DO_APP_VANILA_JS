const settingBtn = document.querySelector('.icon')
const modal = document.querySelector('.modal')
const mainContent = document.querySelector('.main-content')
const closeIcon = document.querySelector('.close-icon')

settingBtn.addEventListener('click', toggle);
closeIcon.addEventListener('click', toggle);

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        toggle()
    }
})


// show and close modal
function toggle() {
    mainContent.classList.toggle('show-modal')
    modal.classList.toggle('show-modal')
}
// color swither 
// color array with color objects
const colors = [
    {
        id: 0,
        color: 'var(--cl-1-1)'
    },
    {
        id: 1,
        color: 'var(--cl-2-2)'
    },
    {
        id: 2,
        color: 'var(--cl-3-3)'
    },
    {
        id: 3,
        color: 'var(--cl-4-4)'
    },
]
// div which contain colors
const colorItem = document.querySelectorAll('.color') 
colorItem.forEach(function(item, index){
    // set data attribute
    const attr = document.createAttribute('data-id')
    // asign different value for each
    attr.value = index
    item.setAttributeNode(attr)
    // add style colors 
    const styleAttr = document.createAttribute('style')
    styleAttr.value = `background-color: ${colors[index].color}`
    item.setAttributeNode(styleAttr)
    console.log(item)
    // add click event on every single color button
    item.addEventListener('click', changeColor)
})

function changeColor(e) {
    const color = e.target.style.backgroundColor
    const root = document.querySelector(':root');
    root.style.setProperty('--cl-3', color)
}


