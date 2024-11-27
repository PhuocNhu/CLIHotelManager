import Hotel from "../../models/Hotel";
import HelperFetchApi from "../helpers/HelperFetchApi";
import { ApiResponse } from "./BaseTypes";

export default abstract class BaseSupplier{

    abstract url(): string;

    abstract parse(dto: Record<string, any>): Hotel;

    async fetch(): Promise<Array<Hotel>> {
        let response: ApiResponse<unknown>
        try {
            response = await HelperFetchApi.fetchApi(this.url());
        } catch (error) {
            throw new Error(`${error}`);
        }
        if(response.status === 200){
            if(Array.isArray(response.data)){
                return response.data.map((item) => new Hotel(this.parse(item)));
            }
            return [];
        }
        throw new Error(`Failed to fetch data from url: ${this.url()}`);
    }
}