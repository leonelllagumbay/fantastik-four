import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscCaseRowComponent } from './disc-case-row.component';

describe('DiscCaseRowComponent', () => {
  let component: DiscCaseRowComponent;
  let fixture: ComponentFixture<DiscCaseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscCaseRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscCaseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
