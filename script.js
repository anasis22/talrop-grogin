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

// json testing

// fetch('./data.json').then((res) => {
//     res.json()
//     .then((data) => {
//         console.log(data)
//     })
// })

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

                productCardLists.className = "productCardLists"

                productCardLists.innerHTML = el.name;

                productCard.appendChild(productCardLists)
                resultContainer.appendChild(productCard);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    mapping();
});
