import { of } from 'rxjs';

export const mockHttpClient = {
    get: () => of(true),
    post: () => of(true),
    put: () => of(true),
    delete: () => of(true),
}