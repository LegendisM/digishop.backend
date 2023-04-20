import { v4 as uuidv4 } from "uuid";

export const uniqueSuffix = (extension: string = '') => {
    return `${uuidv4().replace(/-/g, '')}${Date.now()}${extension}`;
}