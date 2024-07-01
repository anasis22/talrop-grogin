// -------- Navbar Active ---------

const navBtns = document.querySelectorAll(".nav-links");

navBtns.forEach((item) => {
    item.addEventListener('click',event => {
        navBtns.forEach((item) => {
           item.classList.remove('active')
        })
        item.classList.add('active')
    })
})

// -------- CheckBox checked to color change --------


const checkBox = document.querySelectorAll('.productCategoriesCheckbox')

checkBox.forEach((item) => {
    item.addEventListener('change', function() {
        const element = this.nextElementSibling;
         if(this.checked){
            element.classList.add('checked-text')
         }else{
            element.classList.remove('checked-text')
         }
    })
})

// json testing

fetch('./fruits.json').then((res) => {
    res.json()
    .then((data) => {
        console.log(data)
    })
})

