import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

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
    }

    this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this)
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this)
    this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this)
    this.closeAllPopups = this.closeAllPopups.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleCardDeleteClick = this.handleCardDeleteClick.bind(this)
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

  handleCardDeleteClick(card) {
    this.setState({
      deletingCard: card,
      isDeletingAvatarPopupOpen: card,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <Header/>
          <Main onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                handleCardClick={this.handleCardClick}
                handleCardDeleteClick={this.handleCardDeleteClick}
          />
          <Footer/>
        </div>
        <PopupWithForm title="Редактировать профиль"
                       name="profile"
                       isOpen={this.state.isEditProfilePopupOpen}
                       onClose={this.closeAllPopups}
        >
          <label className="popup__label">
            <input id="name-input"
                   type="text"
                   className="popup__item popup__item_el_name"
                   minLength="2"
                   maxLength="40"
                   required
                   name="name"
            />
            <span className="name-input-error popup__error"></span>
          </label>
          <label className="popup__label">
            <input id="profession-input"
                   type="text"
                   className="popup__item popup__item_el_profession"
                   minLength="2"
                   maxLength="200"
                   required
                   name="about"
            />
            <span className="profession-input-error popup__error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="card"
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
        >
          <label className="popup__label">
            <input id="location-input"
                   type="text"
                   className="popup__item popup__item_el_location"
                   minLength="2"
                   maxLength="30"
                   required
                   placeholder="Название"
                   name="name"
            />
            <span className="location-input-error popup__error"></span>
          </label>
          <label className="popup__label">
            <input id="link-input"
                   type="url"
                   className="popup__item popup__item_el_link"
                   required
                   placeholder="Ссылка на картинку"
                   name="link"
            />
            <span className="link-input-error popup__error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
          isOpen={this.state.isDeletingAvatarPopupOpen}
          onClose={this.closeAllPopups}
        />
        <PopupWithForm
          title="Обновить аватар"
          name="update"
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
        >
          <label className="popup__label">
            <input id="avatar-link-input"
                   type="url"
                   className="popup__item popup__item_el_link"
                   required
                   placeholder="Ссылка на картинку"
                   name="link"
            />
            <span className="link-input-error popup__error"></span>
          </label>
        </PopupWithForm>
        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
      </React.Fragment>
    );
  }
}
