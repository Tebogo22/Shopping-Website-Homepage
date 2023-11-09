//When the page first loads without any filters/sorting
const products = document.querySelector('.product-seletor')

const productObjs = [{title: 'product1 - (1).PNG', name: 'Product', category: 'Category A', price: '$5639.99'},
					{title: 'product1 - (2).PNG', name: 'T-Shirt', category: 'Category A', price: '$389.99'},
					{title: 'product1 - (3).PNG', name: 'Men Shorts', category: 'Category A', price: '$599.99'},
					{title: 'product1 - (4).PNG', name: 'Nike Sneakers', category: 'Category A', price: '$899.89'},
					{title: 'product1 - (5).PNG', name: 'Smart TV', category: 'Category B', price: '$6999.95'},
					{title: 'product1 - (6).PNG', name: 'BD Speaker', category: 'Category B',price: '$2999.99'},
					{title: 'product1 - (7).PNG', name: 'JBL Headphones', category: 'Category B',price: '$490'},
					{title: 'product1 - (8).PNG', name: 'Product Name', category: 'Category B',price: '$5700.99'},
					{title: 'product1 - (9).PNG', name: 'Phone Cover', category: 'Category B',price: '$8.99'},
					{title: 'product1 - (10).PNG', name: 'Screen Protector', category: 'Category B',price: '$5.45'},
					{title: 'product1 - (11).PNG', name: 'Cheap Headsets', category: 'Category C',price: '$4.99'},
					{title: 'product1 - (12).PNG', name: 'AUX Cable', category: 'Category C',price: '$29.99'}
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const productPriceArray = productOptionArray('price')
/*A method that sorts the array in ascending order if ascOrNot = true and in descending order if ascOrNot = false*/
function sortPriceArray(priceArrayToSort, ascOrNot){
	let numArr = []
	let newSortedPrizeArray = []

	for(let i = 0; i < priceArrayToSort.length; i++){
		//First get the price in the array
		let arrayInPrice = priceArrayToSort[i]
		//Splice its first character '$' so that we are left with only numbers
		arrayInPrice = arrayInPrice.slice(1)
		//Convert the numbers to a Float after taking out the '$' sign and push the value into an array
		numArr.push(parseFloat(arrayInPrice))
	}

	if(ascOrNot == true){
		numArr.sort((a, b) => a - b)
	}else{
		numArr.sort((a, b) => b - a)
	}

	for(let c = 0; c < numArr.length; c++){
		newSortedPrizeArray.push('$' + numArr[c])
	}

	return newSortedPrizeArray
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Working on the select element for the Sort By option
const selectSortBy = document.querySelector('#select-sort')
selectSortBy.addEventListener('change', (e) => sortByFunc())

function sortByFunc(){
	let sortByHTML = ''

	if(selectSortBy.value === 'Name A-Z'){

		let sortedNameArray = productNameArray.sort()
		displayBySort(sortedNameArray, sortByHTML, productObjs)

	}else if(selectSortBy.value === 'Category A-Z'){

		let sortedCategoryArray = productCategoryArray.sort()
		console.log(sortedCategoryArray)
		displayBySort(sortedCategoryArray, sortByHTML, productObjs)

	}else if(selectSortBy.value === 'Price: Low-High'){

		let ascendingPriceArray = sortPriceArray(productPriceArray, true)
		displayBySort(ascendingPriceArray, sortByHTML, productObjs)

	}else if(selectSortBy.value === 'Price: High-Low'){

		let descendingPrizeArray = sortPriceArray(productPriceArray, false)
		console.log(descendingPrizeArray)
		displayBySort(descendingPrizeArray, sortByHTML, productObjs)
	}
}

//FUnction that displays to the DOM by type of sort
function displayBySort(typeOfArray, htmlHolder, myObjectArray){

		for(let i = 0; i < typeOfArray.length; i++){
				for(let c = 0; c < typeOfArray.length; c++){
					if((typeOfArray[i] == myObjectArray[c].name) || (typeOfArray[i] == myObjectArray[c].category) || (typeOfArray[i] == myObjectArray[c].price)){

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