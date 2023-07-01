import {moviesApiSettings} from './utils';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _sendRequest(path) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(`${this._baseUrl}/${path}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
  }

  getMovies() {
    return this._sendRequest('beatfilm-movies');
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: moviesApiSettings.baseUrl,
});
