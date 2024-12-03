import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestuserComponent } from './gestuser.component';

describe('GestuserComponent', () => {
  let component: GestuserComponent;
  let fixture: ComponentFixture<GestuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
