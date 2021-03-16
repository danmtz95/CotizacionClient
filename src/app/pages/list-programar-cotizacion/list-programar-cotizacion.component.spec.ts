import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgramarCotizacionComponent } from './list-programar-cotizacion.component';

describe('ListProgramarCotizacionComponent', () => {
  let component: ListProgramarCotizacionComponent;
  let fixture: ComponentFixture<ListProgramarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProgramarCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProgramarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
