//Using IIFE to maintain the scope
(()=>{
//getting elements by their IDs
const addBtn=document.getElementById("add-project");
const container=document.getElementById("item-container");
const formContainer=document.getElementById("form-container");
//using JQuery syntax to get elements 
const itemsContainer=$("#items-container");
let newProjectForm=$("#add-project-form");



//calling it on app start
onLoad();

//onload function
async function onLoad(){
    //using fetch and API endpoint to load projects instead of AJAX request
    const response=await fetch("/api/v1/projects");
    const data=await response.json();
    renderItems(data.data);
}




//event listener to open and close the form to create a new project
addBtn.addEventListener("click",(event)=>{
    const display=getComputedStyle(formContainer).height;
    if(display=="0px"){
        addBtn.style.transform = "rotate(45deg)";
        formContainer.style.height = "30vh";
        formContainer.style.border = "2px solid var(--borderColor)";
        itemsContainer.css("height","45vh");
    }else{
        addBtn.style.transform = "rotate(0deg)";
        formContainer.style.height = "0vh";
        formContainer.style.border = "none";
        itemsContainer.css("height","75vh");
}

});


//to render all the items
function renderItems(itemsArray) {
    itemsArray.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("item-container", "on-hover");
        div.id="item-container";
        div.dataset.id=`container-${item._id}`;
        div.innerHTML=`<div class="project-author-name-container">
        <p class="project-name" data-id="${item._id}" id="project-name"><strong id="project-name" data-id="${item._id}">${item.name}</strong></p>
        <p class="author-name" data-id="${item._id}" id="author-name"><small id="author-name" data-id="${item._id}" >Project created by: </small>${item.author}</p>
      </div>
      <img src="/images/icons/close.png" alt="delete button" data-id="${item._id}" class="delete-btn" id="delete-btn">`;

    itemsContainer.prepend(div);
    });

}

// ===============TO CREATE==================

//event listener on form submit
newProjectForm.on("submit",async(event)=>{
    event.preventDefault();
    createProject(newProjectForm.serialize());
})


//making AJAX request to create a new project
async function createProject(data){
    $.ajax({
        method:"post",
        url: "/projects/create",
        data:data,
        success: (response)=> {
            renderItem(response.project);
            //to reset the form after successful entry
            newProjectForm[0].reset();
            //to notify user of successful entry
            toastr.success(response.message);
        }
        //if something goes wrong
    }).fail((error)=> {
        //to notify user
        toastr.error("Unable to create Project");
    });

}

//to render a newly created project on DOM 
function renderItem(item) {
        const div = document.createElement("div");
        div.classList.add("item-container", "on-hover");
        div.id="item-container";
        div.dataset.id=`container-${item._id}`;
        div.innerHTML=`<div class="project-author-name-container">
        <p class="project-name" data-id="${item._id}" id="project-name"><strong id="project-name" data-id="${item._id}">${item.name}</strong></p>
        <p class="author-name" data-id="${item._id}" id="author-name"><small id="project-name" data-id="${item._id}">Project created by: </small>${item.author}</p>
      </div>
      <img src="/images/icons/close.png" alt="delete button" data-id="${item._id}" class="delete-btn" id="delete-btn">`;

    itemsContainer.prepend(div);

}


// =============TO DELETE=============
function toDestroy(id){
    $.ajax({
        method:"delete",
        url:`/projects/destroy/${id}`,
        success:(response)=>{
            var element = $(`[data-id="container-${response.id}"]`);
            element.remove();
            //to notify user of successful deletion
            toastr.success(response.message);
        }
        //if something goes wrong
    }).fail((error)=>{
        //to notify user
        toastr.error("Unable to delete project");
    })
}

// =====GLOBAL EVENT LISTENER=========

//setting event listener to whole document
document.addEventListener("click",(event)=>{
    let eventId=event.target.id;

    //to go to individual project page
    if(eventId=="item-container"){
        let itemId=event.target.dataset.id.split("-")[1];
        window.location.href=`projects/issues/${itemId}`
    }
    else if(eventId=="project-name"||eventId=="author-name") window.location.href=`projects/issues/${event.target.dataset.id}`
    else if(eventId=="delete-btn") toDestroy(event.target.dataset.id);


})








})();