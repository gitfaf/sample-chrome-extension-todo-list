class ListItem {
    constructor(value, remindAt, addedAt) {
        this.value = value;
        this.remindAt = remindAt;
        this.addedAt = addedAt || Date.now();
    }
    getValue () {
        return this.value;
    }
    remindWhen () {
        return this.remindAt;
    }
    done () {
        this.done = Date.now();
    }
    isDone () {
        return !!this.done;
    }
}

module.exports = {
    ListItem
}
