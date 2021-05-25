// Creates random number, required for Orders amount.
function getRandomInt() {
    min = Math.ceil(100);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min) + min);
  }

// Renders single card.
const renderCard = function(element){
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card-wrapper';
    cardWrapper.innerHTML = 
    `<div class="card" data-id=${element.id}>
        <div class="flex-wrapper">
            <div class="like like-empty"></div>
            <div class="picture">
                <img src="img/${element.imgUrl}" alt="device picture">
            </div>
        </div>
        <div class="flex-wrapper">
            <div class="name">${element.name}</div>
            <div class="remainder">
                ${(function(){
                    if(element.orderInfo.inStock >= 1) return '<div class="remainder-icon-available"></div>';
                    else return '<div class="remainder-icon-unavailable"></div>';
                })()}
                <span class="remainder-text"><span class="remainder-number">${element.orderInfo.inStock}</span> left in stock</span>
            </div>
            <div class="price">Price: <span>${element.price}</span> $</div>
            <div class="button-wrapper">
                ${(function(){
                    if(element.orderInfo.inStock >= 1) return '<button class="add-from-card-btn">Add to cart</button>';
                    else return '<button class="add-from-card-btn-disabled">Add to cart</button>';
                })()}
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="review-wrapper">
            <div class="like-red">
                <img src="img/icons/like_filled.svg" alt="like_filled">
            </div>
            <div class="positive-reviews"><span>${element.orderInfo.reviews}%</span>Positive reviews<br>Above avarage</div>
        </div>
        <div class="orders"><span>${getRandomInt()}</span><br>orders</div>
    </div>`
    return cardWrapper;
}

// Fills store by rendered cards.
const fillStore = function(elements){
    elements.forEach(element => { 
        document.querySelector('.item-list').appendChild(renderCard(element)) 
    });    
}
fillStore(items);

// Render modale window.
const renderModal = function(item, orders){
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal-window';
    modalWindow.innerHTML = 
    `
    <div class="modal-picture">
        <img src="img/${item.imgUrl}" alt="item picture">
    </div>
    <div class="modal-details">
        <p class="name">${item.name}</p>
        <div class="modal-review-wrapper">
            <div class="review-sectio">
                <div class="like-red">
                    <img src="img/icons/like_filled.svg" alt="like_filled">
                </div>
                <div class="positive-reviews"><span>${item.orderInfo.reviews}%</span>Positive reviews<br>Above avarage</div>
            </div>
            <div class="orders"><span>${orders}</span><br>orders</div>
        </div>
        <p>Color: <span>${item.color}</span></p>
        <p>Operating System: <span>${item.os}</span></p>
        <p>Chip: <span>${item.chip.name}</span></p>
        <p>Height: <span>${item.size.height} cm</span></p>
        <p>Width: <span>${item.size.width} cm</span></p>
        <p>Depth: <span>${item.size.depth} cm</span></p>
        <p>Weight: <span>${item.size.weight} g</span></p>
        <div class="price"></div>
    </div>
    <div class="modale-price">
        <div class="amount">$ ${item.price}</div>
        <div class="remainder">Stock: ${item.orderInfo.inStock} pcs</div>
        ${(function(){
            if(item.orderInfo.inStock >= 1) return '<button>Add to cart</button>';
            else return '<button class="disabled">Add to cart</button>';
        })()}
    </div>
    `
    return modalWindow;
}

// Sets like/unlike and opens/closes modal window.
window.onclick = e => {
    const backShadow = document.querySelector('.back-shadow');
    if(e.target.className.includes('like')){
        const likeElem = e.target;
        if(likeElem.className.includes('like-filled')) likeElem.className = 'like like-empty'
        else likeElem.className = 'like like-empty like-filled'
    }
    else if(e.target.className.includes('add-from-card-btn')){
        // console.log(items[e.target.closest('.card-wrapper').firstChild.getAttribute('data-id') - 1])
        return
    }
    else if(e.target.closest('.card-wrapper')){
        const CardWrapper = e.target.closest('.card-wrapper');
        // console.log((items[CardWrapper.firstChild.getAttribute('data-id') - 1]))
        backShadow.style.display = "block";
        document.body.style.overflow = "hidden";
        document.querySelector('.back-shadow').appendChild(renderModal(items[CardWrapper.firstChild.getAttribute('data-id') - 1], CardWrapper.querySelector('.orders span').innerHTML));
    }
    else if(e.target.className.includes('back-shadow')){
        backShadow.style.display = "none";
        document.body.style.overflow = "visible";
    }
}

