const telAvivButton = document.querySelector(
  "#telAvivButton"
) as HTMLDivElement;
const haifaButton = document.querySelector("#haifaButton") as HTMLDivElement;
const ashdodButton = document.querySelector("#ashdodButton") as HTMLDivElement;
const rishonButton = document.querySelector("#rishonButton") as HTMLDivElement;
const beerShevaButton = document.querySelector(
  "#beerShevaButton"
) as HTMLDivElement;

const vipMenuTlvHaifaBeer = document.querySelector(
  ".menuTLV-BeerSheva-Haifa"
) as HTMLDivElement;

const menuRishonAshdod = document.querySelector(
  ".menuRishonAshdod"
) as HTMLDivElement;

let activeMenu: HTMLDivElement | null = null;
let activeButton: HTMLDivElement | null = null;

telAvivButton.addEventListener("click", () => {
  if (activeButton === telAvivButton) {
    if (activeMenu === vipMenuTlvHaifaBeer) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    vipMenuTlvHaifaBeer.style.display = "block";
    activeMenu = vipMenuTlvHaifaBeer;
    activeButton = telAvivButton;
  }
});

haifaButton.addEventListener("click", () => {
  if (activeButton === haifaButton) {
    if (activeMenu === vipMenuTlvHaifaBeer) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    vipMenuTlvHaifaBeer.style.display = "block";
    activeMenu = vipMenuTlvHaifaBeer;
    activeButton = haifaButton;
  }
});

beerShevaButton.addEventListener("click", () => {
  if (activeButton === beerShevaButton) {
    if (activeMenu === vipMenuTlvHaifaBeer) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    vipMenuTlvHaifaBeer.style.display = "block";
    activeMenu = vipMenuTlvHaifaBeer;
    activeButton = beerShevaButton;
  }
});

rishonButton.addEventListener("click", () => {
  if (activeButton === rishonButton) {
    if (activeMenu === menuRishonAshdod) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    menuRishonAshdod.style.display = "block";
    activeMenu = menuRishonAshdod;
    activeButton = rishonButton;
  }
});

ashdodButton.addEventListener("click", () => {
  if (activeButton === ashdodButton) {
    if (activeMenu === menuRishonAshdod) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    menuRishonAshdod.style.display = "block";
    activeMenu = menuRishonAshdod;
    activeButton = ashdodButton;
  }
});
