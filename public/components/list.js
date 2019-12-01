class List extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._listItems = [];
        this.shadowRoot.innerHTML = `

            <style>
                @import "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css";

                :host {
                    display: grid;
                    grid-column-template: 1fr;
                    justify-items: stretch;
                }

                .list {
                    padding: 20px;
                    margin: 10px;
                    transition: .2s;
                }

                .list:hover {
                    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                }

            </style>

            <div class="list mdl-shadow--2dp">
                <div class="mdl-card__title mdl-card--border">
                    <slot name="list-title" class="list__title">List Title</slot>
                </div>
                <ul class="list__items mdl-list"></ul>
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