if(JSON.parse(localStorage.getItem('count'))===null){
  document.getElementById('total-items').innerHTML="Total Items: 0"
  var totalCountDiv =document.getElementById('totalcount-div')
  totalCountDiv.style.boxShadow = "none"
}



else{
  if(productlist !==null){
    var productlist = JSON.parse(localStorage.getItem('product-list'))

  }
var counting =JSON.parse(localStorage.getItem('count'))
document.getElementById('total-items').innerHTML="Total Items: "+productlist.length
console.log(counting)
var cartIcon = document.getElementById('count')
cartIcon.innerText = JSON.parse(localStorage.getItem('count'))===null ? 0: JSON.parse(localStorage.getItem('count'))
 var twoSections = document.getElementById('twoSections')
 
 var grandTotal =0;
 for(i=0;i<productlist.length;i++){
   renderCards(productlist[i])

   var totalCurrentPro = parseFloat(productlist[i].itemcount)*parseFloat(productlist[i].price)
   grandTotal = grandTotal + totalCurrentPro
   
 }


function renderCards(productlist){

var itemsContainer = document.getElementById('items-container')
twoSections.appendChild(itemsContainer)

var card = document.createElement('div')
card.className = 'item-card'
itemsContainer.appendChild(card)

var leftside = document.createElement('div')
leftside.className = "leftside"
card.appendChild(leftside)

var image = document.createElement('img')
image.src = productlist.preview
image.className = 'imagesCheck'
leftside.appendChild(image)

var rightside = document.createElement('div')
rightside.className = "rightside"
card.appendChild(rightside)

var productName = document.createElement('h4')
productName.innerHTML =productlist.name
rightside.appendChild(productName)

var productCount = document.createElement('p')
productCount.innerHTML = "x"+productlist.itemcount
rightside.appendChild(productCount)

var productCostDiv = document.createElement('p')
rightside.appendChild(productCostDiv)

var productAmount = document.createElement('span')
productAmount.innerHTML = "Amount: "
productCostDiv.appendChild(productAmount)

var productCost = document.createElement('span')
productCost.innerHTML = productlist.itemcount*productlist.price
productCostDiv.appendChild(productCost)

}

// total amount

var totalCountDiv =document.getElementById('totalcount-div')
twoSections.appendChild(totalCountDiv)

var totalAmntTitle = document.createElement('h4')
totalAmntTitle.innerHTML ="Total Amount"
totalCountDiv.appendChild(totalAmntTitle)

var totalCostDiv = document.createElement('p')
totalCountDiv.appendChild(totalCostDiv)

var totalAmount = document.createElement('span')
totalAmount.innerHTML = "Amount: "
totalCostDiv.appendChild(totalAmount)

var totalCost = document.createElement('span')
totalCost.innerHTML = grandTotal;
totalCost.style.color= "black"
totalCost.style.fontWeight = "700"
totalCost.style.fontSize = "25px"
totalCostDiv.appendChild(totalCost)


var placeBtnDiv = document.createElement('div')
placeBtnDiv.className = "placeBtnDiv"
totalCountDiv.appendChild(placeBtnDiv)

  var placeBttn = document.createElement('a')
  placeBttn.innerText="Place Order"
  placeBttn.id= "place-order"
  placeBttn.href="./confirm.html"
  
  placeBtnDiv.appendChild(placeBttn)
  placeBtnDiv.onclick = function(){
    var orderItemArr = [];
    for(var i=0; i<productlist.length; i++) {
        var prodObj = {
            "id": productlist[i].id,
            "brand": productlist[i].brand,
            "name": productlist[i].name,
            "price": productlist[i].price,
            "preview": productlist[i].preview,
            "isAccessory": productlist[i].isAccessory
        }

        orderItemArr.push(prodObj);
    }
    var dataObj = {
      amount: grandTotal,
      products: orderItemArr
  }
  localStorage.clear();
  var http = new XMLHttpRequest();
  var url = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";
  http.open('POST',url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(JSON.stringify(dataObj));
    
  }  
  

}

