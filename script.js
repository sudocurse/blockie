import { RootBlock, Block } from "./blocks.js";

function createModal() {
    let modal = document.createDocumentFragment();
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("class", "inputModal");
    modalDiv.append(document.createTextNode("Enter text:"));

    let input = document.createElement("input");
    modalDiv.append(input);

    let button = document.createElement("button");
    button.setAttribute("id", "inputButton");
    button.append(document.createTextNode("Add"));
    modalDiv.append(button);

    modal.append(modalDiv);
    return modal;
}

function inputButtonHandler(event) {
    let modal = document.getElementsByClassName("inputModal")[0];
    let text = modal.getElementsByTagName("input")[0].value;
    let block = new Block(originNode, text);
    originNode.addChildBlock(block);
    render(originNode);

    if (body.contains(document.getElementsByClassName("inputModal")[0])) {
        body.removeChild(document.getElementsByClassName("inputModal")[0]);
    }
}

function addButtonHandler(event) {
    // look for existing inputModal
    if (!body.contains(document.getElementsByClassName("inputModal")[0])) {
        let modal = createModal();
        modal.getElementById("inputButton").addEventListener("click", inputButtonHandler);
        body.append(modal);
    }
}

function render(root) {
    console.log("rendering " + root.nodes);
    let stage = root.html.firstChild.cloneNode(true);
    console.log("cloning fragment " + stage);

    let body = document.getElementsByTagName("body")[0];
    body.replaceChild(stage, document.getElementById("root"));


    body.firstElementChild.setAttribute("id", "root");

    let rootDiv = document.getElementById("root");
    document.getElementById("addButton").addEventListener("click", addButtonHandler);
}

let originNode = new RootBlock();

function addBlocks(parent, ...children ) {
    for (let child of children) {
        let block = new Block(parent, child);
        originNode.addChildBlock(block);
    }
    render(originNode);
    console.log("saving to local storage");
    localStorage.setItem("root", originNode.serialize());
    // "root": {date.now: serialize(originNode)}

}

function save(){
    localStorage.setItem("root", originNode.serialize());
    console.log("saving to local storage");
}

let a = "Hello dWorld";
let b = "hiiiii";
let set = [a,b,a,a,a];
addBlocks(originNode, ...set);

let body = document.getElementsByTagName("body")[0];



// render on load
window.onload = function() {
    if (localStorage.getItem("root")) {
        console.log("loading from local storage");
        originNode = JSON.parse(localStorage.getItem("root"));
    }
    render(originNode);
};

