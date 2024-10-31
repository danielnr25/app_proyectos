import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoautorizadoComponent } from './noautorizado.component';

describe('NoautorizadoComponent', () => {
  let component: NoautorizadoComponent;
  let fixture: ComponentFixture<NoautorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoautorizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoautorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
