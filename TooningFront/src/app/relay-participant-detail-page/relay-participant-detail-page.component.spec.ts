import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayParticipantDetailPageComponent } from './relay-participant-detail-page.component';

describe('RelayParticipantDetailPageComponent', () => {
  let component: RelayParticipantDetailPageComponent;
  let fixture: ComponentFixture<RelayParticipantDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayParticipantDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelayParticipantDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
