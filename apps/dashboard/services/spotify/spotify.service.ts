import axios from "axios";
import { Store } from "pinia";
import qs from "qs";
import { State } from "../../store";

export class SpotifyService {
  store: Store<"store", State, {}, {}>;

  constructor(store: Store<"store", State, {}, {}>) {
    this.store = store;
  }

  handleSpotifyRedirect = () => {
    let code = this.getCode();
    if (code) this.authSpotifyAccount(code);
  };
  getCode = () => {
    let code: string | null = "";
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
    }
    return code;
  };

  authSpotifyAccount = (code: string) => {
    if (this.store.config == null) {
      console.error("error while reading config from store");
      return;
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      auth: {
        username: this.store.config.spotify.client_id,
        password: this.store.config.spotify.client_secret,
      },
    };

    const data = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: encodeURI(window.location.origin + "/"),
      client_id: this.store.config.spotify.client_id,
      client_secret: this.store.config.spotify.client_secret,
    };
    if (this.store.spotifyAccessToken == "") {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        )
        .then((response) => {
          if (this.store.spotifyAccessToken.length === 0) {
            if (response.data.access_token != undefined) {
              let access_token = response.data.access_token;
              localStorage.setItem("spotify_access_token", access_token);
            }
            if (response.data.refresh_token != undefined) {
              let refresh_token = response.data.refresh_token;
              localStorage.setItem("spotify_refresh_token", refresh_token);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}
