import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscCellComponent } from './disc-cell.component';

describe('DiscCellComponent', () => {
  let component: DiscCellComponent;
  let fixture: ComponentFixture<DiscCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
