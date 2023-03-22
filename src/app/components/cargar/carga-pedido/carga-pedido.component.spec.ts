import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaPedidoComponent } from './carga-pedido.component';

describe('CargaPedidoComponent', () => {
  let component: CargaPedidoComponent;
  let fixture: ComponentFixture<CargaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
