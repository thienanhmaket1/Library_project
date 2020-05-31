import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedComponent } from './specialized.component';

describe('SpecializedComponent', () => {
  let component: SpecializedComponent;
  let fixture: ComponentFixture<SpecializedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
