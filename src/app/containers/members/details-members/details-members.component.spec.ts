import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMembersComponent } from './details-members.component';

describe('DetailsMembersComponent', () => {
  let component: DetailsMembersComponent;
  let fixture: ComponentFixture<DetailsMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
