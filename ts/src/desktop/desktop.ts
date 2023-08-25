import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

import { Striker } from "../striker";
import strikersJson from '../strikers.json';
// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

/* Navigation Bar & Tab Functionality */
var activeNav = (document.getElementById("tierLists") as HTMLElement);
var activeTab = (document.getElementById("tierListsContent") as HTMLElement);
activeNav.style.background = "rgb(27, 51, 82)";
activeTab.style.display = "block";

var cur_striker = new Striker(strikersJson["AiMi"]);
console.log(JSON.stringify(cur_striker));

function changeTab(event) {
    let clickedNav = ((event.currentTarget) as HTMLElement);
    console.log("Fired changeTab on " + clickedNav.className + ":" + clickedNav.id);
    if (clickedNav == activeNav) { return; }
    
    activeNav.style.background = "rgb(49, 53, 89)";
    activeNav = clickedNav;
    activeTab.style.display = "none";
    if (clickedNav.id != "settingsButton") {
        activeNav.style.background = "rgb(27, 51, 82)";
        activeTab = (document.getElementById(clickedNav.id + "Content") as HTMLElement);
    } else {
        activeTab = (document.getElementById("settingsContent") as HTMLElement);
    }
    activeTab.style.display = "block";
}

for (var tab of Array.from(document.getElementsByClassName("tabLink") as HTMLCollectionOf<HTMLElement>)) {
    tab.addEventListener('click', changeTab);
    tab.addEventListener('mouseover', (event) => {
        changeEventColor(event, "rgb(32, 34, 58)");
    });
    tab.addEventListener('mouseleave', (event) => {
        changeEventColor(event, "rgb(49, 53, 89)");
    });
    tab.addEventListener('mousedown', (event) => {
        changeEventColor(event, "rgb(39, 39, 39)");
    });
}
(document.getElementById("settingsButton") as HTMLElement).addEventListener('click', changeTab);

/* App Info Pages Functionality */
var activeInfoLink = (document.getElementById("premium") as HTMLElement);
var activeInfoIcon = (document.getElementById("premiumIcon") as HTMLElement);
var activeInfoTitle = (document.getElementById("premiumTitle"));
var activeInfoPage = (document.getElementById("premiumInfo") as HTMLElement);
activeInfoIcon.style.background = "rgb(27, 51, 82)";
activeInfoTitle.style.color = "rgb(255, 255, 0)";
activeInfoPage.style.display = "block";

function changeInfo(event) {
    let clickedLink = ((event.currentTarget) as HTMLElement);
    console.log("Fired changeInfo on " + clickedLink.className + ":" + clickedLink.id);

    if (clickedLink == activeInfoLink) { return; }

    activeInfoLink = clickedLink;
    activeInfoIcon.style.background = "rgb(51, 84, 122)";
    activeInfoTitle.style.color = "white";
    activeInfoPage.style.display = "none";

    activeInfoIcon = (document.getElementById(clickedLink.id + "Icon") as HTMLElement);
    activeInfoTitle = (document.getElementById(clickedLink.id + "Title") as HTMLElement);
    activeInfoPage = (document.getElementById(clickedLink.id + "Info") as HTMLElement);
    activeInfoIcon.style.background = "rgb(27, 51, 82)";
    activeInfoTitle.style.color = "rgb(255, 255, 0)";
    activeInfoPage.style.display = "block";
}

for (var link of Array.from(document.getElementsByClassName("pageLink info") as HTMLCollectionOf<HTMLElement>)) {
    let target = (document.getElementById(link.id + "Icon") as HTMLElement);
    link.addEventListener('click', changeInfo);
    link.addEventListener('mouseover', (event) => {
        changeElementColor(target, "rgb(27, 51, 82)");

    });
    link.addEventListener('mouseleave', (event) => {
        changeElementColor(target, "rgb(51, 84, 122)");
    });
    link.addEventListener('mousedown', (event) => {
        changeElementColor(target, "rgb(39, 39, 39)");
    });
}

/* Settings Pages Functionality */
var activeSettingsLink = (document.getElementById("inGame") as HTMLElement);
var activeSettingsIcon = (document.getElementById("inGameIcon") as HTMLElement);
var activeSettingsTitle = (document.getElementById("inGameTitle"));
var activeSettingsPage = (document.getElementById("inGameSettings") as HTMLElement);
activeSettingsIcon.style.background = "rgb(27, 51, 82)";
activeSettingsTitle.style.color = "rgb(255, 255, 0)";
activeSettingsPage.style.display = "block";

function changeSettings(event) {
    let clickedLink = ((event.currentTarget) as HTMLElement);
    console.log("Fired changeSettings on " + clickedLink.className + ":" + clickedLink.id);

    if (clickedLink == activeSettingsLink) { return; }

    activeSettingsLink = clickedLink;
    activeSettingsIcon.style.background = "rgb(51, 84, 122)";
    activeSettingsTitle.style.color = "white";
    activeSettingsPage.style.display = "none";

    activeSettingsIcon = (document.getElementById(clickedLink.id + "Icon") as HTMLElement);
    activeSettingsTitle = (document.getElementById(clickedLink.id + "Title") as HTMLElement);
    activeSettingsPage = (document.getElementById(clickedLink.id + "Settings") as HTMLElement);
    activeSettingsIcon.style.background = "rgb(27, 51, 82)";
    activeSettingsTitle.style.color = "rgb(255, 255, 0)";
    activeSettingsPage.style.display = "block";
}

