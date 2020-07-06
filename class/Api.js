class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.error = {
      getUserErr: "Ошибка при получении данных пользователя",
      getCardsErr: "Ошибка при получении карточек",
      editUserErr: "Ошибка при передаче новых данных пользователя",
      addCardErr: "Ошибка добавления карточки",
      deleteCardErr: "Ошибка удаления карточки",
      addLikeErr: "Ошибка добавления 'нравится'",
      deleteLikeErr: "Ошибка удаления 'нравится'",
      changeAvatarErr: "Ошибка смены аватара пользователя",
    }
  }

  promiseErr(res, errorItem) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${this.error[errorItem]} Ошибка: ${res.status}`);
  }


  getUser() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers
    })
      .then(res => this.promiseErr(res, 'getUserErr'));
  }

  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.headers
    })
      .then(res => this.promiseErr(res, 'getCardsErr'));
  }

  editUser(name, job) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => this.promiseErr(res, 'editUserErr'));
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this.promiseErr(res, 'addCardErr'));
  }

  deleteCard(url) {
    return fetch(`${this.baseUrl}cards/${url}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this.promiseErr(res, 'deleteCardErr'));

  }
  addLike(idCard) {
    return fetch(`${this.baseUrl}cards/like/${idCard}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => this.promiseErr(res, 'addLikeErr'));
  }

  deleteLike(idCard) {
    return fetch(`${this.baseUrl}cards/like/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this.promiseErr(res, 'deleteLikeErr'));

  }
  changeAvatar(url) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => this.promiseErr(res, 'changeAvatarErr'));
  }



}