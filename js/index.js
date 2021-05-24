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
    `<div class="card">
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

// Sets like/unlike
const like = document.querySelectorAll('.like');
like.forEach(element => {
    element.onclick = function(){
        if(element.className.includes('like-filled')) element.className = 'like like-empty'
        else element.className = 'like like-empty like-filled'
        }
});

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
        cardWrapper.style.width = "30%";
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