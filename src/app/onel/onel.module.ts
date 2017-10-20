import { CanDeactivateFriends } from './class/can-deactivate-friends';
import { Owner } from './constant/game-konstant';
import { AppComponent } from './../app.component';
import { SocketIoModule, Socket, SocketIoConfig } from 'ng-socket-io';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectFourService } from './service/connect-four.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundMatrixComponent } from './component/playground-matrix/playground-matrix.component';
import { ConnectFourComponent } from './component/connect-four/connect-four.component';
import { DiscCaseRowComponent } from './component/disc-case-row/disc-case-row.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { DiscCellComponent } from './component/disc-cell/disc-cell.component';
import { MatrixColumnComponent } from './component/matrix-column/matrix-column.component';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './component/friends/friends.component';
import { ModalInfoComponent } from './component/modal-info/modal-info.component';

const routes: Routes = [{
  path: '',
  component: AppComponent
}, {
  path: Owner,
  component: ConnectFourComponent
}, {
  path: 'friends',
  component: FriendsComponent,
  canDeactivate: [CanDeactivateFriends]
}];

const config: SocketIoConfig = {
  url: 'https://calm-meadow-29333.herokuapp.com', options: {}
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes, {useHash: false}),
  ],
  entryComponents: [ModalInfoComponent],
  exports: [
    ConnectFourComponent
  ],
  providers: [ConnectFourService, FormBuilder, HttpClient],
  declarations: [PlaygroundMatrixComponent, ConnectFourComponent, DiscCaseRowComponent,
    ToolbarComponent, DiscCellComponent, MatrixColumnComponent, FriendsComponent, ModalInfoComponent]
})
export class OnelModule { }
