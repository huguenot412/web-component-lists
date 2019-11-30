class List extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._listItems = [];
        this.shadowRoot.innerHTML = `

            <style>
                .list {
                    display: flex;
                    flex-direction: column;
                    flex: 0 0 300px;
                    width: 300px;
                    flex-wrap: wrap;
                    border: solid 1px #333;
                    padding: 20px;
                    margin: 0 10px 10px 10px;
                }
            </style>

            <div class="list">
                <slot name="list-title" class="list__title">List Title</slot>
                <ul class="list__items"></ul>
            </div>
        `
    }

    connectedCallback() {
        const listItemsElement = this.shadowRoot.querySelector(".list__items");
        this._listItems = JSON.parse(this.getAttribute('list-items'));
        this._listItems.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = item.title;
            listItemsElement.appendChild(listItem);
        });
    }
}

customElements.define('snow-list', List);