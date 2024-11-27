import BaseSupplier from "../../utils/bases/BaseSupplier";
import Hotel from "../../models/Hotel";

export default class Acme extends BaseSupplier{
    override url(){
        return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme";
    }
    override parse(dto: Record<string, any>){
        return new Hotel({
            id: dto.Id,
            destination_id: dto.DestinationId,
            name: dto.Name ?? undefined,
            description: dto.Description ?? undefined,
            location: {
                lat: dto.Latitude ?? undefined,
                lng: dto.Longitude ?? undefined,
                address: dto.Address ?? undefined,
                city: dto.City ?? undefined,
                country: dto.Country ?? undefined,
            },
            amenities: {
                general: dto.Facilities ?? [],
                room: [],
            },
            booking_conditions: [],
        });
    }
}