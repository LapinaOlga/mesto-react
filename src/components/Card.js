import React from "react";

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleClick() {
    this.props.onCardClick(this.props.card)
  }

  handleDeleteClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onCardDelete(this.props.card)
  }

  render() {
    return (
      <article className="element" onClick={this.handleClick}>
        <div className="element__image-button">
          <img src={this.props.card.link} alt={this.props.card.name} className="element__image"/>
          <button className="element__trash-button" onClick={this.handleDeleteClick}></button>
        </div>
        <div className="element__area">
          <h2 className="element__title">{this.props.card.name}</h2>
          <div className="element__group">
            <button className="element__button" type="button"></button>
            <h3 className="element__text">{this.props.card.likes.length}</h3>
          </div>
        </div>
      </article>
    );
  }
}
