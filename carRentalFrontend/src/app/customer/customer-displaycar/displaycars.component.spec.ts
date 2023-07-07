import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycarsComponent } from './displaycars.component';

describe('DisplaycarsComponent', () => {
  let component: DisplaycarsComponent;
  let fixture: ComponentFixture<DisplaycarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaycarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaycarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
