import Location from "./Location";
import Amenities from "./Amenities";
import Images from "./Images";


export default class Hotel{
    id: string;
    destination_id: number;
    name?: string;
    description?: string;
    location?: Location;
    amenities?: Amenities;
    images?: Images;
    booking_conditions?: Array<string> = [];


    constructor(params:{
        id: string,
        destination_id: number,
        name?: string,
        description?: string,
        location?: Location,
        amenities?: Amenities,
        images?: Images,
        booking_conditions?: Array<string>,
    }) {
        this.id = params.id;
        this.destination_id = params.destination_id;
        this.name = params.name ? params.name : "";
        this.description = params.description ? params.description : "";
        this.location = params.location ? params.location : undefined;
        this.amenities = params.amenities ? params.amenities : undefined;
        this.images = params.images ? params.images : undefined;
        this.booking_conditions = params.booking_conditions ? params.booking_conditions : [];
    }
}