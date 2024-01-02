
//API
const BASE_URL =
   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


//selectors    

//acess selectors
const dropDowans = document.querySelectorAll('.convert select');


let amts = document.querySelector('#amount')

const btn = document.querySelector('#btn')
const fromcurrency = document.querySelector('#fromCurrency');
const tocurrency = document.querySelector('#toCurrency');

const msg = document.querySelector('#result')

// acess code form countary.js

for (let keys in countryList) {
   console.log(keys, countryList[keys])

}

//  append all countary in select

for (const select of dropDowans) {
   for (currCode in countryList) {
      let newOption = document.createElement('option')
      newOption.innerHTML = currCode;
      newOption.value = currCode
      select.append(newOption)
      if (select.name === 'from' && currCode === "USD") {
         newOption.selected = 'selected'
      }
      else if (select.name === 'to' && currCode === "INR") {
         newOption.selected = 'selected'
      }

      select.addEventListener('change', (evt) => {
         updateFlag(evt.target);
      })

   }

}



// for update flag 
const updateFlag = (element) => {
   let currCode = element.value
   //get countary code by currcode

   let countaryCode = countryList[currCode]
   let url = `https://flagsapi.com/${countaryCode}/flat/64.png`
   let img = element.parentElement.querySelector("img")
   img.src = url

}


//request  form  api 
const updateCurrency = async () => {
   let amt = document.querySelector('#amount')
   let amtVal = amt.value

   if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amt.value = "1"
   }


   //api working only lower case 

   const url = `${BASE_URL}/${fromcurrency.value.toLowerCase()}/${tocurrency.value.toLowerCase()}.json`

   let response = await fetch(url)
   let data = await response.json()
   let CurrExchangeRate = data[tocurrency.value.toLowerCase()]
   console.log(CurrExchangeRate)

   let finalAmount = amtVal * CurrExchangeRate
   

   //send as parameter to showMsg fn
   showMsg(finalAmount, amtVal)

}


//show msg function 

const showMsg = (finalAmount, amtVal) => {
   msg.innerText = `${amtVal} ${fromcurrency.value} = ${finalAmount} ${tocurrency.value}`
}

//eventLlistner 

btn.addEventListener('click',  (evt)=>{
   evt.preventDefault()
   updateCurrency()
  

})

//load 
window.addEventListener('load',()=>{
  updateCurrency()
})

 amts.addEventListener('keydown',(evt)=>{
   
if(evt.keyCode === 13){
 
   evt.preventDefault()
   updateCurrency();
   

}
})