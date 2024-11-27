export default class Image{

    link?: string;
    description?: string;
    
    constructor(params?: {link?: string, description?: string}){
        if(params){
            this.link = params.link;
            this.description = params.description;
        }
    }
}