// Accordion menu.
const acc = document.getElementsByClassName("section-wrapper");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    this.firstElementChild.classList.toggle("active");

    var arrow = this.lastElementChild;
    this.lastElementChild.classList.toggle('opened')

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Verifies if element visible on a page.
const isVisible = function(element){
    if(!(element.offsetParent === null)) return true;
    return false
}

// Open filter after click on '.filter-icon' and rebuild '.item-list'.
const filterIcon = document.querySelector('.filter-icon');
const accordionFilter = document.querySelector('.accordion-filter');
const itemList = document.querySelector('.item-list');
const cardWrapper = document.querySelectorAll('.card-wrapper');
filterIcon.onclick = function(){
    if(isVisible(accordionFilter)){
        accordionFilter.style.display = "none";
        itemList.style.width = "100%";
        cardWrapper.forEach(element => element.style.width = "30%");
    }else{
        accordionFilter.style.display = "block";
        itemList.style.width = "64%";
        cardWrapper.forEach(element => element.style.width = "45%");
    }
}

// Gets all available devices color.
const getColor = function(elements){
    let result = [];
    const tmpCollorsArr = elements.map(elem => elem.color);

    tmpCollorsArr.forEach(colors => {
        colors.forEach(color => {
            if(!result.includes(color)) result.push(color);
        })
    })

    return result;
}

// Renders color checkbox in the filter
const renderColorCheckbox = function(color){
    const colorCheckboxWrapper = document.createElement('div');
    colorCheckboxWrapper.className = 'color-wrapper';
    colorCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="color-name">${color}</div>`
    return colorCheckboxWrapper;
}

// Fills filter by rendered color checkboxes.
const fillColorFlter = function(elements){
    elements.forEach(element => { 
        document.querySelector('.color-panel-wrapper').appendChild(renderColorCheckbox(element))
    });
}

fillColorFlter(getColor(items));

const memoryFilterArr = [
    '32 Gb',
    '64 Gb',
    '128 Gb',
    '256 Gb',
    '512 Gb',
    '1 TB',
    '2 TB',
    '4 TB'
];

// Renders memory checkbox in the filter
const renderMemoryCheckbox = function(memory){
    const memoryCheckboxWrapper = document.createElement('div');
    memoryCheckboxWrapper.className = 'memory-wrapper';
    memoryCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="memory-name">${memory}</div>`
    return memoryCheckboxWrapper;
}

// Fills filter by rendered memory checkboxes.
const fillMemoryFlter = function(elements){
    elements.forEach(element => { 
        document.querySelector('.memory-panel-wrapper').appendChild(renderMemoryCheckbox(element))
    });
}

fillMemoryFlter(memoryFilterArr);

// Gets all available devices os.
const getOs = function(elements){
    const tmpOsArr = elements.map(elem => elem.os);
    const result = [];
    tmpOsArr.forEach(os => {
        if(!result.includes(os)) result.push(os);
    })

    return result;
}

// Renders OS checkbox in the filter
const renderOsCheckbox = function(os){
    const osCheckboxWrapper = document.createElement('div');
    osCheckboxWrapper.className = 'os-wrapper';
    osCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="os-name">${os}</div>`
    return osCheckboxWrapper;
}

// Fills filter by rendered os checkboxes.
const fillOsFlter = function(elements){
    elements.forEach(element => { 
        document.querySelector('.os-panel').appendChild(renderOsCheckbox(element))
    });
}

fillOsFlter(getOs(items));

const displayFilterArr = [
    '2-5 inch',
    '5-7 inch',
    '7-12 inch',
    '12-16 inch',
    '+16 inch'
];

// Renders display checkbox in the filter
const renderDisplayCheckbox = function(display){
    const displayCheckboxWrapper = document.createElement('div');
    displayCheckboxWrapper.className = 'display-wrapper';
    displayCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="memory-name">${display}</div>`
    return displayCheckboxWrapper;
}

// Fills filter by rendered display checkboxes.
const fillDisplayFlter = function(elements){
    elements.forEach(element => { 
        document.querySelector('.panel-filter-display').appendChild(renderDisplayCheckbox(element))
    });
}

fillDisplayFlter(displayFilterArr);