import HotelController from "./controllers/HotelController";

const main = async () => {
    try {
        const args = process.argv.slice(2);
        const hotelIds = args[0] === "none" ? [] : args[0].split(",");
        const destinationIds = args[1] === "none" ? [] : args[1].split(",");
        await HotelController.fetchHotels(hotelIds, destinationIds);
    } catch (error) {
        console.error("Error:", error);
    }
    
};

main();