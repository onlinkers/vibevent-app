export interface Venue {
    name: string
    location: {
        coordinates: number[]
        type: "Point" | null
    }
}