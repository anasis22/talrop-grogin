// -------- Navbar Active ---------

const navBtns = document.querySelectorAll(".nav-links");

navBtns.forEach((item) => {
    item.addEventListener('click', event => {
        navBtns.forEach((item) => {
            item.classList.remove('active')
        })
        item.classList.add('active')
    })
})

// -------- CheckBox checked to color change --------

const checkBox = document.querySelectorAll('.productCategoriesCheckbox');

checkBox.forEach((item) => {
    item.addEventListener('change', function () {
        const element = this.nextElementSibling;
        if (this.checked) {
            element.classList.add('checked-text')
        } else if (!this.checked) {
            element.classList.remove('checked-text')
        }
    })
})

// ----------- Product Lists -----------

document.addEventListener('DOMContentLoaded', function () {

    const resultContainer = document.querySelector('.results');
    let allProducts = []
    let filteredProducts;
    let wishListCount = 0;
    const wishListCountShow = document.querySelector('.wishListCountShow')

    async function fetchProducts() {
        try {
            const res = await fetch('./data.json');
            const data = await res.json();
            allProducts = data
            renderProducts(allProducts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderProducts(products) {
        resultContainer.innerHTML = '';

        const productCard = document.createElement('ul');
        productCard.className = "productCard"

        const otherProductsCard = document.createElement('ul')
        otherProductsCard.className = 'otherProductsCard';

        console.log(resultContainer)
        products.forEach((el) => {
            const productCardLists = document.createElement('li')

            // topLi
            const topLi = document.createElement("li");
            topLi.className = "topLi"
            const leftImgTag = document.createElement('img');
            const rightImgTag = document.createElement('img');
            leftImgTag.className = 'leftImgTag';
            rightImgTag.className = 'rightImgTag';
            leftImgTag.src = el.offerBadge
            rightImgTag.src = './assets/heart.png'
            topLi.appendChild(leftImgTag);
            topLi.appendChild(rightImgTag);

            // heart
            rightImgTag.addEventListener('click', () => {
                if (rightImgTag.src.includes('heart.png')) {
                    rightImgTag.src = './assets/heartRed.png';
                    wishListCount += 1
                    wishListCountShow.innerHTML = wishListCount
                } else if (rightImgTag.src.includes('heartRed.png')) {
                    rightImgTag.src = './assets/heart.png';
                    wishListCount -= 1
                    wishListCountShow.innerHTML = wishListCount
                }
            })

            // midLi
            const midLi = document.createElement("li");
            midLi.className = "midLi"
            const midImg = document.createElement("img");
            midImg.className = "midImg";
            midImg.src = el.img
            midLi.appendChild(midImg)

            // bottomLi
            const bottomLi = document.createElement("li");
            bottomLi.className = "bottomLi"

            const productName = document.createElement("p");
            productName.className = 'productName'
            productName.innerHTML = el.name
            bottomLi.appendChild(productName)

            const ratingLi = document.createElement("li");
            ratingLi.className = "ratingLi"
            bottomLi.appendChild(ratingLi);

            const ratingStarImg = document.createElement("img")
            ratingStarImg.className = 'ratingStarImg'
            ratingStarImg.src = el.ratingStarImg
            ratingLi.appendChild(ratingStarImg)

            const itemCounts = document.createElement("p")
            itemCounts.className = 'itemCounts'
            itemCounts.innerHTML = el.itemCounts
            ratingLi.appendChild(itemCounts)

            const priceLi = document.createElement("li");
            priceLi.className = "priceLi"
            bottomLi.appendChild(priceLi);

            const price = document.createElement("p")
            price.className = 'price'
            price.innerHTML = el.price
            priceLi.appendChild(price)

            const priceWrong = document.createElement("p")
            priceWrong.className = 'priceWrong'
            priceWrong.innerHTML = el.wrongPrice
            priceLi.appendChild(priceWrong)

            const inStockLi = document.createElement("li");
            inStockLi.className = "inStockLi"
            bottomLi.appendChild(inStockLi);

            const inStockImg = document.createElement("img")
            inStockImg.className = 'inStockImg'
            inStockImg.src = el.inStockImg
            inStockLi.appendChild(inStockImg)

            const inStockText = document.createElement("p")
            inStockText.className = 'inStockText'
            inStockText.innerHTML = 'IN STOCK'
            inStockLi.appendChild(inStockText)

            // other product card

            const otherProductsCardLi = document.createElement('li');
            otherProductsCardLi.className = 'otherProductsCardLi';

            const otherProductText = document.createElement('p');
            otherProductText.className = 'otherProductText';
            otherProductText.innerHTML = 'Other Products';
            otherProductsCardLi.appendChild(otherProductText);

            productCardLists.className = "productCardLists"

            productCardLists.appendChild(topLi)
            productCardLists.appendChild(midLi)
            productCardLists.appendChild(bottomLi)

            if (el.name === 'Other Products') {
                otherProductsCard.appendChild(otherProductsCardLi)
            } else {
                productCard.appendChild(productCardLists)
            }

            resultContainer.appendChild(productCard);
            resultContainer.appendChild(otherProductsCard);

        });
    }

    function filterProducts() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const checkboxes = document.querySelectorAll('.productCategoriesCheckbox');
        const checkedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-categories'));
        console.log(checkedCategories.includes("fruits & vegetables"))

        if (checkedCategories.includes("fruits & vegetables")) {
            filteredProducts = allProducts.filter(product => product.name !== 'Other Products');
            if (searchInput) {
                filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchInput));
            }
        } else {
            filteredProducts = allProducts.filter(product => product.name === 'Other Products');
        }

        renderProducts(filteredProducts)
    }

    const checkboxes = document.querySelectorAll('.productCategoriesCheckbox');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            filterProducts();
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterProducts);

    fetchProducts()

    function initializeCountdown(endDate) {
        const countdownDays = document.querySelector('.countdownDays');
        const countdownHours = document.querySelector('.countdownHours');
        const countdownMinutes = document.querySelector('.countdownMinutes');
        const countdownSeconds = document.querySelector('.countdownSeconds');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate - now;
  
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "EXPIRED";
                return;
            }
  
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
            countdownDays.innerHTML = days;
            countdownHours.innerHTML = hours;
            countdownMinutes.innerHTML = minutes;
            countdownSeconds.innerHTML = seconds;
        }
  
        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }
    const countdownEndDate = new Date('2024-08-01T00:00:00').getTime();
    initializeCountdown(countdownEndDate);


});
