// CREDIT CARD MANAGEMENT SYSTEM
// Not sure if this will be a tab on the MMS or a separate page.
// Probably a tab.
// annoyingly 2 js files can't talk to eachother without Node.js or some other thing,
// so they will have to only talk through the HTML if necessary
// I'm hoping they won't need to communicate directly


class Debt {
    // Creates the Debt class
    constructor(name, balanceRemaining, minPayment) {
        this.name = name;
        this.balanceRemaining = Math.ceil(balanceRemaining);
        this.minPayment = Math.ceil(minPayment);
        this.balToMinRatio = ratioCalc(balanceRemaining, minPayment);
        this.init();
    };

    // pushes the debt to the debtList arrays
    init = function () {
        debtList.push(this);
        debtListByMinPayment.push(this);
        debtListByRatio.push(this);
    }
}

// initialize debtLists
const debtList = [];
const debtListByMinPayment = [];
const debtListByRatio = [];

//keep track of debt array
var activeDebtArray = [];


// INITIATE DEBTS HERE
//let chaseCard = new Debt("Chase Card", 477.42, 55); //PAID OFF!!!!!
//let creditOne = new Debt("Credit One", 380.94, 30); //PAID OFF!!!!!
let phone = new Debt("Joe's Phone", 711, 22.22);
let wellsFargoCard = new Debt("Wells Fargo", 1287.25, 39);
let capitalOne = new Debt("Capital One 1", 640.46, 25);
let capitalTwo = new Debt("Capital One 2", 579.23, 25);
//let jCareCredit = new Debt("Joe's Care Credit", 479.63, 57); //PAID OFF!!!!!
let eCareCreditCard = new Debt("Elizabeth's Care Credit", 555.76, 30);
let jPaypal = new Debt("Joe's Paypal", 2081.22, 66);
let ePaypal = new Debt("Elizabeth's Paypal", 2428.13, 76);
//let xbox = new Debt("Xbox", 279.84, 35); //PAID OFF!!!!!
let fortiva = new Debt("Fortiva Card", 556.71, 58);
//let affirm1 = new Debt("Affirm 1", 22.57, 22.57); //PAID OFF!!!!!
let jUpstartDebt = new Debt("Joe's Upstart", 2118.61, 194.54);
let eUpstartDebt = new Debt("Elizabeth's Upstart", 5179.16, 213.05);
//let rings = new Debt("Rings", 162.28, 39); //PAID OFF!!!!!
let homeDepotCard = new Debt("Home Depot Card", 442.37, 34);
//let affirm2 = new Debt("Affirm 2", 69.88, 23.30); //PAID OFF!!!!!
//let taxes = new Debt("Back Taxes", 282.79, 35); //PAID OFF!!!!!

// debtLists, sorted
sortByBalance(debtList);
sortByMinPayment(debtListByMinPayment);
sortByRatio(debtListByRatio);
// This ratio compares difficulty to pay off, with impact to cash flow.
// Larger number means it's easier to pay off and will have the most positive impact on cash flow.
// If two debts have the same balance, but A has a larger minimum payment than B, A will rank higher
// If two debts have the same minimum payment, but A has a larger balance than B, B will rank higher


function payDumpCalc(cash, array = debtListByRatio, buffer = 100) {
    // Calculates the best cards to pay off to improve cash flow, given a fixed cash amount.
    // This is being used by lumpSumCalc(), which uses multiple versions of this function to find the best algorithm

    let totalCost = 0;
    let totalMin = 0;
    const payArray = [];
    for (let i = 0; i < array.length; i++) {
        totalCost += array[i].balanceRemaining;
        totalMin += array[i].minPayment;
        payArray.push(array[i]);

        if (totalCost > cash + buffer) {
            // if we've over spent, remove that last option, and then find the closestMatch
            totalCost -= array[i].balanceRemaining;
            totalMin -= array[i].minPayment;
            payArray.pop();

            let remaining = cash - totalCost;

            let closestMatch = findCloseMatch(remaining, payArray);

            if (closestMatch) {
                payArray.push(closestMatch);

                totalCost += closestMatch.balanceRemaining;
                totalMin += closestMatch.minPayment;
            }
            break;

        }
    }
    // return an object so we can keep all of this data
    return {
        debts: payArray,
        totalCost: totalCost,
        totalMin: totalMin
    };
}

