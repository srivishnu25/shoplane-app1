var counter = 1;
setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 4){
    counter = 1;
  }
}, 5000);

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
          
         var firstPageData = response;  
         console.log(firstPageData) 
         renderData(firstPageData)           
})
var cartIcon = document.getElementById('count')
cartIcon.innerText = JSON.parse(localStorage.getItem('count'))===null ? 0: JSON.parse(localStorage.getItem('count'))

console.log(cartIcon.innerHTML)
var clothingSec = document.getElementById('clothing-section')
var accessorySec = document.getElementById('accessories-section')

function renderData(firstPageData){
 
  
      for(var i=0;i<firstPageData.length;i++){ 
        
        var cardDiv = document.createElement('div')
        cardDiv.className = "cardDiv"
        
        var card = document.createElement('a')
        card.className = "cards"
        card.href ="product.html?"+i
        cardDiv.appendChild(card)
        
        var img = document.createElement('img')
        img.src = firstPageData[i].preview
        img.className ="images"
        card.appendChild(img)
        
        var productDetails= document.createElement('div')
        productDetails.className = "productDetails-wrapper"
        card.appendChild(productDetails)

        var title = document.createElement('h4')
        title.innerText =firstPageData[i].name
        productDetails.appendChild(title)

        var brand = document.createElement('h5')
        brand.innerText =firstPageData[i].brand
        productDetails.appendChild(brand)

        var price = document.createElement('p')
        price.innerText ="Rs"+" "+firstPageData[i].price
        productDetails.appendChild(price)
        
        if(firstPageData[i].isAccessory){
          accessorySec .appendChild(cardDiv)
        }
        else{
          clothingSec.appendChild(cardDiv)
        }
       
      
      }
}


