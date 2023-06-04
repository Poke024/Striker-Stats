import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

var activeNav = (document.getElementById("strikers") as HTMLElement);
activeNav.className += " active";
var activeTab = (document.getElementById("strikersContent") as HTMLElement);
activeTab.style.display = "block";

function changeTab(event) {
    let clickedNav = (event.currentTarget) as HTMLElement;
    activeNav.className = activeNav.className.replace(" active", "");
    activeNav = clickedNav;
    activeNav.className += " active";
    activeTab.style.display = "none";
    activeTab = (document.getElementById(clickedNav.id + "Content") as HTMLElement);
    activeTab.style.display = "block";
}

(document.getElementById("strikers") as HTMLElement).addEventListener('click', changeTab);
(document.getElementById("sets") as HTMLElement).addEventListener('click', changeTab);
(document.getElementById("setBuilder") as HTMLElement).addEventListener('click', changeTab);
(document.getElementById("tierLists") as HTMLElement).addEventListener('click', changeTab);
(document.getElementById("matchHistory") as HTMLElement).addEventListener('click', changeTab);
(document.getElementById("settings") as HTMLElement).addEventListener('click', changeTab);


