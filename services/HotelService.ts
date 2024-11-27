import HelperStaticClasses from "../utils/helpers/HelperStaticClasses";
import Hotel from "../models/Hotel";
import BaseSupplier from "../utils/bases/BaseSupplier";
import Suppliers from "./Suppliers";
import { AmnitiesFilter } from "../utils/bases/BaseTypes";

export default class HotelsService {
    private hotels: Array<Hotel>;
    
    constructor() {
        this.hotels = [];
    }

    async fetchAndMergeHotels(hotelIds: Array<string>, destinationIds: Array<string>) {
        try {
            const suppliers: Record<string,BaseSupplier> = Suppliers;
            const allHotels: Array<Hotel> = [];
            for (const supplier of Object.values(suppliers)) {
                const supplierHotels = await supplier.fetch();
                allHotels.push(...supplierHotels);
            }
            this.mergeAndSave(allHotels);
            return this.find(hotelIds, destinationIds);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    mergeAndSave(hotels: Array<Hotel>) {
        const hotelMap = new Map();
        hotels.forEach((hotel) => {
            if (!hotelMap.has(hotel.id)) {
                hotelMap.set(hotel.id, hotel);
            } else {
                const existingHotel = hotelMap.get(hotel.id);
                hotelMap.set(hotel.id, this.mergeHotels(existingHotel, hotel));
            }
        });
        
        this.hotels = Array.from(hotelMap.values());
    }

    mergeHotels(hotelA: Hotel, hotelB: Hotel) {
        return {
            id: hotelA.id,
            destination_id: hotelA.destination_id || hotelB.destination_id,
            name: hotelA.name || hotelB.name,
            description:
                hotelA.description && hotelB.description
                    ? hotelA.description.length > hotelB.description.length
                    ? hotelA.description
                    : hotelB.description
                    : hotelA.description || hotelB.description,
            location: HelperStaticClasses.mergeLocations(hotelA.location, hotelB.location),
            amenities: {
                general: HelperStaticClasses.mergeAmenities(hotelA.amenities?.general, hotelB.amenities?.general,HelperStaticClasses.generalAmenitiesFilter),
                room: HelperStaticClasses.mergeAmenities(hotelA.amenities?.room, hotelB.amenities?.room, HelperStaticClasses.roomAmenitiesFilter),
            },
            images: {
                rooms: HelperStaticClasses.mergeImages(hotelA.images?.rooms, hotelB.images?.rooms),
                site: HelperStaticClasses.mergeImages(hotelA.images?.site, hotelB.images?.site),
                amenities: HelperStaticClasses.mergeImages(hotelA.images?.amenities, hotelB.images?.amenities),
            },
            booking_conditions: [...new Set([...(hotelA.booking_conditions || []), ...(hotelB.booking_conditions || [])])],
        };
    }

    find(hotelIds: Array<string>, destinationIds: Array<string>): Array<Hotel> {
        if ((!hotelIds || hotelIds.length === 0) && (!destinationIds || destinationIds.length === 0)) {
            return this.hotels;
        }
        
        return this.hotels.filter((hotel) => {
            const matchesHotelId = hotelIds ? hotelIds.includes(hotel.id) : true;
            const matchesDestinationId = destinationIds ? destinationIds.includes(hotel.destination_id.toString()) : true;
            return matchesHotelId && matchesDestinationId;
        });
    }
}