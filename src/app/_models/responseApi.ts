import { Movie } from "./movie";


//implements Interfaces for given response
export interface ResponseApi{
    Search: Movie[],
    totalResults: string;
    Response: string;
}