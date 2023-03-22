import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMuebleComponent } from './carga-mueble.component';

describe('CargaMuebleComponent', () => {
  let component: CargaMuebleComponent;
  let fixture: ComponentFixture<CargaMuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaMuebleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaMuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
