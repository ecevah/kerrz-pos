import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/services/api.service";
import { LocationService } from "src/services/location.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  ngOnInit() {
    this.getLocation();
  }

  constructor(private _api: ApiService, private _location: LocationService) {
    this.getLocation();
    this._api.get(0, 10, (res) => {
      console.log(res);
    });
  }

  async getLocation() {
    console.log("krallar önden");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log(coords);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}
