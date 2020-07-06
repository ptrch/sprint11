class UserInfo {
    constructor(nameUser, jobUser, form, popup, api) {
        this.nameUser = nameUser;
        this.jobUser = jobUser;
        this.form = form;
        this.popup = popup;
        this.api = api;


    }
    setUserInfo = (nameUser, jobUser) => {
        this.form.elements.name.value = nameUser.textContent;
        this.form.elements.about.value = jobUser.textContent;
    }

    updateUserInfo = (event) => {
        event.preventDefault();
        this.form.elements.button.textContent = "Загрузка..."
        this.api.editUser(this.form.elements.name.value, this.form.elements.about.value)
            .then(() => {
                this.nameUser.textContent = this.form.elements.name.value;
                this.jobUser.textContent = this.form.elements.about.value;
                this.popup.popupClose();
            })
            .catch(err => alert(err))
            .finally(() => {
                this.form.elements.button.textContent = "Сохранить"
            });
    }



    setEventListeners() {
        this.popup.openButton.addEventListener('click', () => {
            this.setUserInfo(this.nameUser, this.jobUser);
        });


        this.form.addEventListener('submit', (event) => {
            this.updateUserInfo(event);
        });
    }
}
