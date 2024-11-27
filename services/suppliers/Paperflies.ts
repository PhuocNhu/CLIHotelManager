import BaseSupplier from "../../utils/bases/BaseSupplier";
import Hotel from "../../models/Hotel";

export default class Paperflies extends BaseSupplier {
    override url() {
        return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies";
    }
  
    override parse(dto: Record<string, any>) {
        return new Hotel({
            id: dto.hotel_id,
            destination_id: dto.destination_id,
            name: dto.hotel_name ?? undefined,
            description: dto.details ?? undefined,
            location: dto.location ?? undefined,
            amenities: dto.amenities ?? undefined,
            images: {
                rooms: dto.images.rooms?.map((room: any) => ({
                    link: room.link ?? undefined,
                    description: room.caption ?? undefined,
                })) ?? [],
                site: dto.images.site?.map((element: any) => ({
                    link: element.link ?? undefined,
                    description: element.caption ?? undefined,
                })) ?? [],
                amenities: [],
            },
            booking_conditions: dto.booking_conditions ?? [],
        });
    }
  }