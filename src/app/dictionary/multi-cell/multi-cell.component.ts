import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-cell',
  templateUrl: './multi-cell.component.html',
  styleUrls: ['./multi-cell.component.css']
})
export class MultiCellComponent implements OnInit {

  @Input() cellElement;
  @Input() type: String;
  public currentElements: String[];
  public numberOfElements: Number;

  constructor() { }

  private getCurrentElementsArray() {
    if (this.type === 'hungarian') {
      this.currentElements = this.cellElement.details.map(element => {
        return element.hungarian;
      });
    }
    if (this.type === 'partsOfSpeech') {
      this.currentElements = this.cellElement.details.map(element => {
        return element.partsOfSpeech;
      });
    }
    if (this.type === 'synonym') {
      this.currentElements = this.cellElement.details.map(element => {
        return element.synonym;
      });
    }
    if (this.type === 'example') {
      this.currentElements = this.cellElement.details.map(element => {
        return element.example;
      });
    }
    this.numberOfElements = this.currentElements.length - 1;
  }

  ngOnInit() {
    this.getCurrentElementsArray();
  }

}
