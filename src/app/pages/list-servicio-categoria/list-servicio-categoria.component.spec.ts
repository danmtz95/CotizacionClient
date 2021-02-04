import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicioCategoriaComponent } from './list-servicio-categoria.component';

describe('ListServicioCategoriaComponent', () => {
  let component: ListServicioCategoriaComponent;
  let fixture: ComponentFixture<ListServicioCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServicioCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicioCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
