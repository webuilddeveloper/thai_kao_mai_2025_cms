import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneSingleFileComponent } from './dropzone-single-file.component';

describe('DropzoneSingleFileComponent', () => {
  let component: DropzoneSingleFileComponent;
  let fixture: ComponentFixture<DropzoneSingleFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropzoneSingleFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneSingleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
