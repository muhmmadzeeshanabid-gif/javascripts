const notePad = document.querySelector("#note");
const saveBtn = document.querySelector("#saveBtn");
const clearBtn = document.querySelector("#clearBtn");


notePad.value = localStorage.getItem("myNote") || "";

saveBtn.addEventListener("click",() =>{
  
  if (notePad.value.trim() === ""){
    alert("please enter the text")
  }

 else{ localStorage.setItem("myNote", notePad.value);
  alert ("✅ Note saved successfully!");}
});

clearBtn.addEventListener("click",()=>{
  notePad.value = "";
  localStorage.removeItem("myNote");
  alert("Note Cleared!");
});