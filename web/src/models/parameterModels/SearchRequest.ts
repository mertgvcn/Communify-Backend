import { SearchTypes } from "../../enums/SearchTypes";

export interface SearchRequest {
    input: string,
    searchType: SearchTypes
}