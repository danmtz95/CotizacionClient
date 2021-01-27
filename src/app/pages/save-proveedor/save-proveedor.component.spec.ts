import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProveedorComponent } from './save-proveedor.component';

describe('SaveProveedorComponent', () => {
  let component: SaveProveedorComponent;
  let fixture: ComponentFixture<SaveProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
