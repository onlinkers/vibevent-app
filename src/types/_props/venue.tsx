export interface Venue {
    name: string
    location?: {
        coordinates: number[]
        type: string| "Point" | null
    }
}