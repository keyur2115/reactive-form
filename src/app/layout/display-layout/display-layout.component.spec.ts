import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLayoutComponent } from './display-layout.component';

describe('DisplayLayoutComponent', () => {
  let component: DisplayLayoutComponent;
  let fixture: ComponentFixture<DisplayLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
