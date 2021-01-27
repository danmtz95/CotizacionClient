import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizacionComponent } from './list-organizacion.component';

describe('ListOrganizacionComponent', () => {
  let component: ListOrganizacionComponent;
  let fixture: ComponentFixture<ListOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrganizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
