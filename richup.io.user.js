// ==UserScript==
// @name         richup.io
// @namespace    https://github.com/nothub/richupbot
// @version      0.1
// @description  Try to take over the world!
// @author       hub
// @match        https://richup.io/room/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=richup.io
// @grant        none
// ==/UserScript==

var autoEnd = false

var button_roll_dice
var button_roll_again
var button_end_turn
var button_buy_for_$

function clearButtons() {
    button_roll_dice = null
    button_roll_again = null
    button_end_turn = null
    button_buy_for_$ = null
}

function findButtons(node) {
    const clone = node.cloneNode(false)
    clone.innerHTML = "" // drop clones children
    switch (clone.textContent) {
        case "Roll the dice": {
            button_roll_dice = findButtonParent(node)
            break
        }
        case "Roll again": {
            button_roll_again = findButtonParent(node)
            break
        }
        case "End turn": {
            button_end_turn = findButtonParent(node)
            break
        }
        case "Buy for $": {
            button_buy_for_$ = findButtonParent(node)
            break
        }
    }
    node.childNodes.forEach(node => findButtons(node))
}

function findButtonParent(node) {
    if (node instanceof HTMLButtonElement) {
        return node
    } else {
        return findButtonParent(node.parentNode)
    }
}

function clickElement(element) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);
    element.dispatchEvent(evt)
}

(function () {
    'use strict'
    const app = document.getElementById("app");

    setInterval(function () {

        clearButtons()
        findButtons(app)

        if (button_buy_for_$ != null) {
            console.log("button_buy_for_$")
            clickElement(button_buy_for_$)
        }

        if (button_roll_dice != null) {
            console.log("button_roll_dice")
            clickElement(button_roll_dice)
        }

        if (button_roll_again != null) {
            console.log("button_roll_again")
            clickElement(button_roll_again)
        }

        if (autoEnd && button_end_turn != null) {
            console.log("button_end_turn")
            clickElement(button_end_turn)
        }

    }, 1000);
})();
