(()=>{

    //setting click listeners to open and close menu
    $("#open-menu-btn").on("click", ()=>{
        $("#menu-container").css("display","flex");
    });
    $("#close-popup-menu-btn").on("click", ()=>{
        $("#menu-container").css("display","none");
    });

})();