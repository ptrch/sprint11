class CardPopup extends Popup {
    constructor(openButton, closeButton, namePopup, container, form, cardList, createCard, api) {

        super(openButton, closeButton, namePopup, container);
        this.form = form;
        this.cardList = cardList;
        this.createCard = createCard;
        this.api = api;

    }
    addNewCard(event) {
        event.preventDefault();
        this.form.elements.button.classList.add('popup__button_load');
        this.form.elements.button.textContent = "Загрузка..."
        const name = this.form.elements.name.value;
        const link = this.form.elements.link.value;
        this.api.addCard(name, link)
        .then(res => {
            const newName = res.name;
            const newLink = res.link;
            const likes = res.likes;
            const idCard = res._id;
            const idUser = res.owner._id;
            this.cardList.addCard(this.createCard(newName, newLink, likes, idCard, idUser).create());
            this.popupClose();
        })
        .catch(err => alert(err))
        .finally(() => {
            this.form.elements.button.textContent = "+"
            this.form.elements.button.classList.remove('popup__button_load');
        });
    }
    
    setEventListeners() {    
        this.form.addEventListener('submit', (event) => {
            this.addNewCard(event);
            this.namePopup.querySelector('.popup__form').reset();            
        });
        this.openButton.addEventListener('click', () => {
            this.form.elements.button.setAttribute('disabled', true);
            this.form.elements.button.classList.remove('popup__button_enabled');
        });
        this.openButton.addEventListener('click', () => {
            this.popupOpen();
        });
        this.closeButton.addEventListener('click', () => {
            this.namePopup.querySelector('.popup__form').reset();
            this.popupClose();
        });
      
        this.container.addEventListener('keydown', (evt) => {
            if (evt.keyCode == '27' && this.namePopup.closest(".popup_is-opened")) {
                         this.popupClose();
            }
        });
    }
}

