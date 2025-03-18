import { v4 as uuid } from "uuid";

export class City {
    id: string;
    name: string;
    description: string;
    description2?: string;
    image: string;
    touristSpotsCount: number;
    foodAndDrinksCount: number;
    organizedEventsCount: number;

    constructor(
        name: string,
        description: string,
        description2: string,
        image: string,
        touristSpotsCount: number = 0,
        foodAndDrinksCount: number = 0,
        organizedEventsCount: number = 0
    ) {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.description2 = description2;
        this.image = image;
        this.touristSpotsCount = touristSpotsCount;
        this.foodAndDrinksCount = foodAndDrinksCount;
        this.organizedEventsCount = organizedEventsCount;
    }
}
