import { SocketWhosOnline, ImOnline, InviteFriend, AcceptInvite, IQuit } from './../../class/socket-message-model';
import { MessageFormatter } from './../../class/message-formatter';
import { GameKonstant, Owner } from './../../constant/game-konstant';
import { ConnectFourService } from './../../service/connect-four.service';
import { Friend } from './../../class/friend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  onlineFriends: Friend[];
  gameId: string;
  results: any;
  isLoading: boolean;
  constructor(private _ar: ActivatedRoute,
  private _cs: ConnectFourService,
  private _router: Router) { }

  ngOnInit() {
    this.onlineFriends = [];

    this._ar.params.subscribe(
      value => {
        console.log('route params', value);
        // Invite friends here
        this.getWhosOnline();
      },
      err => {
        console.error('Something went wrong!');
      });

    // listen for incoming socket
    this._cs.getMessage().subscribe(data => {
      this.processIncomingData(data);
    });

    this.onlineFriends = [];
    this.isLoading = true;
  }

  processIncomingData(data) {
    if (data !== 'Welcome bro!') {
      const data_stream = JSON.parse(data);
      if (data_stream.command === GameKonstant.get('whos_online')) {
      this._cs.sayImOnline(data_stream);
      } else if (data_stream.command === GameKonstant.get('im_online')) {
      this.addOnlineToList(data_stream);
      } else if (data_stream.command === GameKonstant.get('invite_friend')) {
      this.addOnlineToListAsPending(data_stream);
      }  else if (data_stream.command === GameKonstant.get('accept_invite')) {
      this.startGame(data_stream);
      } else if (data_stream.command === GameKonstant.get('quit')) {
      this.removeFromList(data_stream);
      } else {
      // Ignore anything
      }
    }
  }

  removeFromList(data_stream: IQuit) {
    console.log('remove user from list');
    if (!this.doesNotExistName(data_stream.source_id)) {
      const temp_friends = [];
      for (const friend of this.onlineFriends) {
      if (friend.source_id !== data_stream.source_id) {
        console.log('exists to delete');
        temp_friends.push(friend);
      }
      }
      this.onlineFriends = temp_friends;
    }
  }

  addOnlineToListAsPending(data_stream: InviteFriend) {
    console.log('this invite is for me ', data_stream);
    if (data_stream.destination_id === this._cs.getMyId()) {
      if (this._cs.getMyName && this.doesNotExistName(data_stream.source_id)) {
      this.onlineFriends.push(new Friend('Accept', 'btn-primary', data_stream.name, data_stream.source_id));
      } else { // Update the name
      this.onlineFriends.map(friend => {
        if (friend.source_id === data_stream.source_id) {
        friend.name = data_stream.name;
        friend.requestAction = 'Accept';
        friend.requestClass = 'btn-primary';
        return friend;
        } else {
        return friend;
        }
      });
      }
    }
  }

  startGame(data_stream: AcceptInvite) {
    if (data_stream.destination_id === this._cs.getMyId() && data_stream.source_id === this._cs.getMyOpponentId()) {
      this._cs.setGameId(data_stream.game_id);
      this._cs.setTurnId(data_stream.turn_id);
      this._cs.setMyTurnId('turn' + Math.random().toString());
      this._router.navigate([Owner]);
    }
  }

  addOnlineToList(data_stream: ImOnline): void {
    console.log('add online users to list', this._cs.getMyId());
    if (data_stream.source_id && this.doesNotExistName(data_stream.source_id)) {
      if (this._cs.getMyName()) { // you know that your online if this is defined
      this.onlineFriends.push(new Friend('Invite', 'btn-warning', data_stream.name, data_stream.source_id));
      }
    } else { // Update the name
      this.onlineFriends.map(friend => {
      if (friend.source_id === data_stream.source_id) {
        friend.name = data_stream.name;
        return friend;
      } else {
        return friend;
      }
      });
    }
  }

  doesNotExistName(source_id) {
    for (const friend of this.onlineFriends) {
      if (friend.source_id === source_id) {
      return false;
      }
    }
    return true;
  }

  getWhosOnline() {
    this._cs.testHttp().subscribe(
      data => {
      this.results = data.results;
      console.log('post result', this.results);
      this.sendWhosOnline();
      },
      err => {
      console.error('Something went wrong with your request'); // Continue anyway
      this.sendWhosOnline();
    });
  }

  sendWhosOnline() {
    const params = {
      command: GameKonstant.get('whos_online'),
      source_id:  this._cs.getMyId()
    };
    const socketFormatter = new MessageFormatter<SocketWhosOnline>();
    const formattedStr = socketFormatter.formatSocketMessage(params);
    this._cs.sendMessage(formattedStr);
    this.isLoading = false;
  }

  inviteFriend(friend: Friend) {
  
    const params = {
      command: GameKonstant.get('invite_friend'),
      source_id:  this._cs.getMyId(),
      destination_id: friend.source_id,
      name: this._cs.getMyName()
    };
    const socketFormatter = new MessageFormatter<InviteFriend>();
    const formattedStr = socketFormatter.formatSocketMessage(params);
    this._cs.sendMessage(formattedStr);
  
    this._cs.setMyOpponentId(friend.source_id);
  
    this.onlineFriends.map(f => {
      if (f.source_id === friend.source_id) {
      f.requestClass = 'btn-success';
      return f;
      }
    });
  }

  acceptGame(friend: Friend) {
    this._cs.setGameId('gameid' + Math.random().toString());
    const turn_id = 'turnid' + Math.random().toString();
    this._cs.setTurnId(turn_id);
    this._cs.setMyTurnId(turn_id);
    const params = {
      command: GameKonstant.get('accept_invite'),
      source_id:  this._cs.getMyId(),
      destination_id: friend.source_id,
      name: this._cs.getMyName(),
      game_id: this._cs.getGameId(),
      turn_id: this._cs.getTurnId(),
    };
    const socketFormatter = new MessageFormatter<AcceptInvite>();
    const formattedStr = socketFormatter.formatSocketMessage(params);
    this._cs.sendMessage(formattedStr);
    this._router.navigate([Owner]);
  }

}
