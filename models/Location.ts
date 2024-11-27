export default class Location{

    lat?: number;
    lng?: number;
    address?: string;
    city?: string;
    country?: string;

    constructor(
        params?: {lat?: number, lng?: number, address?: string, city?: string, country?: string}
    ) {
        if(params){
            this.lat = params.lat;
            this.lng = params.lng;
            this.address = params.address;
            this.city = params.city;
            this.country = params.country;
        }
    }
}