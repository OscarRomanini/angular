import { RestaurantModel } from "./restaurant/restaurant.model";
import {MEAT_API} from 'app/app.api'
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorHandler } from "./app.error-handler";
import { errorHandler } from "@angular/platform-browser/src/browser";

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) {}
       
    rests: RestaurantModel[]

    restaurants(): Observable<RestaurantModel[]> {
        return this.http.get(`${MEAT_API}/restaurants`)
            .map(res => res.json())
            .catch(ErrorHandler.handleError)
    }      

    restaurantById(id: string): Observable<RestaurantModel>{
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)

    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    //Todos os métodos https, por realizarem uma requisição assincrona,ou seja, não sabe o tipo da request 

}
