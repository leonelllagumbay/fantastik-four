import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixColumnComponent } from './matrix-column.component';

describe('MatrixColumnComponent', () => {
  let component: MatrixColumnComponent;
  let fixture: ComponentFixture<MatrixColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
