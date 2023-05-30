function handleClick(button, menu) {
    if (activeButton === button) {
        if (activeMenu === menu) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        menu.style.display = "block";
        activeMenu = menu;
        activeButton = button;
    }
}
var telAvivButton = document.querySelector("#telAvivButton");
var haifaButton = document.querySelector("#haifaButton");
var ashdodButton = document.querySelector("#ashdodButton");
var rishonButton = document.querySelector("#rishonButton");
var beerShevaButton = document.querySelector("#beerShevaButton");
var vipMenuTlvHaifaBeer = document.querySelector(".menuTLV-BeerSheva-Haifa");
var menuRishonAshdod = document.querySelector(".menuRishonAshdod");
var activeMenu = null;
var activeButton = null;
telAvivButton.addEventListener("click", function () {
    return handleClick(telAvivButton, vipMenuTlvHaifaBeer);
});
haifaButton.addEventListener("click", function () {
    return handleClick(haifaButton, vipMenuTlvHaifaBeer);
});
beerShevaButton.addEventListener("click", function () {
    return handleClick(beerShevaButton, vipMenuTlvHaifaBeer);
});
rishonButton.addEventListener("click", function () {
    return handleClick(rishonButton, menuRishonAshdod);
});
ashdodButton.addEventListener("click", function () {
    return handleClick(ashdodButton, menuRishonAshdod);
});
