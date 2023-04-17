// neon palette

const neon = {
    red: '#FF0000',
    orange: '#FF7F00',
    yellow: '#FFFF00',
    green: '#00FF00',
    blue: '#0000FF',
    indigo: '#4B0082',
    violet: '#9400D3'
};



export class Block {
    parent;
    data;
    nodes;
    html;

    constructor(parent, data) {
        // check if root block instance
        if (Object.hasOwn(this, "root")) {
            console.log("making root block");
        }
        else {
            console.log("making block");
        }
        this.parent = parent;
        this.data = data;
        this.nodes = [];
        this.html = this.createBlockFragment(this);
        // so this creates a fragment with div, and then more blocks get appended as siblings to the div
    }

    addChildBlock(node) {
        let logContents = node.data;
        console.log("adding node " + logContents);
        this.nodes.push(node);
        this.html.firstChild.append(node.html);
    }

    createBlockFragment(block) {
        if (Object.hasOwn(this, "root")) {
            let root = document.createDocumentFragment();
            let div = document.createElement("div");
            div.setAttribute("id", "shadow_root");
            root.append(div);
            return root;
        }

        let fragment = document.createDocumentFragment();

        console.log("creating fragment > div > text node " + block.data);

        let div = document.createElement("div");
        div.setAttribute("class", "block");

        // add <a href="#" class="fill-div"></a>
        let fillDiv = document.createElement("a");
        fillDiv.setAttribute("href", "#");
        fillDiv.setAttribute("class", "fill-div");


        // create a box containing logContents in the center
        if (block.data)
            fillDiv.append(document.createTextNode(block.data));

        div.append(fillDiv);
        div.style.backgroundColor = neon[Object.keys(neon)[Math.floor(Math.random() * Object.keys(neon).length)]];
        fragment.appendChild(div);

        return fragment;
    }

    serialize() {
        console.log(this);
        let x = {this: this.nodes.map(node => node.serialize())}
        console.log(x);
        return x;
    }

    deserialize(json) {
        for (let node of json.nodes) {
            let block = new Block(this, node.data);
            this.addChildBlock(block);
            block.deserialize(node);
        }
        return this;
    }
}

export class RootBlock extends Block {
    root;
    addButton;
    constructor() {
        super(null, null);
        // returns a root fragment
        console.log("root block:" + this.html);
        this.addButton = this.createAddButton();
        this.html.firstChild.append(this.addButton);
        this.html.firstChild.style.backgroundColor = "black";
    }

    createAddButton() {
        let button = document.createElement("div");
        button.setAttribute("id", "addButton");
        button.setAttribute("class", "block");
        button.innerText = "➕";
        return button;
    }
}
