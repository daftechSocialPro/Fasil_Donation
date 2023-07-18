import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeamStoreComponent } from './home-team-store.component';

describe('HomeTeamStoreComponent', () => {
  let component: HomeTeamStoreComponent;
  let fixture: ComponentFixture<HomeTeamStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTeamStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTeamStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
