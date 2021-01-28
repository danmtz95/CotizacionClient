import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveServicioComponent } from './save-servicio.component';

describe('SaveServicioComponent', () => {
  let component: SaveServicioComponent;
  let fixture: ComponentFixture<SaveServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
