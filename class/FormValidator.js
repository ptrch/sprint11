class FormValidator {
    constructor(form, errorMessages, popup) {
        this.form = form;
        this.errorMessages = errorMessages;
        this.popup = popup;
        
    }
    checkInputValidity(input, error) {
        for (let i in this.errorMessages) {
            if (input.validity[i]) {
                return error.textContent = this.errorMessages[i];
            }
            error.textContent = '';

        }
    }
    setSubmitButtonState = (form, button) => {
        if (form.checkValidity()) {
            button.removeAttribute('disabled');
            button.classList.add('popup__button_enabled');
            return;
        }
        if (!form.checkValidity()) {
            button.setAttribute('disabled', true);
            button.classList.remove('popup__button_enabled');
            return;
        }
    }

    clearField = () => {
        const [...inputs] = this.form.querySelectorAll(".popup__input");
        inputs.forEach(function (item) {
            const errorElem = item.parentNode.querySelector(`#${item.name}-error`);
            errorElem.textContent = '';
        });
    }

    setEventListeners = () => {

        const button = this.form.querySelector('button');

        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(event.target, event.target.parentNode.querySelector(`#${event.target.name}-error`));
            this.setSubmitButtonState(this.form, button);
        });

        this.popup.closeButton.addEventListener('click', () => this.clearField())

        this.popup.container.addEventListener('keydown', (evt) => {
            if (evt.keyCode == '27' && this.form.closest('.popup__form')) {
                this.clearField();
            }
        });

       


    }

}
