import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiService } from "src/services/api.service";
import { LocationService } from "src/services/location.service";
import { increment, addMoreStores } from "src/services/data.action";
import { Observable, firstValueFrom } from "rxjs";
import { take } from "rxjs/operators";

interface AppState {
  count: number;
  location: { latitude: number; longitude: number };
  stores: any;
}

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
})
export class CardListComponent implements OnInit {
  stores$: Observable<any>;
  count$: Observable<number>;
  stores: any = [];
  location: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0,
  };
  isLoading: boolean = false;

  constructor(
    private store: Store<AppState>,
    private _api: ApiService,
    private _location: LocationService,
    private cdr: ChangeDetectorRef
  ) {
    this.stores$ = this.store.select("stores");
    this.count$ = this.store.select("count");
    this.store.select("location").subscribe((res) => {
      this.location = res;
    });
    this.store.select("stores").subscribe((res: any) => {
      this.stores = res;
      console.log("Stores data updated:", this.stores);
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  async loadInitialData() {
    this.isLoading = true;
    const currentCount = await firstValueFrom(this.count$.pipe(take(1)));
    this._api.get(
      this.location.latitude,
      this.location.longitude,
      currentCount,
      currentCount + 10,
      (res: any) => {
        this.store.dispatch(increment());
        this.store.dispatch(addMoreStores({ stores: res.response }));
        this.isLoading = false;
      }
    );
  }

  async onIonInfinite(event: CustomEvent) {
    if (this.isLoading) {
      (event.target as HTMLIonInfiniteScrollElement).complete();
      return;
    }
    this.isLoading = true;
    const currentCount = await firstValueFrom(this.count$.pipe(take(1)));
    this._api.get(
      this.location.latitude,
      this.location.longitude,
      currentCount,
      currentCount + 5,
      (res: any) => {
        this.store.dispatch(increment());
        this.store.dispatch(addMoreStores({ stores: res.response }));
        this.isLoading = false;
        (event.target as HTMLIonInfiniteScrollElement).complete();
      }
    );
  }
}
