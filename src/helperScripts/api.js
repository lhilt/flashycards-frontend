import axios from 'axios';
import getCookie from './getCSRF';

class API {
  constructor() {
    this.AUTH_OPTIONS = {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      }
    }
  }

  /* ------ AUTH ------ */
  static getToken() {
    return axios.get(
      `http://localhost:8000/token`,
      { withCredentials: true }
    );
  }

  static signUpUser(newUser) {
    return axios.post(
      `http://localhost:8000/signup`,
      newUser,
      this.AUTH_OPTIONS
    );
  }

  static signInUser(userInfo) {
    return axios.post(
      `http://localhost:8000/login`,
      userInfo,
      this.AUTH_OPTIONS
    );
  }

  /* ------ CARD ------ */
  static getAllCards(userPk, deckPk) {
    return axios.get(
      `http://localhost:8000/api/v1/users/${userPk}/decks/${deckPk}/cards`,
      this.AUTH_OPTIONS
    );
  }

  static createCard(userPk, deckPk, newCard) {
    return axios.post(
      `http://localhost:8000/api/v1/users/${userPk}/decks/${deckPk}/cards/new`,
      newCard,
      this.AUTH_OPTIONS
    );
  }

  static editCard(userPk, deckPk, cardPk, updated) {
    return axios.put(
      `http://localhost:8000/api/v1/users/${userPk}/decks/${deckPk}/cards/${cardPk}/edit`,
      updated,
      this.AUTH_OPTIONS
    );
  }

  static deleteCard(userPk, deckPk, cardPk) {
    return axios.delete(
      `http://localhost:8000/api/v1/users/${userPk}/decks/${deckPk}/cards/${cardPk}/delete`,
      this.AUTH_OPTIONS
    )
  }

  /* ------ DECK ------ */
  static getAllDecks(userPk) {
    return axios.get(
      `http://localhost:8000/api/v1/users/${userPk}/decks`,
      this.AUTH_OPTIONS
    )
  }

  static createDeck(userPk, newDeck) {
    return axios.post(
      `http://localhost:8000/api/v1/users/${userPk}/decks/new`,
      newDeck,
      this.AUTH_OPTIONS
    );
  }
}

export default API;
