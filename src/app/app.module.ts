import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import {
  counterReducer,
  locationReducer,
  storeReducer,
} from "src/services/data.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: "md",
    }),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      count: counterReducer,
      location: locationReducer,
      stores: storeReducer,
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
