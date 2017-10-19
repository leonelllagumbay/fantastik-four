import { ModalInfoComponent } from './../modal-info/modal-info.component';
import { ImOnline, IQuit } from './../../class/socket-message-model';
import { MessageFormatter } from './../../class/message-formatter';
import { GameKonstant } from './../../constant/game-konstant';
import { ConnectFourService } from './../../service/connect-four.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() playAgainClicked = new EventEmitter<number>();
  @Output() quitClicked = new EventEmitter<number>();
  form: FormGroup;
  constructor(private modalService: NgbModal, private _fb: FormBuilder, private _cs: ConnectFourService) { }

  ngOnInit() {
    this.form = this._fb.group({
      your_name: ['', [Validators.required]],
      online: ['', []]
    });

    const userForm = this.form.get('your_name');
    userForm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => {
      if (value !== '') {
        this.form.controls.online.setValue(true);
        this._cs.setMyName(value);
        this.tellMyFriendsImOnline(value);
      } else {
        this._cs.setMyName('');
        this.form.controls.online.setValue(false);
        // this.tellMyFriendsIQuit();

        // inform someone that you quit
        // this._cs.iQuit();
      }
    });

    if (this._cs.getMyName()) {
      userForm.setValue(this._cs.getMyName());
    }


  }

  open(winner) {
    // window.alert(winner);
    const modalRef = this.modalService.open(ModalInfoComponent);
    modalRef.componentInstance.name = winner;
    modalRef.result.then((result) => {
      // console.log('modal result', result);
    }, (reason) => {
      // console.log('reason of closing', reason);
    });
  }

  tellMyFriendsImOnline(value) {
    const params = {
      command: GameKonstant.get('im_online'),
      source_id: this._cs.getMyId(),
      name: value
    };
    const socketFormatter = new MessageFormatter<ImOnline>();
    const formattedStr = socketFormatter.formatSocketMessage(params);
    this._cs.sendMessage(formattedStr);
  }

  playConnectFour() {
    this.playAgainClicked.emit(0);
  }

  tellMyFriendsIQuit() {
    const params = {
      command: GameKonstant.get('quit'),
      source_id: this._cs.getMyId(),
      game_id: this._cs.getGameId()
    };
    const socketFormatter = new MessageFormatter<IQuit>();
    const formattedStr = socketFormatter.formatSocketMessage(params);
    this._cs.sendMessage(formattedStr);
  }
}
