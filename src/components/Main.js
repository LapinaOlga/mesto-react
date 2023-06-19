import React from "react";
import profileAvatar from '../images/profile_avatar.jpg'
import vectorPencil from '../images/vector-pencil.svg'
import vectorCross from '../images/vector-cross.svg'
import Api from '../utils/api.js'
import Card from "./Card";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: [],
    };

    this._api = new Api({
      baseUrl: `https://mesto.nomoreparties.co/v1/cohort-66`,
      headers: {
        authorization: '03bede17-6085-4ace-b801-04f52b01265d',
        'Content-Type': 'application/json',
      },
    });
  }

  get cardElements() {
    let result = []

    for (const card of this.state.cards) {
      result.push(
        <Card
          card={card}
          key={card._id}
          onCardClick={this.props.handleCardClick}
          onCardDelete={this.props.handleCardDeleteClick}
        />
      )
    }

    return result;
  }

  componentDidMount() {
    this._api.getUser()
      .then((user) => {
        if (user.name) {
          this.setState({
            userName: user.name,
          })
        }

        if (user.about) {
          this.setState({
            userDescription: user.about,
          })
        }

        if (user.avatar) {
          this.setState({
            userAvatar: user.avatar,
          })
        }

        this._api.getCardList()
          .then((cards) => {
            this.setState({cards})
          })
          .catch((error) => {
            console.log('Сервер вернул ошибку', error);
          });
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  render() {
    return (
      <main className="main">
        <section className="profile">
          <button className="profile__avatar-button"
                  onClick={this.props.onEditAvatar}
          >
            <img className="profile__avatar"
                 src={profileAvatar}
                 alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <div className="profile__area">
              <h1 className="profile__title">{this.state.userName}</h1>
              <button className="profile__edit-button"
                      type="button"
                      onClick={this.props.onEditProfile}
              >
                <img className="profile__edit-button-image"
                     src={vectorPencil}
                     alt="Картинка карандаш"
                />
              </button>
            </div>
            <p className="profile__subtitle">{this.state.userDescription}</p>
          </div>
          <button className="profile__button"
                  type="button"
                  onClick={this.props.onAddPlace}
          >
            <img className="profile__button-image" src={vectorCross} alt="Картинка крест"/>
          </button>
        </section>
        <section className="elements">
          {this.cardElements}
        </section>
      </main>
    );
  }
}
