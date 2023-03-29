import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingWorksComponent } from './participating-works.component';

describe('ParticipatingWorksComponent', () => {
  let component: ParticipatingWorksComponent;
  let fixture: ComponentFixture<ParticipatingWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatingWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipatingWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
