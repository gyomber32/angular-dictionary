import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCellComponent } from './multi-cell.component';

describe('MultiCellComponent', () => {
  let component: MultiCellComponent;
  let fixture: ComponentFixture<MultiCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
