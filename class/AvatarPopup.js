class AvatarPopup extends Popup {
    constructor(openButton, closeButton, namePopup, container, form, api) {

        super(openButton, closeButton, namePopup, container);
        this.form = form;
        this.api = api;

    }
    change(event) {
        event.preventDefault();
        const link = this.form.elements.link.value;
        this.api.changeAvatar(link)
            .then(res => {
                this.openButton.style.backgroundImage = `url(${res.avatar})`;
            })
            .catch(err => alert(err));

    }
    setEventListeners() {
        this.form.addEventListener('input', () => {
            if (this.form.elements.link.value.length === 0) {
                this.form.elements.button.setAttribute('disabled', true);
                this.form.elements.button.classList.remove('popup__button_enabled');
            } else {
                this.form.elements.button.removeAttribute('disabled');
                this.form.elements.button.classList.add('popup__button_enabled');
            }
        });
        this.form.addEventListener('submit', (event) => {
            this.change(event);
            this.namePopup.querySelector('.popup__form').reset();
            this.popupClose();

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

