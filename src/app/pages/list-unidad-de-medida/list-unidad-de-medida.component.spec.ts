import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnidadDeMedidaComponent } from './list-unidad-de-medida.component';

describe('ListUnidadDeMedidaComponent', () => {
  let component: ListUnidadDeMedidaComponent;
  let fixture: ComponentFixture<ListUnidadDeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUnidadDeMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnidadDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
