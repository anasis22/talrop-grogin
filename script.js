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

const checkBox = document.querySelectorAll('.productCategoriesCheckbox')

checkBox.forEach((item) => {
    item.addEventListener('change', function () {
        const element = this.nextElementSibling;
        if (this.checked) {
            element.classList.add('checked-text')
        } else {
            element.classList.remove('checked-text')
        }
    })
})

// --------

document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.querySelector('.results');
    const productCard = document.createElement('ul');
    productCard.className = "productCard"

    async function mapping() {
        try {
            const res = await fetch('./data.json');
            const data = await res.json();

            data.forEach((el) => {
                const productCardLists = document.createElement('li')

                // topLi
                const topLi = document.createElement("li");
                topLi.className = "topLi"
                const leftImgTag = document.createElement('img');
                const rightImgTag = document.createElement('img');
                leftImgTag.className = 'leftImgTag';
                rightImgTag.className = 'rightImgTag';
                leftImgTag.src = './assets/offer-badge.png'
                rightImgTag.src = './assets/heart.png'
                topLi.appendChild(leftImgTag);
                topLi.appendChild(rightImgTag);

                // heart
                rightImgTag.addEventListener('click',() => {
                    if (rightImgTag.src.includes('heart.png')) {
                        rightImgTag.src = './assets/heartRed.png';
                    } else if (rightImgTag.src.includes('heartRed.png')) {
                        rightImgTag.src = './assets/heart.png';
                    }
                })

                // midLi
                const midLi = document.createElement("li");
                midLi.className = "midLi"
                const midImg = document.createElement('img');
                midImg.className = "midImg";
                midImg.src = el.img
                midLi.appendChild(midImg)


                // bottomLi
                const bottomLi = document.createElement("li");
                bottomLi.className = "bottom"
                // const ratingStarImg = document.createElement("img")
                // ratingStarImg.className = 'ratingStarImg'
                // ratingStarImg.src = el.ratingStarImg
                // bottomLi.appendChild('ratingStarImg')

                productCardLists.className = "productCardLists"

                productCardLists.appendChild(topLi)
                productCardLists.appendChild(midLi)
                productCardLists.appendChild(bottomLi)
                productCard.appendChild(productCardLists)
                resultContainer.appendChild(productCard);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    mapping();
});
