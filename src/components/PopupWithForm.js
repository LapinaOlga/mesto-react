import React from 'react';
import closeIcon from '../images/close-icon.png'

export default class PopupWithForm extends React.Component {
  get containerClassName() {
    const classNames = ['popup', `${this.props.name}-popup`];

    if (this.props.isOpen) {
      classNames.push('popup_opened')
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className={this.containerClassName}>
        <div className="popup__container">
          <button
            className="popup__icon-close"
            type="button"
            onClick={this.props.onClose}
          >
            <img className="popup__icon-close-image"
                 src={closeIcon}
                 alt="Закрывание окна"
            />
          </button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form className="popup__form"
                name={`${this.props.name}Form`}
                onSubmit={this.props.onSubmit}
                noValidate
          >
            <div className="popup__area">
              {this.props.children}
            </div>
            <button className="popup__button" type="submit">
              {this.props.buttonText ?? 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
