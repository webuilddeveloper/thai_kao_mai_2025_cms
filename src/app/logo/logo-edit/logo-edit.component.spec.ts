import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoEditComponent } from './logo-edit.component';

describe('LogoEditComponent', () => {
  let component: LogoEditComponent;
  let fixture: ComponentFixture<LogoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
