import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCotizacionComponent } from './save-cotizacion.component';

describe('SaveCotizacionComponent', () => {
  let component: SaveCotizacionComponent;
  let fixture: ComponentFixture<SaveCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
