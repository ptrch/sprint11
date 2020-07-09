export default class Card {
    constructor(name, link, likes, idCard, idUser, popup, api, userId) {
        this.name = name;
        this.link = link;
        this.popup = popup;
        this.api = api;
        this.idCard = idCard;
        this.idUser = idUser;
        this.likes = likes;
        this.userId = userId.getAttribute('user-id');
      
    }
    create() {
        const placeCard = document.createElement('div');
        const image = document.createElement('div');
        const deleteButton = document.createElement('button');
        const description = document.createElement('div');
        const cardName = document.createElement('h3');
        const like = document.createElement('div');
        const likeButton = document.createElement('button');
        const likeCount = document.createElement('p');
        const idUser = document.createElement('p');
        const idCard = document.createElement('p');

        placeCard.classList.add('place-card');
        image.classList.add('place-card__image');
        deleteButton.classList.add('place-card__delete-icon');
        description.classList.add('place-card__description');
        cardName.classList.add('place-card__name');
        like.classList.add('place-card__like');
        likeButton.classList.add('place-card__like-icon');
        likeCount.classList.add('place-card__like-count');
        idUser.classList.add('place-card__id_user');
        idCard.classList.add('place-card__id_card');

        placeCard.appendChild(image);
        placeCard.appendChild(description);
        image.appendChild(deleteButton);
        description.appendChild(cardName);
        description.appendChild(like);
        like.appendChild(likeButton);
        like.appendChild(likeCount);
        like.appendChild(idUser);
        like.appendChild(idCard);
        this.cardElem = placeCard;
        likeCount.textContent = this.likes.length;
        idCard.textContent = this.idCard;
        idUser.textContent = this.idUser;
        cardName.textContent = this.name;
        image.style.backgroundImage = `url(${this.link})`;
        this.buttonLike = likeButton;
        this.buttonDelete = deleteButton;
        this.image = image;
        this.likeCount = likeCount;

        if (this.idUser === this.userId) {
            this.buttonDelete.classList.add("place-card__delete-icon_on");
        }

        for (let elem of this.likes) {
            if (elem._id === this.userId) {
                this.buttonLike.classList.add('place-card__like-icon_liked');
            }
        }


        this.setEventListeners();

        return placeCard;
    }

    like() {
        if (this.buttonLike.classList.contains('place-card__like-icon_liked')) {
            this.api.deleteLike(this.idCard)
                .then(res => {
                    this.buttonLike.classList.toggle('place-card__like-icon_liked');
                    this.likeCount.textContent = res.likes.length;
                })
                .catch(err => alert(err));
        } else {
            this.api.addLike(this.idCard)
                .then(res => {
                    this.buttonLike.classList.toggle('place-card__like-icon_liked');
                    this.likeCount.textContent = res.likes.length;
                })
                .catch(err => alert(err));
        }

    }


    deleteCard() {
        if (confirm("Вы действительно хотите удалить эту карточку?")) {
            this.removeEventListeners();
            this.api.deleteCard(this.idCard)
                .then(() => {
                    this.cardElem.remove();
                })
                .catch(err => alert(err))

        }

    }

    setEventListeners() {
        this.buttonLike.addEventListener('click', () => this.like());
        this.buttonDelete.addEventListener('click', () => this.deleteCard());
        this.image.addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__image')) {
                this.popup.zoomImage(event);
            }
        });
    }

    removeEventListeners() {
        this.buttonLike.removeEventListener('click', () => this.like());
        this.buttonDelete.removeEventListener('click', () => this.deleteCard());
        this.image.removeEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__image')) {
                this.popup.zoomImage(event);
            }
        });
    }
}

