import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercComponent } from './ajouterc.component';

describe('AjouterComponent', () => {
  let component: AjoutercComponent;
  let fixture: ComponentFixture<AjoutercComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutercComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
