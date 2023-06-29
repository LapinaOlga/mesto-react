import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeletingAvatarPopupOpen: false,
      selectedCard: null,
      deletingCard: null,
      currentUser: null,
      cards: [],
    }

    this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this)
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this)
    this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this)
    this.closeAllPopups = this.closeAllPopups.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleCardLike = this.handleCardLike.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this)
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this)
  }

  handleEditAvatarClick() {
    this.setState({
      isEditAvatarPopupOpen: true,
    });
  }

  handleEditProfileClick() {
    this.setState({
      isEditProfilePopupOpen: true,
    });
  }

  handleAddPlaceClick() {
    this.setState({
      isAddPlacePopupOpen: true,
    });
  }

  closeAllPopups() {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletingAvatarPopupOpen: false,
      selectedCard: null,
    });
  }

  handleCardClick(card) {
    this.setState({
      selectedCard: card,
    })
  }

  handleCardDelete(card) {
    this.setState({
      deletingCard: card, isDeletingAvatarPopupOpen: card,
    })
  }

  handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id)

    api.changeCardLike(card._id, !isLiked)
      .then((newCard) => {
        this.setState({
          cards: this.state.cards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard)
        })
      })
  }

  handleUpdateUser(user) {
    api.updateUser(user)
      .then((newUser) => {
        this.setState({
          currentUser: newUser
        });

        this.closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  handleUpdateAvatar(url) {
    api.updateUserAvatar(url)
      .then((newUser) => {
        this.setState({
          currentUser: newUser
        });

        this.closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then((newCard) => {
        console.log({newCard}, [...this.state.cards]);
        this.setState({
          cards: [newCard, ...this.state.cards],
        });

        this.closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  componentDidMount() {
    api.getUser()
      .then((user) => {
        this.setState({
          currentUser: user,
        })
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });

    api.getCardList()
      .then((cards) => {
        this.setState({cards})
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  render() {
    if (!this.state.currentUser) {
      return '';
    }

    return (<React.Fragment>
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="page">
          <Header/>
          <Main cards={this.state.cards}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                handleCardClick={this.handleCardClick}
                handleCardLike={this.handleCardLike}
                handleCardDelete={this.handleCardDelete}
          />
          <Footer/>
        </div>
        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen}
                          onClose={this.closeAllPopups}
                          onUpdateUser={this.handleUpdateUser}
        />
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen}
                       onClose={this.closeAllPopups}
                       onAddPlace={this.handleAddPlaceSubmit}/>
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
          isOpen={this.state.isDeletingAvatarPopupOpen}
          onClose={this.closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
        />
        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
      </CurrentUserContext.Provider>
    </React.Fragment>);
  }
}
