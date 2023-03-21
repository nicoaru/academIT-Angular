import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInfoUpgradeComponent } from './tabla-info-upgrade.component';

describe('TablaInfoUpgradeComponent', () => {
  let component: TablaInfoUpgradeComponent;
  let fixture: ComponentFixture<TablaInfoUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInfoUpgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaInfoUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
