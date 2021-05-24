function getRandomInt() {
    min = Math.ceil(100);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min) + min);
  }


items.forEach(element => {
    const caredWrapper = document.createElement('div');
    caredWrapper.className = 'card-wrapper';
    caredWrapper.innerHTML = 
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
    document.querySelector('.item-list').appendChild(caredWrapper) 
});

const like = document.querySelectorAll('.like');
like.forEach(element => {
    element.onclick = function(){
        if(element.className.includes('like-filled')) element.className = 'like like-empty'
        else element.className = 'like like-empty like-filled'
        }
});