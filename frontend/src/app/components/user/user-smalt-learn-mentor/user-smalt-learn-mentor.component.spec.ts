import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSmaltLearnMentorComponent } from './user-smalt-learn-mentor.component';

describe('UserSmaltLearnMentorComponent', () => {
  let component: UserSmaltLearnMentorComponent;
  let fixture: ComponentFixture<UserSmaltLearnMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSmaltLearnMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSmaltLearnMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
