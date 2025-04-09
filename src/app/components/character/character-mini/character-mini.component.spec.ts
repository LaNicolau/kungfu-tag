import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMiniComponent } from './character-mini.component';

describe('CharacterMiniComponent', () => {
  let component: CharacterMiniComponent;
  let fixture: ComponentFixture<CharacterMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