function payDumpCalcReverse(cash, buffer = 100, array = debtList) {
    // similar to payDumpCalc(), but runs in reverse. Essentially looks for the largest one that is affordable within the cash + buffer
    // and then tries to fit as much as it can on top of that.
    const reverseArray = [...array].reverse();

    let totalCost = 0;
    let totalMin = 0;

    const payArray = [];
    for (let i = 0; i < reverseArray.length; i++) {
        // Check if the total cost + balance of current debt is <= cash + buffer
        if ((totalCost + reverseArray[i].balanceRemaining) < (cash + buffer)) {
            // if true, add it.
            totalCost += reverseArray[i].balanceRemaining;
            totalMin += reverseArray[i].minPayment;
            payArray.push(reverseArray[i]);
        } else {
            continue;
        }
        if (totalCost > (cash + buffer)) {
            totalCost -= array[i].balanceRemaining;
            totalMin -= array[i].minPayment;
            payArray.pop();

            let remaining = cash - totalCost;

            let closestMatch = findCloseMatch(remaining, payArray);
            // if it returns something, push it
            if (closestMatch) {
                payArray.push(closestMatch);

                totalCost += closestMatch.balanceRemaining;
                totalMin += closestMatch.minPayment;
            }
            break;
        }
    }

    // return an object so we can keep all of this data
    return {
        debts: payArray,
        totalCost: totalCost,
        totalMin: totalMin
    };
}



function lumpSumCalc(num, buffer) {
    // Uses 3 different algorithms to determine amount to pay off
    // byBalance and byRatio are usually the best
    // byMinPayment is mostly useless but there may be edge cases where it's useful
    // I think byMinPayment could actually be improved, but it would need to use a whole different function


    let byRatio = payDumpCalc(num, debtListByRatio, buffer);
    let byBalance = payDumpCalc(num, debtList, buffer);
    let byBalanceReverse = payDumpCalcReverse(num, buffer);
    let byMinPayment = payDumpCalc(num, debtListByMinPayment, buffer);

    // console.log(`Using ratio: ${byRatio.totalCost} | ${byRatio.totalMin}`, byRatio.debts);
    // console.log(`Using balance: ${byBalance.totalCost} | ${byBalance.totalMin}`, byBalance.debts);
    // console.log(`Using balance REVERSE: ${byBalanceReverse.totalCost} | ${byBalanceReverse.totalMin}`, byBalanceReverse.debts);
    // console.log(`Using minimum payment: ${byMinPayment.totalCost} | ${byMinPayment.totalMin}`, byMinPayment.debts);

    return {
        ratio: byRatio,
        balance: byBalance,
        revBalance: byBalanceReverse,
        minPay: byMinPayment
    }
}

function findCloseMatch(num, currentArray, array = debtListByRatio) {
    // attempts to find the debt that can be paid with the remaining money
    const potentials = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].balanceRemaining <= num) {
            // check for duplicates
            if (!currentArray.includes(array[i])) {
                potentials.push(array[i]);
            }
        }
    }
    sortByBalance(potentials);
    return potentials[0];
}

function ratioCalc(a, b) {
    // simple ratio calculator, seems like this should be built in to js
    return b / a;
}

function sortByBalance(array) {
    // Sorts a debt array by balance remaining [DEFAULT SORT]
    function compareBalance(a, b) {
        return a.balanceRemaining - b.balanceRemaining;
    }

    array.sort(compareBalance);

}

function sortByMinPayment(array) {
    // Sorts a debt array by min payment
    function compareMinPayment(a, b) {
        return a.minPayment - b.minPayment;
    }

    array.sort(compareMinPayment);
}

function sortByRatio(array) {
    // Sorts a debt array by min payment
    function compareRatio(a, b) {
        return b.balToMinRatio - a.balToMinRatio;
    }

    array.sort(compareRatio);
}

