// Place this at the bottom of the <input>s, unless you're running this after document is ready

/*
var btn = document.getElementsByClassName("submit-btn")

btn.onclick=function(){
  event.preventDefault();
  console.log(document.getElementsByClassName("login-field_input").value)
}

*/
function validateForm() {
    event.preventDefault()
    console.log("validate form")
    console.log(document.getElementById("username").value)
    console.log(document.getElementById("password").value)

    if (document.getElementById("username").value == "admin"
        && document.getElementById("password").value == "p@ssword") {
            console.log("woh")
            window.open('kkrabFull.html', '_self');
        }
  }