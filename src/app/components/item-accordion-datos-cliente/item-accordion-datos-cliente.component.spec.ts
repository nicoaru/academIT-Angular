import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAccordionDatosClienteComponent } from './item-accordion-datos-cliente.component';

describe('ItemAccordionDatosClienteComponent', () => {
  let component: ItemAccordionDatosClienteComponent;
  let fixture: ComponentFixture<ItemAccordionDatosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAccordionDatosClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAccordionDatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
