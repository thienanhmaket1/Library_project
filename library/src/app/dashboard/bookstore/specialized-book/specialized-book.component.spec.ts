import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedBookComponent } from './specialized-book.component';

describe('SpecializedBookComponent', () => {
  let component: SpecializedBookComponent;
  let fixture: ComponentFixture<SpecializedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
