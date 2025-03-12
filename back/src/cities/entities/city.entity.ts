import {v4 as uuid} from "uuid"

export class City {
    id: string
    name: string
    description: string
    description2?: string
    image: string
    locationsCount: number

    constructor(name: string, description: string, description2: string, image: string, locationsCount: number) {
        this.id = uuid()
        this.name = name
        this.description = description
        this.description2 = description2
        this.image = image
        this.locationsCount = locationsCount
    }
}

