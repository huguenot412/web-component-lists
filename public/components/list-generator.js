class ListGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <div class="list-generator">
                <div class="title-input">
                    <label class="title-input__label">List Name: </label>
                    <input type="text" class="title-input__input">   
                </div>
                <div class="list-items">
                    <p>Add list items:</p>
                    <div>
                        <input class="list-items_input">
                    </div>  
                </div>
                <div class="list-generator__buttons">
                    <div class="list-generator__button list-generator__button--new-item">Add new item</div>
                    <div class="list-generator__button list-generator__button--submit-list">Submit list</div>
                </div>
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
        newListItemInput.innerHTML = `<input class="list-items_input">`
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