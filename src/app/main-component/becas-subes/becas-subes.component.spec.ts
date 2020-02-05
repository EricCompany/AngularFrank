import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecasSubesComponent } from './becas-subes.component';

describe('BecasSubesComponent', () => {
  let component: BecasSubesComponent;
  let fixture: ComponentFixture<BecasSubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecasSubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecasSubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
