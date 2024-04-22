import { SonosService } from "./sonos.service";

const service = new SonosService();

export const useSonosService = () => service;
