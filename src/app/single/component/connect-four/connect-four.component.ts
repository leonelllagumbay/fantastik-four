import { MatrixTop } from './../../class/matrix-top';
import { Matrix } from './../../class/matrix';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.scss']
})
export class ConnectFourComponent implements OnInit {
  matrix: Matrix;
  matrixData: any;
  matrixTop: MatrixTop;
  matrixTopData: any;
  constructor() { }

  ngOnInit() {
    this.matrix = new Matrix();
    this.matrixData = this.matrix.matrix;
    this.matrixTop = new MatrixTop();
    this.matrixTopData = this.matrixTop.matrixTop;

    console.log('matrix', this.matrixData, this.matrixTopData);
    // this.matrixTopData[0][0] = 1;
    // this.matrixTopData[0][1] = 2;
    // this.matrixData[0][0] = 1;
    // this.matrixData[0][1] = 2;
  }

  playgroundMatrixHover(e) {
    this.resetTop();
    this.matrixTopData[0][e] = 1;
  }

  resetTop() {
    for (let a = 0; a < this.matrixTopData[0].length; a++) {
      this.matrixTopData[0][a] = 0;
    }
  }

}
