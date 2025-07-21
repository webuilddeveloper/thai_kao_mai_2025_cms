import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextBorderComponent } from './input-text-border.component';

describe('InputTextBorderComponent', () => {
  let component: InputTextBorderComponent;
  let fixture: ComponentFixture<InputTextBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
