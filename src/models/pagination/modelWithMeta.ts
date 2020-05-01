import { PaginationMeta } from '@/models';

export interface ModelWithMeta<T> {
    meta: PaginationMeta;
    models: T;
}