function handleClick(button: HTMLDivElement, menu: HTMLDivElement) {
  if (activeButton === button) {
    if (activeMenu === menu) {
      activeMenu.style.display = "none";
      activeMenu = null;
      activeButton = null;
    }
  } else {
    if (activeMenu) {
      activeMenu.style.display = "none";
    }
    menu.style.display = "block";
    activeMenu = menu;
    activeButton = button;
  }
}

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

telAvivButton.addEventListener("click", () =>
  handleClick(telAvivButton, vipMenuTlvHaifaBeer)
);
haifaButton.addEventListener("click", () =>
  handleClick(haifaButton, vipMenuTlvHaifaBeer)
);
beerShevaButton.addEventListener("click", () =>
  handleClick(beerShevaButton, vipMenuTlvHaifaBeer)
);
rishonButton.addEventListener("click", () =>
  handleClick(rishonButton, menuRishonAshdod)
);
ashdodButton.addEventListener("click", () =>
  handleClick(ashdodButton, menuRishonAshdod)
);
