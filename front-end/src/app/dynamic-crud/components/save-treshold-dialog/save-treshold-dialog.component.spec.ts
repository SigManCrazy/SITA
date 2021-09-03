import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTresholdDialogComponent } from './save-treshold-dialog.component';

describe('SaveTresholdDialogComponent', () => {
  let component: SaveTresholdDialogComponent;
  let fixture: ComponentFixture<SaveTresholdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTresholdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTresholdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
