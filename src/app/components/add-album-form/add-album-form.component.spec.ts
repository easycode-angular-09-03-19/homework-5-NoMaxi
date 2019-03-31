import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumFormComponent } from './add-album-form.component';

describe('AddAlbumFormComponent', () => {
  let component: AddAlbumFormComponent;
  let fixture: ComponentFixture<AddAlbumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlbumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlbumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
