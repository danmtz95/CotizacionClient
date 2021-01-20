import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarCodeComponent } from './bar-code.component';

describe('BarCodeComponent', () => {
  let component: BarCodeComponent;
  let fixture: ComponentFixture<BarCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
