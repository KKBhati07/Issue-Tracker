(() => {
    //creating empty array to store fetched items for performance
    let issueArray = new Array();

    //getting elements by their iDs
    const searchContainer = document.getElementById("search-container");
    const itemsContainer = $("#items-container");
    const addIssueForm = $("#add-issue-form")
    const description = document.getElementById("description");
    const issueDetails = document.getElementById("issue-details");

    //search checkboxes
    const checkboxBug = document.getElementById("checkbox-bug");
    const checkboxUI = document.getElementById("checkbox-ui");
    const checkboxDuplicates = document.getElementById("checkbox-duplicates");
    const checkboxDocumentation = document.getElementById("checkbox-documentation");

    //search by text
    const searchInput = document.getElementById("search-by-text");

    // edit form
    const projectEditForm = document.getElementById("edit-project-from-container");

    // calling function on loading the script
    onLoad();

    //function to open search bar
    function openSearchContainer() {
        searchContainer.style.height = "20%";
        searchContainer.style.padding = "1vh";
        searchContainer.style.borderTop = "2px solid var(--borderColor)";
        $(".heading-edit-btn-container").css("height", "6%");
        itemsContainer.css("height", "45vh");
    }

    //function to close search bar
    function closeSearchContainer() {
        searchContainer.style.height = "0px";
        searchContainer.style.border = "none";
        searchContainer.style.padding = "0vh";
        $(".heading-edit-btn-container").css("height", "10%");
        itemsContainer.css("height", "58vh");
    }

    //ON LOAD FUNCTION
    async function onLoad() {
        //using fetch and API endpoint to load projects instead of AJAX request
        const response = await fetch(`/api/v1/issues/${description.dataset.id}`);
        const data = await response.json();
        issueArray = data.data;
        renderItems(data.data);
    }

    function renderItems(itemsArray) {
        itemsArray.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("item-container", "on-hover");
            div.id = "item-container";
            div.dataset.id = `container-${item._id}`;
            div.innerHTML = `<div class="issue-author-name-container">
        <p class="project-name" data-id="${item._id}" id="issue-title"><strong id="issue-title" data-id="${item._id}">${item.title}</strong></p>
        <p class="author-name" data-id="${item._id}" id="author-name"><small id="author-name" data-id="${item._id}">Issue created by: </small>${item.author}</p>
      </div>
      <img src="/images/icons/close.png" alt="delete button" data-id="${item._id}" class="delete-btn" id="delete-btn">`;
            itemsContainer.prepend(div);
        });
    }




    // ==================TO CREATE=====================
    addIssueForm.on("submit", (event) => {
        event.preventDefault();
        let data = addIssueForm.serialize()
        createIssue(data);
    });

    //making AJAX request to create a issue
    function createIssue(data) {
        $.ajax({
            method: "post",
            url: "/issues/create",
            data: data,
            success: function (response) {
                issueArray.push(response.data);
                renderItem(response.data);
                addIssueForm[0].reset();

                //to notify user of successful entry
                toastr.success(response.message);
            }
            // if something goes wrong
        }).fail((error) => {
            //to notify user
            toastr.error("Unable to create Issue");
        });

    }
    //to render created issue on DOM
    function renderItem(item) {
        const div = document.createElement("div");
        div.classList.add("item-container", "on-hover");
        div.id = "item-container";
        div.dataset.id = `container-${item._id}`;
        div.innerHTML = `<div class="issue-author-name-container">
        <p class="project-name" data-id="${item._id}" id="issue-title"><strong id="issue-title" data-id="${item._id}">${item.title}</strong></p>
        <p class="author-name" data-id="${item._id}" id="author-name"><small id="author-name" data-id="${item._id}">Issue created by: </small>${item.author}</p>
      </div>
      <img src="/images/icons/close.png" alt="delete button" data-id="${item._id}" class="delete-btn" id="delete-btn">`;
        itemsContainer.prepend(div);
    }



    // ==================ISSUE DETAILS=============
    //to render the details of the issue
    function renderIssueDetails(id) {
        let itemIndex = issueArray.findIndex((item) => {
            return item._id === id;
        });
        const tagsContainer = document.createElement('p');
        tagsContainer.classList.add('tags-container');
        tagsContainer.textContent = "Labels: "

        // to fetch the labels
        issueArray[itemIndex].labels.forEach((label, index) => {
            const tagElement = document.createElement('span');
            tagElement.textContent = label;
            tagElement.classList.add('tag');
            if (index < issueArray[itemIndex].labels.length - 1) {
                tagElement.textContent += ', ';
            }
            tagsContainer.appendChild(tagElement);
        });
        issueDetails.innerHTML = `<h2>${issueArray[itemIndex].title}</h2>
    <img src="/images/icons/close-white.png" alt="close button" id="close-issue-details-btn">
    <div>
        <p>${issueArray[itemIndex].description}</p>

    </div>`
        issueDetails.appendChild(tagsContainer);
    }




    //  ===============TO DELETE=============
    // making AJAX request to delete issue
    function toDestroy(id) {
        $.ajax({
            method: "delete",
            url: `/issues/destroy/${id}`,
            success: (response) => {
                var element = $(`[data-id="container-${response.id}"]`);
                //removing deleted issue from DOM
                element.remove();
                //to notify user of successful entry
                toastr.success(response.message);
            }
            //if something goes wrong
        }).fail((error) => {
            //to notify user
            toastr.success("Unable to delete Issue");
        });
    }



    // ==========TO SEARCH===================

    //search by labels
    checkboxBug.addEventListener("change", handleCheckboxChange);
    checkboxUI.addEventListener("change", handleCheckboxChange);
    checkboxDuplicates.addEventListener("change", handleCheckboxChange);
    checkboxDocumentation.addEventListener("change", handleCheckboxChange);
    //function to handle search by labels
    function handleCheckboxChange() {
        const selectedTags = [];
        if (checkboxBug.checked) selectedTags.push("Bug");
        if (checkboxUI.checked) selectedTags.push("UI");
        if (checkboxDuplicates.checked) selectedTags.push("Duplicates");
        if (checkboxDocumentation.checked) selectedTags.push("Documentation");

        // Clear the current items in the container
        itemsContainer.html("");

        //if not tag is selected, then to render all the items
        if (selectedTags.length == 0) {
            renderItems(issueArray);
        } else {
            const filteredIssues = issueArray.filter((issue) => {
                return issue.labels.some((label) => selectedTags.includes(label));
            });
            renderItems(filteredIssues);
        }
    }

    //search by text input
    searchInput.addEventListener("keyup", (event) => {
        const searchText = event.target.value.toLowerCase();
        // to load all the elements if the search field is empty
        if (searchText == "") {
            itemsContainer.html("");
            renderItems(issueArray);

        }
        else {
            const filteredIssues = issueArray.filter((issue) => {
                const name = issue.title.toLowerCase();
                const description = issue.description.toLowerCase();
                const author = issue.author.toLowerCase();
                return name.includes(searchText) || description.includes(searchText) || author.includes(searchText);
            });
            // Clear the current items in the container
            itemsContainer.html("");
            // Render the filtered issues
            renderItems(filteredIssues);

        }
    });


    
    // =================GLOBAL EVENT LISTENER======================


    //setting event listener on whole document
    document.addEventListener("click", (event) => {
        let eventId = event.target.id;

        //for search button
        if (eventId == "open-search-container") openSearchContainer();
        else if (eventId == "close-search-btn") closeSearchContainer();

        //to delete a issue
        else if (eventId == "delete-btn") toDestroy(event.target.dataset.id);

        // for issue details
        else if (eventId == "item-container") {
            let itemId = event.target.dataset.id.split("-")[1];
            renderIssueDetails(itemId);
            $("#issue-detail-container").css("display", "flex");
        }
        else if (eventId == "issue-title") {
            renderIssueDetails(event.target.dataset.id);
            $("#issue-detail-container").css("display", "flex");
        } else if (eventId == "author-name") {
            renderIssueDetails(event.target.dataset.id);
            $("#issue-detail-container").css("display", "flex");
        }
        else if (eventId == "close-issue-details-btn") $("#issue-detail-container").css("display", "none");

        // for edit form popup
        else if (eventId == "project-edit-button") projectEditForm.style.display = "flex";
        else if (eventId == "close-edit-project-btn") projectEditForm.style.display = "none";
    });
})();