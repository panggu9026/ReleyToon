import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingModifyComponent } from './participating-modify.component';

describe('ParticipatingModifyComponent', () => {
  let component: ParticipatingModifyComponent;
  let fixture: ComponentFixture<ParticipatingModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatingModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipatingModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
