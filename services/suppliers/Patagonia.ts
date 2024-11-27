import BaseSupplier from "../../utils/bases/BaseSupplier";
import Hotel from "../../models/Hotel";

export default class Patagonia extends BaseSupplier {
    override url() {
        return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia";
    }

    override parse(dto: Record<string, any>) {
        return new Hotel({
            id: dto.id,
            destination_id: dto.destination,
            name: dto.name ?? undefined,
            description: dto.info ?? undefined,
            location: {
                lat: dto.lat ?? undefined,
                lng: dto.lng ?? undefined,
                address: dto.address ?? undefined,
            },
            amenities: {
                general: [],
                room: dto.amenities ?? [],
            },
            images: {
                rooms: dto.images.rooms?.map((room: any) => ({
                    link: room.url ?? undefined,
                    description: room.description ?? undefined,
                })) ?? [],
                site: [],
                amenities: dto.images.amenities?.map((amenity: any) => ({
                    link: amenity.url ?? undefined,
                    description: amenity.description ?? undefined,
                })) ?? [],
            },
            booking_conditions: [],
        });
    }
}