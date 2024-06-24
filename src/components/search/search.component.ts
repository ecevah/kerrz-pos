import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(event: any) {
    this.searchEvent.emit(event.target.value);
  }
  constructor() {}

  ngOnInit() {}

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
