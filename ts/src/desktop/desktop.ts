import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

var activeNav = (document.getElementById("setBuilder") as HTMLElement);
activeNav.style.background = "rgb(27, 51, 82)";
var activeTab = (document.getElementById("setBuilderContent") as HTMLElement);
activeTab.style.display = "block";

function changeTab(event) {
    let clickedNav = (event.currentTarget) as HTMLElement;
    activeNav.style.background = "rgb(49, 53, 89)";
    activeNav = clickedNav;
    activeNav.style.background = "rgb(27, 51, 82)";
    activeTab.style.display = "none";
    activeTab = (document.getElementById(clickedNav.id + "Content") as HTMLElement);
    activeTab.style.display = "block";
}

function changeColor(event, rgbString) {
    let clickedNav = (event.currentTarget) as HTMLElement;
    if (clickedNav != activeNav) {
        clickedNav.style.background = rgbString;
    }
}

for (var tab of Array.from(document.getElementsByClassName("tabLink") as HTMLCollectionOf<HTMLElement>)) {
    tab.addEventListener('click', changeTab);
    tab.addEventListener('mouseover', (event) => {
        changeColor(event, "rgb(32, 34, 58)");
    });
    tab.addEventListener('mouseleave', (event) => {
        changeColor(event, "rgb(49, 53, 89)");
    });
    tab.addEventListener('mousedown', (event) => {
        changeColor(event, "rgb(38, 39, 39)");
    });
}


