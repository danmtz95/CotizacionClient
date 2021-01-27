import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveClienteComponent } from './save-cliente.component';

describe('SaveClienteComponent', () => {
  let component: SaveClienteComponent;
  let fixture: ComponentFixture<SaveClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
