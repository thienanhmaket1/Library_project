import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreDetailComponent } from './bookstore-detail.component';

describe('BookstoreDetailComponent', () => {
  let component: BookstoreDetailComponent;
  let fixture: ComponentFixture<BookstoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
