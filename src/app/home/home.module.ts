import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { MenuComponent } from "src/components/menu/menu.component";
import { CardComponent } from "src/components/card/card.component";
import { HeaderComponent } from "src/components/header/header.component";
import { SearchComponent } from "src/components/search/search.component";
import { CardListComponent } from "src/components/card-list/card-list.component";
import { LoadingComponent } from "src/components/loading/loading.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    MenuComponent,
    CardComponent,
    HeaderComponent,
    SearchComponent,
    CardListComponent,
    LoadingComponent,
  ],
})
export class HomePageModule {}
