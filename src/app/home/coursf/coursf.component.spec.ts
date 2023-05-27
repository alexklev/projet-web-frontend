import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursfComponent } from './coursf.component';

describe('CoursfComponent', () => {
  let component: CoursfComponent;
  let fixture: ComponentFixture<CoursfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
