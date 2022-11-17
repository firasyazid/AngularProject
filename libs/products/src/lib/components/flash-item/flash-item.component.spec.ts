import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashItemComponent } from './flash-item.component';

describe('FlashItemComponent', () => {
  let component: FlashItemComponent;
  let fixture: ComponentFixture<FlashItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
