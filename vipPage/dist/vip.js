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
    if (activeButton === telAvivButton) {
        if (activeMenu === vipMenuTlvHaifaBeer) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        vipMenuTlvHaifaBeer.style.display = "block";
        activeMenu = vipMenuTlvHaifaBeer;
        activeButton = telAvivButton;
    }
});
haifaButton.addEventListener("click", function () {
    if (activeButton === haifaButton) {
        if (activeMenu === vipMenuTlvHaifaBeer) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        vipMenuTlvHaifaBeer.style.display = "block";
        activeMenu = vipMenuTlvHaifaBeer;
        activeButton = haifaButton;
    }
});
beerShevaButton.addEventListener("click", function () {
    if (activeButton === beerShevaButton) {
        if (activeMenu === vipMenuTlvHaifaBeer) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        vipMenuTlvHaifaBeer.style.display = "block";
        activeMenu = vipMenuTlvHaifaBeer;
        activeButton = beerShevaButton;
    }
});
rishonButton.addEventListener("click", function () {
    if (activeButton === rishonButton) {
        if (activeMenu === menuRishonAshdod) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        menuRishonAshdod.style.display = "block";
        activeMenu = menuRishonAshdod;
        activeButton = rishonButton;
    }
});
ashdodButton.addEventListener("click", function () {
    if (activeButton === ashdodButton) {
        if (activeMenu === menuRishonAshdod) {
            activeMenu.style.display = "none";
            activeMenu = null;
            activeButton = null;
        }
    }
    else {
        if (activeMenu) {
            activeMenu.style.display = "none";
        }
        menuRishonAshdod.style.display = "block";
        activeMenu = menuRishonAshdod;
        activeButton = ashdodButton;
    }
});
