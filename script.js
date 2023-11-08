//When the page first loads without any filters/sorting
const products = document.querySelector('.product-seletor')

const productObjs = [{title: 'product1 - (1).PNG', name: 'Product', category: 'Category A', price: '$50000.00'},
					{title: 'product1 - (2).PNG', name: 'T-Shirt', category: 'Category A', price: '$399.00'},
					{title: 'product1 - (3).PNG', name: 'Men Shorts', category: 'Category A', price: '$600.00'},
					{title: 'product1 - (4).PNG', name: 'Nike Sneakers', category: 'Category A', price: '$900.00'},
					{title: 'product1 - (5).PNG', name: 'Smart TV', category: 'Category B', price: '$7000.00'},
					{title: 'product1 - (6).PNG', name: 'BD Speaker', category: 'Category B',price: '$3000.00'},
					{title: 'product1 - (7).PNG', name: 'JBL Headphones', category: 'Category B',price: '$490.00'},
					{title: 'product1 - (8).PNG', name: 'Product Name', category: 'Category B',price: '$5700.00'},
					{title: 'product1 - (9).PNG', name: 'Phone Cover', category: 'Category B',price: '$8.99'},
					{title: 'product1 - (10).PNG', name: 'Screen Protector', category: 'Category B',price: '$5.00'},
					{title: 'product1 - (11).PNG', name: 'Cheap Headsets', category: 'Category C',price: '$4.99'},
					{title: 'product1 - (12).PNG', name: 'AUX Cable', category: 'Category C',price: '$30.000'}
				]

//Counting number of products
const numProducts = document.querySelector('#num-products')
let prodcutQuantity = productObjs.length
numProducts.innerText = prodcutQuantity

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	let myHTMLholder = ''

	productObjs.forEach((object) => {
		myHTMLholder += `<div class="my-product">
								<img src="./products/${object.title}">
								<p class="product-name">${object.name}</p>
								<h5 class="img-category">${object.category}</h5>
								<p class="price">${object.price}</p>
						</div>`
	})
	
	products.innerHTML = myHTMLholder

//When a product is searched
const searchInput = document.querySelector('#searched-product') //Getting the search's value
const searchButtonIcon = document.querySelector('#search-icon-button') //Getting the search button/icon to trigger a search

searchButtonIcon.addEventListener('click',(e) => {
		e.preventDefault()

			let mySearchHTMLholder = ''
			let searchPrompt = searchInput.value.toLowerCase()
			productObjs.forEach((object) => {

				if((object.category.toLowerCase() === searchPrompt) || (object.name.toLowerCase() === searchPrompt)){

					mySearchHTMLholder += `<div class="my-product">
												<img src="./products/${object.title}">
												<p class="product-name">${object.name}</p>
												<h5 class="img-category">${object.category}</h5>
												<p class="price">${object.price}</p>
											</div>`
				}
			})	
			products.innerHTML = null
			products.innerHTML = mySearchHTMLholder
					
})

//Checking if the category checkbox is clicked
const checkboxA = document.querySelector('#checkbox-a')
const checkboxB = document.querySelector('#checkbox-b')
const checkboxC = document.querySelector('#checkbox-c')

function catCheck(checkbox, checkCategory){

		let catHTMLholder = ''
	if(checkbox.checked == true){
		productObjs.forEach((object) => {
			
			if(object.category === `${checkCategory}`){
				catHTMLholder += `<div class="my-product">
										<img src="./products/${object.title}">
										<p class="product-name">${object.name}</p>
										<h5 class="img-category">${object.category}</h5>
										<p class="price">${object.price}</p>
									</div>`
			}
		})
		products.innerHTML = null
		products.innerHTML = catHTMLholder	

	}else{
		products.innerHTML = null
		products.innerHTML = myHTMLholder
	}
}

checkboxC.addEventListener('click', (e) => catCheck(checkboxC, 'Category C'))
checkboxB.addEventListener('click', (e) => catCheck(checkboxB, 'Category B'))
checkboxA.addEventListener('click', (e) => catCheck(checkboxA, 'Category A'))

//Arrays that will help with the sorting
function productOptionArray(option){
	let optionArray = []

	productObjs.forEach((product) => {
		if(option == 'name'){
			optionArray.push(product.name)
		}else if(option == 'price'){
			optionArray.push(product.price)
		}else if(option == 'category'){
			optionArray.push(product.category)
		}
	})

	return optionArray
}

//Storing product's category, prize and name in an array which will be used to sort
const productCategoryArray = productOptionArray('category')
const productNameArray = productOptionArray('name')
const productPriceArray = productOptionArray('price')

//Working on the select element for the Sort By option
const selectSortBy = document.querySelector('#select-sort')
selectSortBy.addEventListener('change', (e) => sortByFunc())

function sortByFunc(){
	let sortByHTML = ''
	let typeOfSort = ''

	if(selectSortBy.value === 'Name A-Z'){

		let sortedNameArray = productNameArray.sort()
		displayBySort(sortedNameArray, sortByHTML, productObjs, productObjs.name)

	}else if(selectSortBy.value === 'Category A-Z'){

		let sortedCategoryArray = productCategoryArray.sort()
		typeOfSort = 'category'
		displayBySort(sortedCategoryArray, sortByHTML, productObjs, typeOfSort[1])

	}else if(selectSortBy.value === 'Price: Low-High'){

		let sortedPrizeArray = productPriceArray.sort()
		typeOfSort = 'price'
		displayBySort(sortedPrizeArray, sortByHTML, productObjs, typeOfSort[1])

	}else if(selectSortBy.value === 'Price: High-Low'){

		let sortedReversedPrizeArray = productPriceArray.sort().reverse()
		typeOfSort = 'price'
		displayBySort(sortedReversedPrizeArray, sortByHTML, productObjs, typeOfSort[1])
	}
}

//FUnction that displays to the DOM by type of sort
function displayBySort(typeOfArray, htmlHolder, myObjectArray, sortOption){

		for(let i = 0; i < typeOfArray.length; i++){
				for(let c = 0; c < typeOfArray.length; c++){
					if(typeOfArray[i] == myObjectArray[c].sortOption){
						htmlHolder += `<div class="my-product">
											<img src="./products/${myObjectArray[c].title}">
											<p class="product-name">${myObjectArray[c].name}</p>
											<h5 class="img-category">${myObjectArray[c].category}</h5>
											<p class="price">${myObjectArray[c].price}</p>
										</div>`
					}
				}
			}

		products.innerHTML = null
		products.innerHTML = htmlHolder
}


//Selecting DOM elements that will display the catgry quant
const catAquantity = document.querySelector('#cat-a-quant')
const catBquantity = document.querySelector('#cat-b-quant')
const catCquantity = document.querySelector('#cat-c-quant')

//Count category products and return their value
function categoryQuant(catg){
	let counter = 0;
	productObjs.forEach((product) => {
		if(product.category === catg){
			counter++
		}
	})

	return counter
}

catAquantity.innerText = categoryQuant('Category A')
catBquantity.innerText = categoryQuant('Category B')
catCquantity.innerText = categoryQuant('Category C')

//Mobile functionality
const mobileProductQuant = document.querySelector('#mobile-pro-num')
mobileProductQuant.innerText = prodcutQuantity