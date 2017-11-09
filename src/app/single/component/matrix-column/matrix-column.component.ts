import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matrix-column',
  templateUrl: './matrix-column.component.html',
  styleUrls: ['./matrix-column.component.scss']
})
export class MatrixColumnComponent implements OnInit {
  @Input() matrixColumn: any;
  isActive: boolean;
  constructor() { }

  ngOnInit() {
    console.log('matrix column', this.matrixColumn);
  }

  matrixMouseOver() {
    this.isActive = true;
  }

  matrixMouseOut() {
    this.isActive = false;
  }
}
