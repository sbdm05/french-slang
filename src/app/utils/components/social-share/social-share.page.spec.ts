import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialSharePage } from './social-share.page';

describe('SocialSharePage', () => {
  let component: SocialSharePage;
  let fixture: ComponentFixture<SocialSharePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SocialSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
