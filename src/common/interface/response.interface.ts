export class IResponseResult<T> {
    state?: boolean = true;
    data: T = {} as T;
    message?: string;
}