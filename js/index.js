const form = document.getElementById("myForm");
const input = document.querySelectorAll("input");

const inputGroupe = document.getElementsByClassName("input-groupe");
const inputCardNumber = document.getElementById("number");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputCvc = document.getElementById("cvc");

const nameHolder = document.getElementById("nameHolder");
const numberCard = document.getElementById("numberCard");
const numberMonth = document.getElementById("numberMonth");
const numberYear = document.getElementById("numberYear");
const numberCvc = document.getElementById("numberCvc");

var tmpCard = '';
var tmpCvc = '';
var tmpYear = '';


//hide error when focus on input

input.forEach((e,index) => {
    e.addEventListener("input",function(){
        this.classList.remove("error-state");
        let parent = this.parentElement;
        if(parent.classList[0] != "input-groupe")
            parent = parent.parentElement;
        let error = parent.getElementsByClassName("error");
        
        error[0].style.display = "none";
    })
})

// card number input
inputCardNumber.addEventListener("input",function(event){

    if(this.value.length > 19)
        this.value = tmp;
    else
    {
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
        tmp = this.value;
    }

})

inputCvc.addEventListener("input",function(){
    if (this.value.length > 3)
        this.value = tmpCvc;
    else
        tmpCvc = this.value;
})

inputYear.addEventListener("input",function(){
    if (this.value.length > 4)
        this.value = tmpYear;
    else
        tmpYear = this.value;
})

// card month and year

inputMonth.addEventListener("input",function(e){
    if(this.value.length == 2)
        inputYear.focus();
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
    var partNumber = numberCard.getElementsByTagName("span");

    //initiallisation
    if (input.id == "name")
        nameHolder.innerHTML = "Cardholder Name";
    if(input.id == "number")
        fillZero(partNumber)
    if (input.id == "month")
        numberMonth.innerHTML = "00";
    if(input.id == "year")
        numberYear.innerHTML = "00";
    if (input.id == "cvc")
        numberCvc.innerHTML = "000"

    // check empty input and input with spaces
    if ((!inputValue.length) || (!inputValue.trim().length))
        throw "Can't be blank";

    //check holdercard name input
    if(input.id == "name")
    {
        nameHolder.innerHTML = input.value;
        if(findNumber(inputValue))
            throw "Wrong format, letters only";
    }

    //check card number input
    if(input.id == "number")
    {
        let numbers = input.value.split(' ');
        numbers.forEach((e , index) => {
            let listZero = partNumber[index].innerHTML.length - e.length;
            let valueZero = '';
            for (let i = 0; i < listZero; i++) {
                valueZero = valueZero + '0';
            }
            partNumber[index].innerHTML = e + valueZero;
        })
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
        if(input.value.length < 19)
            throw "Minimum 16 numbers";
        
        
    }

    //check month input
    if(input.id == "month")
    {
        if(input.value.length == 1)
            numberMonth.innerHTML = 0 + inputValue;
        else
            numberMonth.innerHTML = input.value;
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
    }
    
    //check year input
    if(input.id == "year")
    {
        if(input.value.length == 1)
            numberYear.innerHTML = 0 + inputValue;
        else
            numberYear.innerHTML = input.value;
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
            
    }

    //check cvc input
    if(input.id == "cvc")
    {
        numberCvc.innerHTML = input.value;
        if(findLetter(inputValue))
            throw "Wrong format, numbers only";
        if ((inputValue.length < 3))
            throw "Minimum 3 numbers";
        
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


function fillZero(list){
    for (let index = 0; index < list.length; index++) {
        list[index].innerHTML = "0000";
    }
}