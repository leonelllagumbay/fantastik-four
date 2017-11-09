import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-disc-case-row',
  templateUrl: './disc-case-row.component.html',
  styleUrls: ['./disc-case-row.component.scss']
})
export class DiscCaseRowComponent implements OnInit {
  @Input() matrixTopInfo: any;
  constructor() { }

  ngOnInit() {
    console.log('disc case row', this.matrixTopInfo);
  }

}