for (var link of Array.from(document.getElementsByClassName("pageLink settings") as HTMLCollectionOf<HTMLElement>)) {
    let target = (document.getElementById(link.id + "Icon") as HTMLElement);
    link.addEventListener('click', changeSettings);
    link.addEventListener('mouseover', (event) => {
        changeElementColor(target, "rgb(27, 51, 82)");

    });
    link.addEventListener('mouseleave', (event) => {
        changeElementColor(target, "rgb(51, 84, 122)");
    });
    link.addEventListener('mousedown', (event) => {
        changeElementColor(target, "rgb(39, 39, 39)");
    });
}

/* Role Select Functionality */
var activeRankedRole = (document.getElementById("rankedForward") as HTMLElement);
var activeTierRole = (document.getElementById("tierForward") as HTMLElement);
activeRankedRole.style.background = "rgb(36, 64, 94)";
activeTierRole.style.background = "rgb(36, 64, 94)";

/* Tier List Functionality */
function load_awakenings(role: string) {
    console.log("Fired load_awakenings, striker: " + cur_striker.name + ", role: " + role);
    ["GEAR", "BIS", "A", "B", "LR", "DNT"].forEach((tier) => {
        let cur_row = (document.getElementById(tier) as HTMLElement);
        while (cur_row.firstChild) {
            cur_row.removeChild(cur_row.lastChild);
        }

        let tier_items = cur_striker.get_tier_items(role, tier);
        console.log("Tier Items: " + tier_items);
        if (tier_items != null) {
            tier_items.forEach((name, index) => {
                const newImg = document.createElement("img");
                let re = / /gi;
                if (tier == "GEAR") {
                    newImg.src = "../../img/100px-Gears/" + role + "/" + name.replace(re, "_") + ".webp";
                } else {
                    newImg.src = "../../img/100px-Awakenings/" + name.replace(re, "_") + ".webp";
                }
                newImg.className = "awakeningImage";
                cur_row.appendChild(newImg);
                if (index != (tier_items.length - 1)) {
                    const spacer = document.createElement("div");
                    spacer.className = "awakeningSpacer";
                    cur_row.appendChild(spacer);
                }
            })
        }
    })
}

function changeRole(event) {
    let clickedRole = ((event.currentTarget) as HTMLElement);
    console.log("Fired changeRole on " + clickedRole.className + ":" + clickedRole.id);

    if ((clickedRole.id).includes("ranked")) {
        activeRankedRole.style.background = "rgb(25, 62, 104)";
        activeRankedRole = clickedRole;
        activeRankedRole.style.background = "rgb(36, 64, 94)";
    } else if ((clickedRole.id).includes("tier")) {
        activeTierRole.style.background = "rgb(25, 62, 104)";
        activeTierRole = clickedRole;
        activeTierRole.style.background = "rgb(36, 64, 94)";
        load_awakenings(activeTierRole.textContent.toUpperCase())
    }
}

for (var role of Array.from(document.getElementsByClassName("roleOption") as HTMLCollectionOf<HTMLElement>)) {
    role.addEventListener('click', changeRole);
    role.addEventListener('mouseover', (event) => {
        changeEventColor(event, "rgb(51, 84, 122)");
    });
    role.addEventListener('mouseleave', (event) => {
        changeEventColor(event, "rgb(25, 62, 104)");
    });
    role.addEventListener('mousedown', (event) => {
        changeEventColor(event, "rgb(39, 39, 39)");
    });
}

/* Striker Dropdown Functionality */
function changeStriker(event) {
    let dropdown = (event.currentTarget as HTMLSelectElement);
    let index = dropdown.selectedIndex;
    let option = dropdown.options[index];
    let striker = (<HTMLOptionElement>option).value;
    if (striker == "Ai.Mi") {
        striker = "AiMi";
    }
    console.log("Fired changeStriker, selected: " + striker);

    if(striker != cur_striker.name) {
        (document.getElementById("strikerImage") as HTMLImageElement).src = "../../img/strikers/Medium/Rookie/" + striker + ".png";
        cur_striker.name = striker;
        cur_striker.change(strikersJson[striker]);
        load_awakenings(activeTierRole.textContent.toUpperCase());
    }
}
(document.getElementById("strikerDropdown") as HTMLElement).addEventListener('change', changeStriker)


/* Shared Functions */
function changeEventColor(event, rgbString) {
    let clicked = ((event.currentTarget) as HTMLElement);
    console.log("Fired changeEventColor (" + rgbString + ") on " + clicked.className + ":" + clicked.id);
    if (clicked != activeNav && clicked != activeTierRole && clicked != activeRankedRole && clicked != activeSettingsIcon && clicked != activeInfoIcon) {
        clicked.style.background = rgbString;
    }
}

function changeElementColor(element, rgbString) {
    console.log("Fired changeElementColor (" + rgbString + ") on " + element.className + ":" + element.id);
    if (element != activeNav && element != activeTierRole && element != activeRankedRole && element != activeSettingsIcon && element != activeInfoIcon) {
        element.style.background = rgbString;
    }
}

load_awakenings(activeTierRole.textContent.toUpperCase())