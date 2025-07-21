import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoListComponent } from './logo-list.component';

describe('LogoListComponent', () => {
  let component: LogoListComponent;
  let fixture: ComponentFixture<LogoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
