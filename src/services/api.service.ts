import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RestaurantListModel } from "src/models/restaurant_list.model";
import { environment } from "src/environments/environment";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private _http: HttpClient, private _err: ErrorService) {}

  get(skip: number, limit: number, calBack: (res: any) => void) {
    const model: RestaurantListModel = {
      latitude: 23,
      longitude: 23,
      skip: skip,
      limit: limit,
    };

    this._http
      .post(environment.apiUrl, model, {
        headers: { apiKey: environment.apiKey },
      })
      .subscribe({
        next: (res: any) => {
          calBack(res);
        },
        error: (err: HttpErrorResponse) => {
          this._err.errorHandler(err);
        },
      });
  }
}
