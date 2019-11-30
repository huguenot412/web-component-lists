class List extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._listItems = [];
        this.shadowRoot.innerHTML = `

            <style>
                @import "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css";

                .list {
                    display: flex;
                    flex: 0 0 300px;
                    width: 300px;
                    flex-wrap: wrap;
                    padding: 20px;
                    margin: 10px;
                    height: calc(100% - 20px);
                }

                .list-inner {
                    display: flex;
                    flex-direction: column;  
                }
            </style>

            <div class="list mdl-card mdl-shadow--2dp">
                <div class="list-inner">
                    <div class="mdl-card__title">
                        <slot name="list-title" class="list__title">List Title</slot>
                    </div>
                    <ul class="list__items mdl-list"></ul>
                </div>
            </div>
        `
    }

    connectedCallback() {
        const listItemsElement = this.shadowRoot.querySelector(".list__items");
        this._listItems = JSON.parse(this.getAttribute('list-items'));
        this._listItems.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = item.title;
            listItem.classList.add('mdl-list__item');
            listItemsElement.appendChild(listItem);
        });
    }
}

customElements.define('snow-list', List);