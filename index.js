var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';
var LIST_ID = 'list';

var Processing = {
    createListFromStorage: function () {
        console.log('createListFromStorage called.');
        let values = STORAGE.read();
        let items = values.map(v => new ListItem(v.value, v.remindAt, v.addedAt));
        let uiItems = items.map(i => {
            let elem = document.createElement('div');
            elem.innerHTML = `${i.value} - ${i.remindAt} - ${i.addedAt}`;
            return elem;
        });
        return uiItems;
    },
    createListFromUI: function () {
        console.log('createListFromUI called.');
        let list = document.getElementById('list');
        let items = Array.from(list.children).map(c => {
            console.log(c);
            return c;
        });
        console.log(items);
        return items;
    }
};

var STORAGE = {
    save: function (listArray) {
        console.log('save called.');
        chrome.storage.sync.set({
            'list': listArray
        }, function () {
            console.log('List saved!');
        });
    },
    read: function () {
        console.log('read called.');
        chrome.storage.sync.get('list', function (value) {
            return value;
        });
    }
};

var UI = {
    createListItem: function (value) {
        console.log('createListItem called.');
        var item = document.createElement('div');
        item.className = "list-item";
        item.innerText = value;
        return item;
    },
    getListElement: function () {
        console.log('getListElement called.');
        return document.getElementById(LIST_ID);
    },
    pushItemToList: function (value) {
        console.log('pushItemToList called.');
        UI.getListElement().append(UI.createListItem(value));
    },
    pushItemsToList: function (listArray) {
        console.log('pushItemsToList called.');
        listArray.forEach(function (x) {
            UI.pushItemToList(x);
        });
    },
    setupSaveButton: function () {
        console.log('setupSaveButton clicked.');
        let saveBtn = document.getElementById('add');
        saveBtn.addEventListener('click', function () {
            let value = document.getElementById('item-input').value;
            console.log('setupSaveButton clicked:', value);
            UI.pushItemToList(value);
        });
    },
    setupClearListButton: function () {
        console.log('setupClearListButton called.');
        let clearList = function () {
            console.log('clearList called.');
            let list = UI.getListElement();
            let data = list.innerHTML;
            list.innerHTML = '';
            return data;
        };
        let clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', function () {
            console.log('clearBtn clicked.');
            clearList();
        });
    },
    setupSyncButton: function () {
        console.log('setupSyncButton called.');
        let syncButton = document.getElementById('sync');
        syncButton.addEventListener('click', function () {
            console.log('syncButton clicked.');
            STORAGE.save(Processing.createListFromUI());
        })
    }
};

function getListElement() {
    console.log('getListElement called.');
    return document.getElementById(LIST_ID);
}

function renderList() {
    console.log('renderList called.');
    getListElement().textContent = 'sample';
}

function fireWhenDOMContentIsLoaded() {
    console.log('fireWhenDOMContentIsLoaded called.');
    UI.setupSaveButton();
    UI.setupClearListButton();
    UI.setupSyncButton();
    renderList();
}

document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);