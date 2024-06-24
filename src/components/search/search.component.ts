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
          text: "Pepperoni",
          value: "pepperoni",
        },
        {
          text: "Smoked Ham",
          value: "smoked-ham",
        },
        {
          text: "Crispy Bacon",
          value: "bacon",
        },
      ],
    },
    {
      name: "veggies",
      options: [
        {
          text: "Red onion",
          value: "red-onion",
        },
        {
          text: "Peppers",
          value: "peppers",
        },
        {
          text: "Black olives",
          value: "black-olives",
        },
      ],
    },
    {
      name: "crust",
      options: [
        {
          text: "Pan style",
          value: "pan",
        },
        {
          text: "Hand tossed",
          value: "hand-tossed",
        },
        {
          text: "Stuffed crust",
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
