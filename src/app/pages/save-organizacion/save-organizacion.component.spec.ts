import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrganizacionComponent } from './save-organizacion.component';

describe('SaveOrganizacionComponent', () => {
  let component: SaveOrganizacionComponent;
  let fixture: ComponentFixture<SaveOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveOrganizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
