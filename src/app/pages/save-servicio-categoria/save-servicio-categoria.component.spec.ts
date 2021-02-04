import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveServicioCategoriaComponent } from './save-servicio-categoria.component';

describe('SaveServicioCategoriaComponent', () => {
  let component: SaveServicioCategoriaComponent;
  let fixture: ComponentFixture<SaveServicioCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveServicioCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveServicioCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
