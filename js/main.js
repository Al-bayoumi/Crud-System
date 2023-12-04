var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productDescriptionInput = document.getElementById("product-description");
var searchProductInput = document.getElementById("searchProduct");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertDescription = document.getElementById("alertDescription");


var productList;
var currentindex = 0;

if (localStorage.getItem("product-list") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("product-list"));
  display();
}

function addProduct() {
  if (validName() == true && validPrice() == true && validDescription() == true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    productList.push(product);
    console.log(productList);
    localStorage.setItem("product-list", JSON.stringify(productList));
    display();
  }
}

function clearProduct() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "tv";
  productDescriptionInput.value = "";
}

function display() {
  teamp = "";
  for (var i = 0; i < productList.length; i++) {
    teamp +=
      `<tr>
    <td>` + i + `</td>
    <td>`+ productList[i].name + `</td>
    <td>` + productList[i].price + `</td>
    <td>` + productList[i].category + `</td> 
    <td>` + productList[i].description + `</td>
    <td>
    <button onclick="(updateProduct(` + i + `))"  class="btn btn-warning">
    <i class="fa-solid fa-pen"></i></button>
    </td>
    <td>
   <button onclick="(deleteProduct(` + i + `))" class="btn btn-danger">
    <i class="fa-solid fa-trash"></i>
   </button>
   </td>
  </tr>`;
  }
  document.getElementById("display-body").innerHTML = teamp;
}

function searchProduct() {
  var searchValue = searchProductInput.value.toLowerCase();
  var teamp = ""
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue) == true ||
      productList[i].category.toLowerCase().includes(searchValue) == true) {
      teamp +=
        `<tr>
      <td>` + i + `</td>
      <td>
       `+ productList[i].name.toLowerCase().replace(searchValue, "<span class='text-danger fw-bold'>" +
          searchValue + "</span>") + `
      </td>
      <td>` + productList[i].price + `</td>
      <td>
       `+ productList[i].category.toLowerCase().replace(searchValue, "<span class='text-danger fw-bold'>" +
            searchValue + "</span>") + `
      </td> 
      <td>` + productList[i].description + `</td>
      <td>
       <button onclick="(updateProduct(`+ i + `))" class="btn btn-warning">
       <i class="fa-solid fa-pen"></i>
       </button>
      </td>
      <td>
       <button onclick="(deleteProduct(` + i + `))" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
       </button>
      </td>
    </tr>`;
    }
    document.getElementById("display-body").innerHTML = teamp;
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  console.log(productList);
  display();
  localStorage.setItem("product-list", JSON.stringify(productList));
}

function updateProduct(index) {
  currentindex = index;
  productNameInput.value = productList[index].name
  productPriceInput.value = productList[index].price
  productCategoryInput.value = productList[index].category
  productDescriptionInput.value = productList[index].description

  document.getElementById("add-Product").style.display = "none"
  document.getElementById("edit-Product").style.display = "inline-block"
}

function editProduct(index) {

  productList[currentindex].name = productNameInput.value
  productList[currentindex].price = productPriceInput.value
  productList[currentindex].category = productCategoryInput.value
  productList[currentindex].description = productDescriptionInput.value

  display();
  localStorage.setItem("product-list", JSON.stringify(productList));

  document.getElementById("add-Product").style.display = "inline-block"
  document.getElementById("edit-Product").style.display = "none"
  clearProduct()

}

productNameInput.addEventListener("blur", validName)
function validName() {
  let regualr = /^[A-Z][a-z]{3,10}[0-9]?$/

  if (regualr.test(productNameInput.value) == true) {
    alertName.classList.replace("d-block", "d-none")
    productNameInput.classList.add("is-valid")
    productNameInput.classList.remove("is-invalid")
    return true
  } else {
    alertName.classList.replace("d-none", "d-block")
    productNameInput.classList.add("is-invalid")
    productNameInput.classList.remove("is-valid")
    return false
  }

}

productPriceInput.addEventListener("blur", validPrice)
function validPrice() {
  let regualrPrice = /^[1-9][0-9]{1,4}$/

  if (regualrPrice.test(productPriceInput.value) == true) {
    alertPrice.classList.replace("d-block", "d-none")
    productPriceInput.classList.add("is-valid")
    productPriceInput.classList.remove("is-invalid")
    return true
  } else {
    alertPrice.classList.replace("d-none", "d-block")
    productPriceInput.classList.add("is-invalid")
    productPriceInput.classList.remove("is-valid")
    return false
  }
}

productDescriptionInput.addEventListener("blur", validDescription)
function validDescription() {
  let regualrDescription = /^[a-z]{1,1000}[0-9]?$/

  if (regualrDescription.test(productDescriptionInput.value) == true) {
    alertDescription.classList.replace("d-block", "d-none")
    productDescriptionInput.classList.add("is-valid")
    productDescriptionInput.classList.remove("is-invalid")
    return true
  } else {
    alertDescription.classList.replace("d-none", "d-block")
    productDescriptionInput.classList.add("is-invalid")
    productDescriptionInput.classList.remove("is-valid")
    return false
  }
}