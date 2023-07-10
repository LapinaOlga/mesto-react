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

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletingAvatarPopupOpen, setIsDeletingAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletingCard, setDeletingCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletingAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const handleCardDelete = (card) => {
    setDeletingCard(card);
    setIsDeletingAvatarPopupOpen(true);
  };
  const handleCardDestroy = (event) => {
    event.preventDefault();
    setIsSaving(true);

    api.deleteCard(deletingCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletingCard._id));
        setDeletingCard(null);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  const handleUpdateUser = (user) => {
    setIsSaving(true);
    api.updateUser(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  const handleUpdateAvatar = (url) => {
    setIsSaving(true);
    api.updateUserAvatar(url)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  const handleAddPlaceSubmit = (card) => {
    setIsSaving(true);
    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  // mount
  React.useEffect(() => {
    api.getUser()
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });

    api.getCardList()
      .then((cards) => setCards(cards))
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }, []);

  if (!currentUser) {
    return '';
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <Footer/>
      </div>
      <EditProfilePopup
        buttonText={isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        buttonText={isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText={isSaving ? 'Удаляется...' : 'Да'}
        isOpen={isDeletingAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDestroy}
      />
      <EditAvatarPopup
        buttonText={isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  );
}
