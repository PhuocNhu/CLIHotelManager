import Image from "../../models/Image";
import Location from "../../models/Location";
import { AmnitiesFilter } from "../bases/BaseTypes";

export default class HelperStaticClasses{
    static mergeLocations = (loc1: Location = {}, loc2: Location = {}): Location => {
        const mergedLocation = new Location(loc1);
        Object.keys(loc2).forEach((key) => {
            const loc1Value = loc1[key as keyof Location];
            const loc2Value = loc2[key as keyof Location];
            if (!loc1Value || loc1Value.toString().trim() === '') {
                (mergedLocation as any)[key] = loc2Value;
            } else if (
                loc1Value !== undefined &&
                loc2Value !== undefined &&
                loc1Value.toString().length < loc2Value.toString().length
            ) {
                (mergedLocation as any)[key] = loc2Value;
            }
        })
        return mergedLocation;
    };
    static mergeAmenities = (array1: Array<string> = [], array2: Array<string> = [], filter: AmnitiesFilter): Array<string> => {
       
        const combinedArray = [...array1, ...array2];
        const uniqueMap = new Map();
        for(const item of combinedArray){
            const normalized = HelperStaticClasses.normalize(item);
            if(filter.condition(normalized, filter.notInclude)){
                continue;
            }
            let flag = true;
            for(const key of uniqueMap.keys()){
                if (key === normalized) {
                    if (item.length > uniqueMap.get(key).length) {
                      uniqueMap.set(key, item);
                    }
                    flag = false;
                    break;
                }
                if(key.includes(normalized) || normalized.includes(key)){
                    if(item.length > uniqueMap.get(key).length){
                        uniqueMap.set(normalized, item.toLowerCase().trim());
                        uniqueMap.delete(key);
                    }
                    flag = false;
                    break;
                }
            }
            if(flag)    uniqueMap.set(normalized, item.toLowerCase().trim());
        }
        return Array.from(uniqueMap.values());
    };
    static mergeImages = (imgSet1: Array<Image> = [], imgSet2: Array<Image> = []) => {
        const urlMap = new Map<string, Image>();
        [...imgSet1, ...imgSet2].forEach((img) => {
            const urlKey = img.link;
            if (urlKey && !urlMap.has(urlKey)) {
                urlMap.set(urlKey, {
                    link: img.link,
                    description: img.description || '',
                });
            }
        });
        return Array.from(urlMap.values());
    };
    static normalize(str: string): string{
        return str.toLowerCase().trim().replace(/\s+/g, '');
    }
    static generalAmenitiesFilter: AmnitiesFilter = {
        notInclude: ["aircon","tv","tub","iron","hairdryer","kettle","coffeemachine"],
        condition: (normalized, notInclude) => normalized.includes("minibar") || notInclude.some(element => normalized.includes(element) || element.includes(normalized)),
    }
    static roomAmenitiesFilter: AmnitiesFilter = {
        notInclude: ["pool","businesscenter","childcare","parking","drycleaning","wifi","breakfast","concierge"],
        condition: (normalized, notInclude) => !normalized.includes("minibar") && notInclude.some(element => normalized.includes(element) || element.includes(normalized)),
    }
}