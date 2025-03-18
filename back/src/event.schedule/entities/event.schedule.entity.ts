export enum WeekDay {
  Domingo = "Domingo",
  Segunda = "Segunda",
  Terca = "Terça",
  Quarta = "Quarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Sabado = "Sábado",
}

export class EventScheduleEntity {
    id: string;
    eventId: string;
    day: WeekDay;
    openingTime: string;
    closingTime: string; 
  }
  