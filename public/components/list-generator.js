class ListGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                @import "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css";

                .list-generator {
                    display: flex;
                    flex: 1 1 300px;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    max-width: 300px;
                    margin: 0 40px 0 0;
                    padding: 20px;
                }

                .title-input {
                    display: flex;
                    flex: 1 1 auto;
                }

                .list-items {
                    display: flex;
                    flex-direction: column;
                }

                .list-generator__buttons {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }

            </style>

            <div class="list-generator">
                <div class="list-generator__buttons">
                    <div class="list-generator__button list-generator__button--new-item mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">Add new item</div>
                    <div class="list-generator__button list-generator__button--submit-list mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">Submit list</div>
                </div>
                <form action="#">
                    <div class="title-input mdl-textfield mdl-js-textfield">
                        <input id="ListNameLabel" type="text" class="title-input__input mdl-textfield__input">
                        <label for="ListNameLabel" class="title-input__label mdl-textfield__label">List Name: </label>                         
                    </div>
                    <div class="list-items">
                        <p>Add list items:</p>
                        <div class="mdl-js-textfield">
                            <input class="list-items_input mdl-textfield__input">
                        </div>  
                    </div>
                   
                </form>
            </div>
        `;
    }

    connectedCallback() {  
        const addItemButton = this.shadowRoot.querySelector('.list-generator__button--new-item');
        const submitListButton = this.shadowRoot.querySelector('.list-generator__button--submit-list');
        // async function matDesignScript() {
        //     let response = await fetch('https://code.getmdl.io/1.3.0/material.min.js');
        //     let data = await response.json()
        //     return data;
        // } 
        // matDesignScript()
        //     .then(data => console.log(data));
        addItemButton.addEventListener('click', this._addListItem.bind(this));
        submitListButton.addEventListener('click', this._addNewList.bind(this));
        
    }

    _addListItem() {
        const newListItemInput = document.createElement('div');
        newListItemInput.innerHTML = `<input class="list-items_input mdl-textfield__input">`
        this.shadowRoot.querySelector('.list-items').appendChild(newListItemInput);
    }

    _addNewList() {
        const newListForm = this.shadowRoot.querySelector('.list-generator');
        const newList = {};
        newList.listItems = [];
        newList.title = newListForm.querySelector('.title-input__input').value;
        Array.from(newListForm.querySelectorAll('.list-items_input')).forEach(item => {
            newList.listItems.push({title: item.value});
        });
        data.lists.push(newList);
        populateLists(data.lists);
    }
}

customElements.define('snow-list-generator', ListGenerator);