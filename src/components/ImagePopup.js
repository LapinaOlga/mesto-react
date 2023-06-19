import React from "react";
import closeIcon from '../images/close-icon.png'

export default class ImagePopup extends React.Component {
  get containerClassName() {
    const parts = [
      'popup',
      'image-popup',
    ]

    if (this.props.card) {
      parts.push('popup_opened')
    }

    return parts.join(' ')
  }

  render() {
    return (
      <div className={this.containerClassName}>
        <div className="popup__container-image">
          <button className="popup__icon-close"
                  type="button"
                  onClick={this.props.onClose}
          >
            <img className="popup__icon-close-image" src={closeIcon} alt="Закрывание окна"/>
          </button>
          <img className="popup__image" src={this.props.card?.link} alt="#"/>
          <p className="popup__description">{this.props.card?.name}</p>
        </div>
      </div>
    );
  }
}
