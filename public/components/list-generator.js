class ListGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                @import "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css";

                .list-generator {
                    padding: 20px;
                }

                .list-generator input {
                    color: rgb(63,81,181);
                }

                input:focus {
                    outline-color: transparent;
                    color: rgb(255,64,129);
                }

                input::placeholder {
                    color: rgba(63,81,181,0.4);
                }

                .title-input {
                    display: flex;
                    flex: 1 1 auto;
                    flex-wrap: wrap;
                }

                .title-input__input {
                    width: 100%;
                }

                .list-items {
                    display: flex;
                    flex-direction: column;
                }

                .list-generator__buttons {
                    display: flex;
                }

                .list-generator__button {
                    margin-right: 10px;
                }

                .listNameValidation {
                    display: flex;
                    align-items: flex-end;
                    opacity: 0;
                    bottom: -2px;
                    left: 0;
                    color: rgb(255,64,129);
                    transition: .2s;
                    padding: 6px 0 0 0;
                }
                
                .listNameValidation i {
                    display: inline-block;
                    margin-right: 10px;
                }

                .list-generator__search {
                    margin-bottom: 20px;
                    width: 100%;
                    display: flex;
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    color: rgb(63,81,181);
                    transition: .2s;
                }

                .list-generator__search:hover .search-icon {
                    color: rgb(255,64,129);
                }

            </style>

            <div class="list-generator">
                <div class="list-generator__search">
                    <input id="Search" type="text" class="search__input mdl-textfield__input" placeholder="Search">
                    <i class="material-icons search-icon">search</i>
                </div>
                <div class="list-generator__buttons">
                    <div class="list-generator__button list-generator__button--new-item mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-button--raised">New item</div>
                    <div class="list-generator__button list-generator__button--submit-list mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">Submit list</div>
                </div>
                <form action="#">
                    <div class="title-input mdl-textfield mdl-js-textfield">
                        <input id="ListNameLabel" type="text" class="title-input__input mdl-textfield__input" placeholder="Enter list name">
                        <!--<label for="ListNameLabel" class="title-input__label mdl-textfield__label">List Name: </label>-->
                        <div class="listNameValidation">
                            <i class="material-icons">warning</i>List name required
                        </div>                        
                    </div>
                    <div class="list-items">
                        <p>Add list items:</p>
                        <div class="mdl-js-textfield">
                            <input class="list-items_input mdl-textfield__input" placeholder="Enter item name">
                        </div>  
                    </div>
                   
                </form>
            </div>
        `;
    }

    connectedCallback() {  
        const addItemButton = this.shadowRoot.querySelector('.list-generator__button--new-item');
        const submitListButton = this.shadowRoot.querySelector('.list-generator__button--submit-list');
        addItemButton.addEventListener('click', this._addListItem.bind(this));
        submitListButton.addEventListener('click', this._addNewList.bind(this));       
    }

    _addListItem() {
        const newListItemInput = document.createElement('div');
        newListItemInput.innerHTML = `<input class="list-items_input mdl-textfield__input" placeholder="Enter item name">`
        this.shadowRoot.querySelector('.list-items').appendChild(newListItemInput);
    }

    _addNewList() {
        const newListForm = this.shadowRoot.querySelector('.list-generator');
        const listNameValidation = this.shadowRoot.querySelector('.listNameValidation');
        const titleInput = newListForm.querySelector('.title-input__input');
        const listItems = this.shadowRoot.querySelector('.list-items');

        if(titleInput.value === "") {
            listNameValidation.style.opacity = 1;
            return;
        }
        const newList = {};
        newList.listItems = [];
        newList.title = titleInput.value;
        titleInput.value = "";
        Array.from(newListForm.querySelectorAll('.list-items_input')).forEach(item => {
            if(item.value !== "") {
                newList.listItems.push({title: item.value});
            }
            item.value = "";
        });
        data.lists.push(newList);
        populateLists(data.lists);
        listNameValidation.style.opacity = 0;
        listItems.innerHTML = `
            <p>Add list items:</p>
            <div class="mdl-js-textfield">
                <input class="list-items_input mdl-textfield__input" placeholder="Enter item name">
            </div>   
        `
    }
}

customElements.define('snow-list-generator', ListGenerator);