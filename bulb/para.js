const bulb = document.querySelector("#bulb");
const onBtn = document.querySelector("#onBtn");
const offBtn = document.querySelector("#offBtn");


onBtn.addEventListener("click",()=>{
 bulb.src = "https://www.w3schools.com/js/pic_bulbon.gif";
});

offBtn.addEventListener("click",()=>{
bulb.src = "https://www.w3schools.com/js/pic_bulboff.gif";


});