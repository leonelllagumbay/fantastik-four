import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectFourComponent } from './component/connect-four/connect-four.component';
import { DiscCaseRowComponent } from './component/disc-case-row/disc-case-row.component';
import { PlaygroundMatrixComponent } from './component/playground-matrix/playground-matrix.component';
import { MatrixColumnComponent } from './component/matrix-column/matrix-column.component';
import { DiscCellComponent } from './component/disc-cell/disc-cell.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { FriendsComponent } from './component/friends/friends.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ConnectFourComponent],
  declarations: [ConnectFourComponent, DiscCaseRowComponent, PlaygroundMatrixComponent, MatrixColumnComponent, DiscCellComponent, ToolbarComponent, FriendsComponent]
})
export class SingleModule { }
