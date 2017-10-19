import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundMatrixComponent } from './playground-matrix.component';

describe('PlaygroundMatrixComponent', () => {
  let component: PlaygroundMatrixComponent;
  let fixture: ComponentFixture<PlaygroundMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroundMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
