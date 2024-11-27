import HotelsService from "../services/HotelService";

export default class HotelController{
    static async fetchHotels(hotelIds: Array<string>, destinationIds: Array<string>) {
        const service = new HotelsService();
        try {
            const hotels = await service.fetchAndMergeHotels(hotelIds, destinationIds);
            console.log(JSON.stringify(hotels,null, 2));
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}