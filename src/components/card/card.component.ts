import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LocationService } from "src/services/location.service";

interface AppState {
  count: number;
  location: { latitude: number; longitude: number };
  stores: any;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() title: any;
  @Input() image: any;
  @Input() type: any;
  @Input() minPrice: any;
  @Input() open: any;
  @Input() close: any;
  @Input() rate: any;
  @Input() latitude: any;
  @Input() longitude: any;
  @Input() status: any;

  location: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0,
  };

  constructor(
    private store: Store<AppState>,
    private _location: LocationService
  ) {
    this.store.select("location").subscribe((res) => {
      this.location = res;
    });
  }

  ngOnInit() {
    console.log("Card Component Initialized with:", {
      title: this.title,
      image: this.image,
      type: this.type,
      minPrice: this.minPrice,
      open: this.open,
      close: this.close,
      rate: this.rate,
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }

  get kilometer(): number {
    return this._location.getDistanceBetweenPoints(
      this.location.latitude,
      this.location.longitude,
      this.latitude,
      this.longitude
    );
  }
}
