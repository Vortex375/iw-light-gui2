import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalControlComponent } from './global-control.component';

describe('GlobalControlComponent', () => {
  let component: GlobalControlComponent;
  let fixture: ComponentFixture<GlobalControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
