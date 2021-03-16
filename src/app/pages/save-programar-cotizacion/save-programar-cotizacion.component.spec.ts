import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProgramarCotizacionComponent } from './save-programar-cotizacion.component';

describe('SaveProgramarCotizacionComponent', () => {
  let component: SaveProgramarCotizacionComponent;
  let fixture: ComponentFixture<SaveProgramarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProgramarCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProgramarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
