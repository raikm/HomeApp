import { CalendarService } from "./calendar.service";

const service = new CalendarService();

export const useCalendarService = () => service;
