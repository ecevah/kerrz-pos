import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { searchStores } from "src/services/data.action";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  stores: any[] = [];
  filteredStores: any[] = [];
  searchTerm: string = "";

  constructor(private store: Store) {}

  ngOnInit() {
    this.stores = this.fetchStores();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.searchEvent.emit(this.searchTerm);
    this.store.dispatch(searchStores({ query: this.searchTerm }));
    this.filterStores(this.searchTerm);
  }

  filterStores(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredStores = [];
    } else {
      this.filteredStores = this.stores.filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  fetchStores(): any[] {
    return [{ name: "Store 1" }, { name: "Store 2" }, { name: "Store 3" }];
  }

  getDisplayedStores(): any[] {
    return this.searchTerm ? this.filteredStores : this.stores;
  }

  public pickerColumns = [
    {
      name: "meat",
      options: [
        {
          text: "Tümü",
          value: "pepperoni",
        },
        {
          text: "Coffee",
          value: "smoked-ham",
        },
        {
          text: "Restorant",
          value: "bacon",
        },
      ],
    },
    {
      name: "Open",
      options: [
        {
          text: "Tümü",
          value: "red-onion",
        },
        {
          text: "Açık",
          value: "peppers",
        },
        {
          text: "Kapalı",
          value: "black-olives",
        },
      ],
    },
    {
      name: "star",
      options: [
        {
          text: "Tümü",
          value: "pan",
        },
        {
          text: "5-4 Puan",
          value: "pan",
        },
        {
          text: "4-3 Puan",
          value: "hand-tossed",
        },
        {
          text: "2-1 Puan",
          value: "stuffed-crust",
        },
      ],
    },
  ];

  public pickerButtons = [
    {
      text: "Vazgeç",
      role: "cancel",
    },
    {
      text: "Onayla",
      handler: (value: any) => {},
    },
  ];
}
