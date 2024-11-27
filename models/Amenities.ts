export default class Amenities{

    general: Array<string> = [];
    room: Array<string> = [];

    constructor(params?: {general?: Array<string>, room?: Array<string>}) {
        if(params){
            this.general = Array.isArray(params.general) ? params.general : [];
            this.room = Array.isArray(params.room) ? params.room : [];
        }
    }
}