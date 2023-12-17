var bookMrakNameInput = document.getElementById('bookMrakName');
var siteUrlInput = document.getElementById('siteUrl');
var submitBtn = document.getElementById('submitBtn');
var endValidationIcon = document.getElementById("endValidation");
var validationInfo = document.getElementById("validationInfo");

var bookContainer =[];

if(localStorage.getItem("books")!=null)
{
    bookContainer=JSON.parse(localStorage.getItem("books"))
    displayBook();
}
function addBook()
{
    if(validateSiteName() & validateSiteUrl()==true)
    {
        var site={
            name:bookMrakNameInput.value,
            url:siteUrlInput.value
        }
        bookContainer.push(site);
        console.log(bookContainer);
        localStorage.setItem("books",JSON.stringify(bookContainer))
        displayBook();
        clearForm();

    }
    else{
        validationInfo.classList.replace("d-none","d-block")
    }
    
}

function displayBook(){
    var cartoona =``
    for(var i=0; i<bookContainer.length;i++)
    {
        cartoona += `
        <tr>
                        <td>${i+1}</td>
                        <td>${bookContainer[i].name}</td>
                        <td class="visit-class"><a id="visitBtn" target="_blank" class="text-decoration-none btn text-white" href="${bookContainer[i].url}"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                        <td><button onclick="deleteBook(${i})" id="deleteBtn" class="btn text-white"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
        `
    }
    document.getElementById("tBody").innerHTML=cartoona;
}

function deleteBook(idx)
{
    bookContainer.splice(idx,1);
    localStorage.setItem("books",JSON.stringify(bookContainer))
    displayBook();
}

function clearForm(){
    bookMrakNameInput.value="";
    siteUrlInput.value ="";
}
function validateSiteName(){
    var regex =/^(\w){3,}(\s+\w+)*$/;
    return regex.test(bookMrakNameInput.value);
}
function validateSiteUrl(){
    var regex =/^((https?|http?|Https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\/\s]*)*$/;
    return regex.test(siteUrlInput.value)
}
function exitValidationInfo(){
    validationInfo.classList.replace("d-block","d-none")
}

function onTypingValidateName(){
    if(validateSiteName() ==true)
    {
        bookMrakNameInput.classList.replace("is-invalid","is-valid")
        
    }
    else{
        bookMrakNameInput.classList.replace("is-valid","is-invalid")
        
    }
}

function onTypingValidateUrl(){
    if(validateSiteUrl()==true)
    {
        siteUrlInput.classList.replace("is-invalid","is-valid")
    }
    else{
        siteUrlInput.classList.replace("is-valid","is-invalid")
    }
}
