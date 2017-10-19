import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playground-matrix',
  templateUrl: './playground-matrix.component.html',
  styleUrls: ['./playground-matrix.component.scss']
})
export class PlaygroundMatrixComponent implements OnInit {
  @Input() matrixInfo: any;
  @Output() matrixHovered = new EventEmitter<number>();
  @Output() columnClicked = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    console.log('matrixInfo', this.matrixInfo);
  }

  matrixHover(i) {
    this.matrixHovered.emit(i);
  }

  matrixClicked(e) {
    this.columnClicked.emit(e);
  }

}
