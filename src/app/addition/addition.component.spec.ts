import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictionComponent } from './addiction.component';

describe('AddictionComponent', () => {
  let component: AddictionComponent;
  let fixture: ComponentFixture<AddictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