function costPerMonth(array=debtList){
    // finds the total monthly cost of all of the debts in the array
    let costPerMonth = 0;
    for(let i=0; i<array.length; i++){
        costPerMonth += array[i].minPayment;
    }

    return costPerMonth;
}

function totalBalance(array=debtList){
    // finds the total balance of all the debts in the array.
    let totalBalance = 0;
    for(let i=0; i<array.length; i++){
        totalBalance += array[i].balanceRemaining;
    }
    return totalBalance;
}

// ========================================================================
//                        View Functions
// ========================================================================

// copy this for printDebtArray 
function printDebtArray(array){
    // prints any bill array
    // for use mostly in HTML contexts 
    //I could probably use ${THIS} thing here, but oh well.
    let str = "";
    array.forEach(obj => {
            str += "<p><strong>";
            str += obj.name;
            str += "</strong><br>";
            str += "$";
            str += obj.balanceRemaining;
            str += " | Min: $";
            str += obj.minPayment;
            str += " | Impact: ";
            str += Math.round(obj.balToMinRatio * 1000) / 1000; // Round for easy viewing
            str += "</p>";
            str += "<hr>";
    })
    return str;
}

function printToDebtListDisplay(array, text){
    // changes the title text, and runs printDebtArray on the array you fed to it.
    // Text is what appears in the Sort By: section on the page
    activeDebtArray = array;
    getID("sorted").innerHTML = text;
    HTMLdebtListDisplay.innerHTML = printDebtArray(array);
    showDiv("sortByDropdown", null, null, null, null, "sortByTuck");
}

function swapDirection(){
    // Swaps the sort direction of the list on screen
    printToDebtListDisplay([...activeDebtArray].reverse(), getID("sorted").innerHTML);

    // cancel out showDiv in printToDebtListDisplay
    // it's a bit of a hack, but it works
    showDiv("sortByDropdown", null, null, null, null, "sortByTuck");
}

function lumpSumUserCalc(){
    // reads the user input and then calls printLumpSumChoice() with the relevant params
    let userAmount;
    let userBuffer;
    // check that it's a number, if so, parse it as a float.
    // uses isFinite because NaN (Not A Number) IS A NUMBER
    // NaN === "number" will eval to TRUE
    // thanks Javascript.
    if(Number.isFinite(parseFloat(HTMLlumpSumAmount.value))){
        userAmount = parseFloat(HTMLlumpSumAmount.value);
    } else {
        HTMLlumpSumListArea.innerHTML = "Numbers only, please";
        return;
    }
    if(Number.isFinite(parseFloat(HTMLlumpSumBuffer.value))){
        userBuffer = parseFloat(HTMLlumpSumBuffer.value);
    } else {
        HTMLlumpSumListArea.innerHTML = "Numbers only, please";
        return;
    }

    // get the dropdown choice
    // This seems like a dumb way to do this, but I don't know a better way.
    // I am going to rewrite this better down the road (assuming there IS a better way)
    let dropdown = HTMLlumpSumInfo.value;

    let result = lumpSumCalc(userAmount, userBuffer)
    // Call printLumpSumChoice with the appropriate params
    switch(dropdown){
        case "Ratio":
            HTMLlumpSumListArea.innerHTML = printLumpSumChoice(result.ratio);
            break;
        case "Balance":
            HTMLlumpSumListArea.innerHTML = printLumpSumChoice(result.balance)
            break;
        case "Reverse Balance":
            HTMLlumpSumListArea.innerHTML = printLumpSumChoice(result.revBalance)
            break;
        case "Minimum Payment":
            HTMLlumpSumListArea.innerHTML = printLumpSumChoice(result.minPay)
            break;
        default:
            // You should only ever see this is the dropdown gets an option added to it, or if you mess around with the dev tools (misbehaving!)
            // The average user should NEVER see this
            HTMLlumpSumListArea.innerHTML = "<p>You chose a nonexistent option. Please do <em>not</em> misbehave.</p>"
    }
}

