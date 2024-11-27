import { ApiResponse } from "../bases/BaseTypes";

export default class HelperFetchApi{
    static async fetchApi<T>(url: string): Promise<ApiResponse<T>>{
        try {
            const response = await fetch(url);
            let json: T | undefined = undefined;
            try {
                json = await response.json();
                return {
                    status: response.status,
                    data: json,
                };
            } catch (error) {
                throw new Error(`Failed to parse JSON response: ${error}`);
            }
        } catch (error) {
            throw new Error(`Failed to fetch API: ${error}`);
        }
    }
}