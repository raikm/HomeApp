import axios from "axios";
import config from "../../../../config.json";
import { Zone } from "../../types/sonosTypes";

// https://www.zweitag.de/blog/vue-composition-api-introduction/
export class SonosService {
  async getZones(): Promise<Zone[]> {
    const response = await axios.get(`${config.sonos.rest_url}/zones`);
    return response.data;
  }
  async resume(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/play`).catch((error) => {
      console.error(error);
    });
  }

  pauseMusic(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/pause`);
  }

  nextTrack(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/next`);
  }

  previousTrack(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/previous`);
  }

  updateVolume(roomName: string, newVolume: number) {
    axios.get(`${config.sonos.rest_url}/${roomName}/groupVolume/${newVolume}`);
  }
}
