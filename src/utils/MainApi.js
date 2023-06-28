import {mainApiSettings} from './utils';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authUrl = options.authUrl;
  }

  _sendRequest(path, options = {}) {
    let optionsWithHeaders = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    };
    optionsWithHeaders = Object.assign(options, optionsWithHeaders);

    return fetch(`${this._baseUrl}/${path}`, optionsWithHeaders)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        return Promise.reject(res);
      }
    })
  }

  register(email, name, password) {
    return fetch(`${this._authUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, name, password})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res) => {
      return res;
    })
  }

  authorize(email, password) {
    return fetch(`${this._authUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return Promise.reject(`Ошибка: нет токена`);
      }
    })
  }

  getContent(token) {
    return fetch(`${this._authUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(data => data)
  }

  getUserInfo() {
    return this._sendRequest('users/me');
  }

  setUserInfo({ email, name }) {
    return this._sendRequest('users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        email: email,
        name: name,
      })
    });
  }

  getMovies() {
    return this._sendRequest('movies');
  }

  addMovie({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN }) {
    return this._sendRequest('movies', {
      method: 'POST',
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        thumbnail: thumbnail,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
      })
    });
  }

  deleteMovie(id) {
    return this._sendRequest(`movies/${id}`, {
      method: 'DELETE'
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: mainApiSettings.baseUrl,
  authUrl: mainApiSettings.authUrl,
});
