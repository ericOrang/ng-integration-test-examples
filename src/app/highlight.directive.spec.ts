/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <p highlight="cyan">First</p>
    <p highlight>Second</p>
  `,
})
class DirectiveHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectiveHostComponent, HighlightDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.detectChanges();
  });

  it('should highlight first element with cyan', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[0];
    let el: HTMLElement = de.nativeElement;
    expect(el.style.backgroundColor).toBe('cyan');
  });

  it('should highlight second element with default color', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[1];
    let el: HTMLElement = de.nativeElement;
    let directive = de.injector.get(HighlightDirective);

    let defaultColor = directive.defaultColor;
    expect(el.style.backgroundColor).toBe(defaultColor);
  });
});
