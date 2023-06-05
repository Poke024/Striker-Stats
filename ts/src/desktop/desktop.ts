import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";
import * as $ from "jquery";
// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

var activeNav = (document.getElementById("tierLists") as HTMLElement);
activeNav.style.background = "rgb(27, 51, 82)";
var activeTab = (document.getElementById("tierListsContent") as HTMLElement);
activeTab.style.display = "block";
var activeRole = (document.getElementById("forward") as HTMLElement);
activeRole.style.background = "rgb(36, 64, 94)";

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
    let clicked = (event.currentTarget) as HTMLElement;
    if (clicked != activeNav && clicked != activeRole) {
        clicked.style.background = rgbString;
    }
}

function changeRole(event) {
    console.log("Fired changeRole");
    let clickedRole = (event.currentTarget) as HTMLElement;
    activeRole.style.background = "rgb(38, 39, 39)";
    activeRole = clickedRole;
    activeRole.style.background = "rgb(36, 64, 94)";
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

for (var role of Array.from(document.getElementsByClassName("roleOption") as HTMLCollectionOf<HTMLElement>)) {
    role.addEventListener('click', changeRole);
    role.addEventListener('mouseover', (event) => {
        changeColor(event, "rgb(32, 34, 58)");
    });
    role.addEventListener('mouseleave', (event) => {
        changeColor(event, "rgb(38, 39, 39)");
    });
    role.addEventListener('mousedown', (event) => {
        changeColor(event, "rgb(38, 39, 39)");
    });
}


