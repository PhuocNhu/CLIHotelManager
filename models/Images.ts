import Image from "./Image";

export default class Images{

    rooms: Array<Image> = [];
    site: Array<Image> = [];
    amenities: Array<Image> = [];

    constructor(params?: {rooms?: Array<Image>, site?: Array<Image>, amenities?: Array<Image>,}) {
        if(params){
            this.rooms = Array.isArray(params.rooms) ? params.rooms : [];
            this.site = Array.isArray(params.site) ?  params.site : [];
            this.amenities = Array.isArray(params.amenities) ? params.amenities : [];
        }
    }
}