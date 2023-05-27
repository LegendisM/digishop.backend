export interface IResponseResult<T> {
    state?: boolean;
    data: T;
    message?: string;
}