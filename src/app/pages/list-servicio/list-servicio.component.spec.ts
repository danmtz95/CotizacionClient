import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicioComponent } from './list-servicio.component';

describe('ListServicioComponent', () => {
  let component: ListServicioComponent;
  let fixture: ComponentFixture<ListServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
