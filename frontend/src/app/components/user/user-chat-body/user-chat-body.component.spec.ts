import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatBodyComponent } from './user-chat-body.component';

describe('UserChatBodyComponent', () => {
  let component: UserChatBodyComponent;
  let fixture: ComponentFixture<UserChatBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChatBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChatBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
