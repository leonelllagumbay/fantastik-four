import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-info',
  template: `
    <div class='modal-body mx-auto' style='width: 300px;'>
    <h1>{{name}}</h1>
    </div>
  `,
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

}
