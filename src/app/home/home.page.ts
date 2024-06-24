import { Component, OnInit } from "@angular/core";
import { Observable, firstValueFrom, take } from "rxjs";
import { Store } from "@ngrx/store";
import {
  increment,
  reset,
  handleLocation,
  loadStoresSuccess,
} from "src/services/data.action";
import { ApiService } from "src/services/api.service";

interface AppState {
  count: number;
  location: { latitude: number; longitude: number };
  stores: any;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  count$: Observable<number>;
  location$: Observable<{ latitude: number; longitude: number }>;
  location: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0,
  };
  stores: any;
  isLoading: boolean = true;

  constructor(private _api: ApiService, private store: Store<AppState>) {
    this.count$ = this.store.select("count");
    this.location$ = this.store.select("location");
    this.store.select("location").subscribe((res) => {
      this.location = res;
    });
    this.store.select("stores").subscribe((res: any) => {
      this.stores = res;
    });

    console.log(this.stores);
    this.getLocation();
  }

  ngOnInit() {}

  async fetchData() {
    const currentCount = await firstValueFrom(this.count$.pipe(take(1)));
    this._api.get(
      this.location.latitude,
      this.location.longitude,
      currentCount,
      currentCount + 5,
      (res: any) => {
        this.store.dispatch(increment());
        if (res && res.response && Array.isArray(res.response)) {
          this.store.dispatch(loadStoresSuccess({ stores: res.response }));
          setTimeout(() => {
            this.isLoading = false;
          }, 900);
        } else {
          console.error("Invalid response format", res);
        }
      }
    );
  }

  increment() {
    this.store.dispatch(increment());
  }

  reset() {
    this.store.dispatch(reset());
  }

  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log(coords);
          this.store.dispatch(
            handleLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          );
          this.fetchData();
        },
        (error) => {
          console.error("Error getting location", error);
          this.store.dispatch(
            handleLocation({
              latitude: 38.472192,
              longitude: 27.2441878,
            })
          );
          this.fetchData();
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}
