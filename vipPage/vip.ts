let activeMenu: HTMLDivElement | null = null;
let activeButton: HTMLDivElement | null = null;

const handleClick = (button: HTMLDivElement, menu: HTMLDivElement) => {
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
};

// Event listener for each button -
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