function printLumpSumChoice(object){
    // turns the data into markup so dump into the view.
    let obj = object;
    let str = "";
    //I could probably use ${THIS} thing here, but oh well.
    str += "<p><strong>Total Cost: $";
    str += obj.totalCost;
    str += "<br> Total Saved per month: $";
    str += obj.totalMin;
    str += "</strong>";
    str += "</p>";
    str += "<hr>";
    str += printDebtArray(object.debts);
    return str;


}


// =================================================================================================================================================
//                                                      EVENT LISTENERS
// =================================================================================================================================================

// Nav button

var activeDebtTab = {
    divID: null,
    indicator: null,
    indicatorOffClass: null,
    indicatorOnClass: null,
}

// debtTabs
const HTMLdebtStats = getID("debtStats");
HTMLdebtStats.addEventListener("click", function () { showDiv("debtStatsDropdown", "debtStats", null, "debtTabsActive", activeDebtTab) });

const HTMLlumpSum = getID("lumpSum");
HTMLlumpSum.addEventListener("click", function () { showDiv("lumpSumDropdown", "lumpSum", null, "debtTabsActive", activeDebtTab) });

const HTMLdebtList = getID("debtList");
HTMLdebtList.addEventListener("click", function () { showDiv("debtListDropdown", "debtList", null, "debtTabsActive", activeDebtTab) });

//===========================
//      debtDropdowns
//===========================
// Debt Stats
const HTMLdebtStatsDropdown = getID("debtStatsDropdown");
const HTMLcostPerMonth = getID("costPerMonth");
HTMLcostPerMonth.innerHTML = costPerMonth();
const HTMLtotalBalance = getID("totalBalance");
HTMLtotalBalance.innerHTML = totalBalance();
const HTMLnumOfDebts = getID("numOfDebts");
HTMLnumOfDebts.innerHTML = debtList.length;

// lump Sum calc
const HTMLlumpSumDropdown = getID("lumpSumDropdown");

const HTMLlumpSumAmount = getID("lumpSumAmount");
const HTMLlumpSumBuffer = getID("lumpSumBuffer");
const HTMLlumpSumCalcBtn = getID("lumpSumCalcBtn");

HTMLlumpSumCalcBtn.addEventListener("click", lumpSumUserCalc);

const HTMLlumpSumInfo = getID("lumpSumInfo");
HTMLlumpSumInfo.addEventListener("change", lumpSumUserCalc);

const HTMLlumpSumListArea = getID("lumpSumListArea");

// debt list 
const HTMLdebtListDropdown = getID("debtListDropdown");
const HTMLdebtListDisplay = getID("debtListDisplay");

const HTMLdebtSortCaret = getID("debtSortCaret");
HTMLdebtSortCaret.addEventListener("click", function () {changeClass("debtSortCaret", "fa-caret-up", "fa-caret-down"), swapDirection()});

const HTMLsortBy = getID("sortBy");
HTMLsortBy.addEventListener("click", function () {showDiv("sortByDropdown", null, null, null, null, "sortByTuck")});

const HTMLsortByRatio = getID("sortbyRatio");
HTMLsortByRatio.addEventListener("click", function () {printToDebtListDisplay(debtListByRatio, "Ratio"), changeClass("debtSortCaret", "fa-caret-up", "fa-caret-down", false)});

const HTMLsortByBalance = getID("sortbyBalance");
HTMLsortByBalance.addEventListener("click", function () {printToDebtListDisplay(debtList, "Balance"), changeClass("debtSortCaret", "fa-caret-up", "fa-caret-down", false)});

const HTMLsortByMin = getID("sortbyMin");
HTMLsortByMin.addEventListener("click", function () {printToDebtListDisplay(debtListByMinPayment, "Min Payment"), changeClass("debtSortCaret", "fa-caret-up", "fa-caret-down", false)});


// Default All sortBy selection
printToDebtListDisplay(debtList, "Balance"), changeClass("debtSortCaret", "fa-caret-up", "fa-caret-down", false);
showDiv("sortByDropdown", null, null, null, null, "sortByTuck"); // this cancels out a previous call. It's a bit hacky but itll do.


