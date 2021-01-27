import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSucursalComponent } from './save-sucursal.component';

describe('SaveSucursalComponent', () => {
  let component: SaveSucursalComponent;
  let fixture: ComponentFixture<SaveSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
