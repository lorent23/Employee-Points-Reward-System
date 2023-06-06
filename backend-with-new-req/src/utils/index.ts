import { query } from "winston";

export const getPagination = (query: any) => {
    const {page, size} = query;
    const updatedPage = page ? page - 1: 0;
    const limit = size ? +size: 10;
    const offset = updatedPage ? updatedPage*limit: 0;

    return {limit, offset};
}
export const paginate = (rows: any, page: any, limit: any) => {
    const {count: totalItems, rows: data} = rows;
    const currentPage = page ? +page: 1;
    const totalPages = Math.ceil(totalItems/limit);

    return {totalItems, data, totalPages, currentPage};
}
export const dynamicFilter = (query: any) => {
    const queryParams = new URLSearchParams(query);
    const where: any = {};
    queryParams.forEach((value, key)=>{
        where[key] = value;
    });
    return where;
}