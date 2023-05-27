import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteruComponent } from './ajouteru.component';

describe('AjouterComponent', () => {
  let component: AjouteruComponent;
  let fixture: ComponentFixture<AjouteruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
