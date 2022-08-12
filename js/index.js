const form = document.getElementById("myForm");
const inputGroupe = document.getElementsByClassName("input-groupe");
const inputCardNumber = document.getElementById("number");


// card number input
inputCardNumber.addEventListener("input",function(){
    let value = this.value;
    let newValue = value.replace(/\s+/g,'');
    let firstPosition = this.selectionStart;
    let parts = [];
    
    for (let index = 0; index < newValue.length; index += 4) {
        parts.push(newValue.substring(index,index + 4));
    }
    
    if(parts.length)
    {
        this.value = parts.join(' ');
        let lastPosition = this.selectionStart;
        if(lastPosition - firstPosition > 1)
            this.setSelectionRange(firstPosition, firstPosition);
    }

})


// form errors
form.addEventListener("submit",function(e){
    e.preventDefault();
    let array = Array.prototype.slice.call(inputGroupe);
    array.forEach(item => {
        let input = item.querySelectorAll("input");
        let error = item.querySelectorAll(".error");
        error[0].style.display = "none";
        input.forEach(myInput => {
            myInput.classList.remove("error-state");
            try{

                checkInput(myInput);
            }
            catch(errorMessage){
                error[0].style.display = "block";
                myInput.classList.add("error-state");
                error[0].innerHTML = errorMessage;
                return;
            }
        });
    });
});


function checkInput(input)
{
    let inputValue = input.value;
    // check empty input and input with spaces
    if ((!inputValue.length) || (!inputValue.trim().length))
        throw "Can't be blank";

    //check holdercard name input
    if(input.id == "name")
    {
        if(findNumber(inputValue))
            throw "Wrong format, letters only";
    }

    //check card number input
    if(input.id == "number")
    {
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
    }

    //check month input
    if(input.id == "month")
    {
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
        if (inputValue.length < 2)
            throw "Must be only 2 numbers";
            
    }
    
    //check year input
    if(input.id == "year")
    {
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
    }

    //check cvc input
    if(input.id == "cvc")
    {
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
        if ((inputValue.length < 3) || (inputValue.length > 3))
            throw "Must be only 3 numbers";
    }
}
















function findNumber(string)
{
    for (let index = 0; index < string.length; index++) {
        if(!isNaN(string.charAt(index)) && !(string.charAt(index) == " "))
            return true;
    }
    return false;
}

function findLetter(string)
{
    for (let index = 0; index < string.length; index++) {
        if(isNaN(string.charAt(index)) && !(string.charAt(index) == " "))
            return true;
    }
    return false;
}
