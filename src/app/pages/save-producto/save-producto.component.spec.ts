import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaveProductoComponent } from './save-producto.component';

describe('SaveProductoComponent', () => {
  let component: SaveProductoComponent;
  let fixture: ComponentFixture<SaveProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
