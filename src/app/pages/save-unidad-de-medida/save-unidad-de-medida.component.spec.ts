import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUnidadDeMedidaComponent } from './save-unidad-de-medida.component';

describe('SaveUnidadDeMedidaComponent', () => {
  let component: SaveUnidadDeMedidaComponent;
  let fixture: ComponentFixture<SaveUnidadDeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveUnidadDeMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveUnidadDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
