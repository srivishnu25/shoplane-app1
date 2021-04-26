var queryString = location.search.substring(1);


$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
         var k = queryString;
         var productPageData = response;  
         renderData(productPageData,k)           
})


 
function renderData(productPageData,k){
var mainSec = document.getElementById('main-container')
var leftSec = document.createElement('div')
leftSec.id = "left-section"

var previewImg = document.createElement('img')
previewImg.className="preview"
previewImg.src = productPageData[k].preview

leftSec.appendChild(previewImg)
mainSec.appendChild(leftSec)

var rightSec = document.createElement('div')
rightSec.id = "right-section"


var productName = document.createElement('h1')
productName.id = "product-name"
productName.innerHTML = productPageData[k].name
rightSec.appendChild(productName)

var productBrand = document.createElement('h4')
productBrand.id = "product-brand"
productBrand.innerHTML = productPageData[k].brand
rightSec.appendChild(productBrand)

var productPrice = document.createElement('h3')
productPrice.id = "product-price"
productPrice.innerText = "Price: Rs "
rightSec.appendChild(productPrice)

var productRate = document.createElement('span')
productRate.id = "rate"
productRate.innerHTML = productPageData[k].price
productPrice.appendChild(productRate)

var description = document.createElement('h3')
description.innerText = "Description"
rightSec.appendChild(description)

var para = document.createElement('p')
para.innerText = productPageData[k].description
rightSec.appendChild(para)

var productView = document.createElement('div')
rightSec.appendChild(productView)

var productViewTitle = document.createElement('h3')
productViewTitle.innerText = "Product Preview"
productView.appendChild(productViewTitle)

var productImages = document.createElement('div')
productImages.id = "product-images"
productView.appendChild(productImages)

mainSec.appendChild(rightSec)

for(var n=0;n<5;n++){
 
  var img = document.createElement('img')
  img.className = "images"
  img.src = productPageData[k].photos[n]
  productImages.appendChild(img)
}
var p = document.getElementsByClassName('images')
p[0].addEventListener("click",function(){
  previewImg.src = p[0].src
})

p[1].addEventListener("click",function(){
     previewImg.src = p[1].src
   })
p[2].addEventListener("click",function(){
     previewImg.src = p[2].src
  })

p[3].addEventListener("click",function(){
    previewImg.src = p[3].src
  })

p[4].addEventListener("click",function(){
    previewImg.src = p[4].src
  })
 
  var bttnDiv = document.createElement('div')
  bttnDiv.className = "bttnDiv"
  bttnDiv.innerText="Add to cart"
  var count=JSON.parse(localStorage.getItem('count'))===null ? 0: JSON.parse(localStorage.getItem('count'));
  var cartIcon = document.getElementById('count')
  cartIcon.innerText = JSON.parse(localStorage.getItem('count'))===null ? 0: JSON.parse(localStorage.getItem('count'))
  
 
  var productItems = (JSON.parse(localStorage.getItem('product-list')) === null || JSON.parse(localStorage.getItem('product-list')) === undefined )? [] : JSON.parse(localStorage.getItem('product-list'))
  
  
  //bttnDiv.setAttribute("onclick","myfunction()")
  bttnDiv.onclick=function(){
       bttnDiv.classList.add('bigger')
    setTimeout(function(){
        bttnDiv.classList.remove('bigger')
    },200)  
    count++;
    localStorage.setItem('count',count)
    cartIcon.innerText = JSON.parse(localStorage.getItem('count'))===null ? 0: JSON.parse(localStorage.getItem('count'))
    productPageData[k].itemcount = 1;
     if(JSON.parse(localStorage.getItem('product-list'))=== null){
          productItems[0]=productPageData[k];
    }
    if(JSON.parse(localStorage.getItem('product-list'))!== null){
        productItems=JSON.parse(localStorage.getItem('product-list'))
        var pos=-1;
        
        for(var g=0;g<productItems.length;g++){
            if(productItems[g].id === productPageData[k].id){
              pos=g
            }
        }
        if(pos > -1){
          productItems[pos].itemcount = productItems[pos].itemcount + 1;

        }
        else{
          productPageData[k].itemcount = 1;
          productItems.push(productPageData[k])

        }
         
    }
     localStorage.setItem('product-list',JSON.stringify(productItems))
    console.log(JSON.parse(localStorage.getItem('count')))
  }
  rightSec.appendChild(bttnDiv)
}

