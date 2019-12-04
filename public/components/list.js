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
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px;
                    transition: .2s;
                }

                .list:hover {
                    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                }

                .list__item {
                    display: flex;
                    justify-content: space-between;
                }

                .list__item-title-text {
                    margin-right: 20px;
                }

                .delete-item-button {
                    color: var(--primary);
                    opacity: 0;
                    transition: .2s;
                }

                .delete-item-button:hover {
                    color: var(--accent);
                }

                .list__item:hover .delete-item-button,
                .list:hover .delete-card-button {
                    opacity: 1;
                }

                .delete-card-button {
                    opacity: 0;
                    transition: .2s;
                }

                .mdl-button.delete-card-button:hover {
                    background-color: var(--accent);
                }

            </style>

            <div class="list mdl-shadow--2dp">
                <div>
                    <div class="mdl-card__title mdl-card--border">
                        <h2 class="list__title mdl-card__title-text">List Title</h2>
                    </div>
                    <ul class="list__items mdl-list"></ul>
                </div>
                <div class="delete-card-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-button--raised">Delete List</div>
            </div>

            
        `
    }

    connectedCallback() {
        const $listTitle = this.shadowRoot.querySelector(".list__title");
        this.$listItemsElement = this.shadowRoot.querySelector(".list__items");
        const $deleteCardButton = this.shadowRoot.querySelector(".delete-card-button");
        this.$deleteItemButtons;
        this._listItems = JSON.parse(this.getAttribute('list-items'));
        this._listTitle = this.getAttribute('list-title');
        $listTitle.innerHTML = this._listTitle;
        this._renderListItems();
        $deleteCardButton.addEventListener('click', this._deleteList.bind(this));  
    }

    _renderListItems() {
        this.$listItemsElement.innerHTML = "";
        this._listItems.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="list__item-title-text">${item.title}</span>
                <i class="material-icons delete-item-button" data-list-title="${item.title}">
                delete_forever
                </i>
            `;
            listItem.classList.add('mdl-list__item', 'list__item');
            this.$listItemsElement.appendChild(listItem); 
            this.$deleteItemButtons = this.shadowRoot.querySelectorAll(".delete-item-button"); 
            Array.from(this.$deleteItemButtons).forEach(button => button.addEventListener('click', this._deleteListItem.bind(this)));
        });
    }

    _deleteList() {       
        data.lists = data.lists.filter((list) => {
            return list.title !== this._listTitle;   
        });
        populateLists(data.lists);
    }

    _deleteListItem(event) {
        console.log(event.target);
        this._listItems = this._listItems.filter((listItem) => {
            return listItem.title !== event.target.dataset.listTitle;
        });
        data.lists.find(list => list.title === this._listTitle).listItems = this._listItems;
        this._renderListItems();
    }
}

customElements.define('snow-list', List);