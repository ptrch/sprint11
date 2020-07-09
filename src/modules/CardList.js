export default class CardList {
    constructor(container, arr, createCard) {
        this.container = container;
        this.arr = arr;
        this.createCard = createCard;

    }
    addCard(event) {
        this.container.appendChild(event)


    }
    render() {
        this.arr.forEach((item) =>
            this.addCard(this.createCard(item.name, item.link, item.likes, item.idCard, item.idUser).create()));

    }
}
