import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private _http: HttpClient, private _err: ErrorService) {}

  get(
    latitude: number,
    longitude: number,
    skip: number,
    limit: number,
    calBack: (res: any) => void
  ) {
    const model = {
      latitude: latitude,
      longitude: longitude,
      skip: skip,
      limit: limit,
    };

    this._http
      .post<any>(environment.apiUrl, model, {
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
