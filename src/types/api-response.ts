import { Meta } from "./meta";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta: Meta
}