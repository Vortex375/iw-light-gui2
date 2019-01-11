import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneControlComponent } from './zone-control.component';

describe('ZoneControlComponent', () => {
  let component: ZoneControlComponent;
  let fixture: ComponentFixture<ZoneControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
