import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default class EditAvatarPopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props, context) {
    super(props, context);

    this._ref = React.createRef();

    this.state = {
      avatar: this.context.avatar,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.onUpdateAvatar(this._ref.current.value);
    this._ref.current.value = '';
  }

  render() {
    return (
      <PopupWithForm
        title="Обновить аватар"
        name="update"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__label">
          <input id="avatar-link-input"
                 type="url"
                 ref={this._ref}
                 className="popup__item popup__item_el_link"
                 required
                 placeholder="Ссылка на картинку"
                 name="link"
          />
          <span className="link-input-error popup__error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
