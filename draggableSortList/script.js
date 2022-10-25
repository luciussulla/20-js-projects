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
    console.log(person); 
    const listItem = document.createElement('li');

    listItem.classList.add('over'); 

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
  }); 
}