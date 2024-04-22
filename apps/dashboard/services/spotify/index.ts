import { Store } from "pinia";
import { SpotifyService } from "./spotify.service";

export const useSpotifyService = (store: Store) => new SpotifyService(store);
