﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// The greatest function of all time
// saves 20 keystrokes and makes the code way easier to read
// honestly who on earth thought document.getElementById was a good idea????
function getID(id) {
    return document.getElementById(id);
}

//Does extremely complicated math
function addCalc() {
    const num1 = getID("num1").value;
    const num2 = getID("num2").value;
    let sum = Number(num1) + Number(num2);
    getID("answer").innerHTML = sum;
}

// Shows the mobile tab panel
function showTabPanel() {

    if (getID("tabPanel").style.display !== "none") {
        getID("tabPanel").style.display = "none";
        getID("hamButton").classList.remove("hamButtonOn");
    } else {
        getID("tabPanel").style.display = "flex";
        getID("hamButton").classList.add("hamButtonOn");
    }

}

function darkMode() {
    var enableDM = document.querySelectorAll(".enableDM");
    if (document.body.className !== "darkMode") {
        document.body.className = "darkMode";
        for (let i = 0; i < enableDM.length; i++) {
            enableDM[i].classList.add("darkMode");
        }
        getID("darkModeBtn").className = "darkModeBtnActive";
    } else {
        document.body.className = "";
        getID("darkModeBtn").className = "";
        for (let i = 0; i < enableDM.length; i++) {
            enableDM[i].classList.remove("darkMode");
        }
    }
}

function showDiv(divID, indicator = null, indicatorOffClass = null, indicatorOnClass = null, indicatorObject = null, divOffClass="displayOff") {
    // toggle divs on and off, and control an indicator flag, to show which tab is open, or other things.
    // divID is the div you want to show
    // indicator is the indicator that you want to turn on, such as the changing the color of a tab
    // indicatorObject is used to keep track of what tab is open in a group. 
    // I believe there is some redundancy here that I need to clean up.

    // Check if the div is off
    if (getID(divID).classList.contains(divOffClass)) {
        getID(divID).classList.remove(divOffClass);
        if(indicator){
            changeClass(indicator, indicatorOffClass, indicatorOnClass);
        }
        // check for an indicatorObject
        if(indicatorObject){
            // check that the indicatorObject is not empty
            if (indicatorObject.divID !== null) {
                
                showDiv(indicatorObject.divID, indicatorObject.indicator, indicatorObject.indicatorOffClass, indicatorObject.indicatorOnClass, indicatorObject);
            }
            indicatorObject.divID = divID;
            indicatorObject.indicator = indicator;
            indicatorObject.indicatorOffClass = indicatorOffClass;
            indicatorObject.indicatorOnClass = indicatorOnClass;
        }

    } else {
        getID(divID).classList.add(divOffClass);

        if (indicator) {
            changeClass(indicator, indicatorOffClass, indicatorOnClass);
        }
        if(indicatorObject){
            indicatorObject.divID = null;
            indicatorObject.indicator = null;
            indicatorObject.indicatorOffClass = null;
            indicatorObject.indicatorOnClass = null;
        }
    }
}

function changeClass(div, previousClass, newClass, toggle=true) {
    // Change CSS class, option to toggle.
    if(toggle){
        if (getID(div).classList.contains(newClass)) {
            getID(div).classList.remove(newClass);
            getID(div).classList.add(previousClass);
        } else {
            getID(div).classList.add(newClass);
            getID(div).classList.remove(previousClass);
        }
    } else {
        getID(div).classList.add(newClass);
        getID(div).classList.remove(previousClass);
    }
}



// =============================================================
//                      EVENT LISTENERS
// =============================================================
const darkModeBtn = getID("darkModeBtn");
darkModeBtn.addEventListener("click", darkMode);