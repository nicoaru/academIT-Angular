import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPrivadoComponent } from './cargar-privado.component';

describe('CargarPrivadoComponent', () => {
  let component: CargarPrivadoComponent;
  let fixture: ComponentFixture<CargarPrivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarPrivadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarPrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
