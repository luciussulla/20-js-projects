const draggable_list = document.getElementById('draggable-list'); 
const check = document.getElementById('check');

const richestPeople = [
  "Jeff Szmesoz", 
  "Smill Gates", 
  "Szmoren Szmuffet", 
  "Bernard Arnualt", 
  "Amacio Ortegs", 
  "Caros Slim", 
  "Larry Ellison", 
  "Marz Zucekrbert"
]

// store list items
const listItems = []; 

let dragStartIndex; 

createList(); 

// insert list items to DOM

function createList () {
  [...richestPeople]
  .map((a)=> ({value: a, sort: Math.random()}))
  .sort((a,b) => a.sort-b.sort)
  .map(obj=> obj.value)
  .forEach((person, index) => {
    // console.log(person); 
    const listItem = document.createElement('li');

    // listItem.classList.add('over'); 

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
      <span class="number">${index+1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `; 

    listItems.push(listItem); 
    draggable_list.appendChild(listItem); 

    addEventListeners();
  }); 
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable'); 
  const itemTwo = listItems[toIndex].querySelector('.draggable'); 

  listItems[fromIndex].appendChild(itemTwo); 
  listItems[toIndex].appendChild(itemOne); 
}

function dragStart() {
  console.log("start"); 
  dragStartIndex = this.closest('li').getAttribute('data-index'); 
  this.closest('li').style.opacity = '1'; 
  this.style.opacity = '1'; 
}

function dragEnter() {
  console.log("over")
  this.classList.add('over'); 
}

function dragOver(e) {
  console.log("over"); 
  e.preventDefault(); // otherwise it will not wor
}

function dragLeave() {
  console.log("leave")
  this.classList.remove('over'); 
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index'); 
  swapItems(dragStartIndex, dragEndIndex); 
  console.log(dragEndIndex); 

  this.classList.remove('over'); 
}

// check order of list items 
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim(); 
    if(personName !== richestPeople[index]) {
      listItem.classList.add('wrong'); 
    } else {
      listItem.classList.remove('wrong'); 
      listItem.classList.add('right'); 
    }
  })
}



function addEventListeners() {
  const draggables    = document.querySelectorAll('.draggable'); 
  const dragListItems = document.querySelectorAll('.draggable-list li'); 

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart); 
  }); 
  
  dragListItems.forEach(item => {
    item.addEventListener('dragover',   dragOver); 
    item.addEventListener('drop',       dragDrop); 
    item.addEventListener('dragenter',  dragEnter); 
    item.addEventListener('dragleave',  dragLeave); 
  }); 

} 

check.addEventListener('click', checkOrder); 