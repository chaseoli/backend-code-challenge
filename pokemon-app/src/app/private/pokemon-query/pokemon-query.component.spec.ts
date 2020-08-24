import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonQueryComponent } from './pokemon-query.component';

describe('PokemonQueryComponent', () => {
  let component: PokemonQueryComponent;
  let fixture: ComponentFixture<PokemonQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
