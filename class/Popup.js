class Popup {
    constructor(openButton, closeButton, namePopup, container) {
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.namePopup = namePopup;
        this.container = container;

    }
    popupOpen = () => {
        this.namePopup.classList.add("popup_is-opened");

    }
    popupClose = () => {
        this.namePopup.classList.remove("popup_is-opened");

    }
    setEventListeners() {
        this.openButton.addEventListener('click', () => {
            this.popupOpen();
        });
        this.closeButton.addEventListener('click', () => {
            this.popupClose();

        });
        this.container.addEventListener('keydown', (evt) => {
            if (evt.keyCode == '27' && this.namePopup.closest(".popup_is-opened")) {
                this.popupClose();
            }
        });

    }
}

