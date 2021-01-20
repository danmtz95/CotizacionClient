import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaveUsuarioComponent } from './save-usuario.component';

describe('SaveUsuarioComponent', () => {
  let component: SaveUsuarioComponent;
  let fixture: ComponentFixture<SaveUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
