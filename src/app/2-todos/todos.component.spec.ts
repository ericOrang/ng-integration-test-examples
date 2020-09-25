import { HttpModule } from '@angular/http';
import { TodoService } from './todo.service';
/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';
import { of } from 'rxjs';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not
// provided the TodoService as a dependency to TodosComponent.
//
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TodosComponent],
      providers: [TodoService],
    }).compileComponents();
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  }));

  it('should load todos from the server', () => {
    // Get component level dependencies
    //  fixture.debugElement.injector.get(TodoService)

    // Get module level dependencies
    let service = TestBed.get(TodoService);

    spyOn(service, 'getTodos').and.returnValue(of([1, 2, 3]));
    fixture.detectChanges();
    expect(component.todos.length).toBe(3);
  });

  /**
   *  Test for async function with async test
   */
  it('should load todos from the server promise', async(() => {
    // Get component level dependencies
    //  fixture.debugElement.injector.get(TodoService)

    // Get module level dependencies
    let service = TestBed.get(TodoService);

    spyOn(service, 'getTodosPromise').and.returnValue(
      Promise.resolve([1, 2, 3])
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.todos.length).toBe(3);
    });
  }));

  /**
   *  Test for async function with fakeasync test
   */
  it('should load todos from the server promise', fakeAsync(() => {
    // Get component level dependencies
    //  fixture.debugElement.injector.get(TodoService)

    // Get module level dependencies
    let service = TestBed.get(TodoService);

    spyOn(service, 'getTodosPromise').and.returnValue(
      Promise.resolve([1, 2, 3])
    );
    fixture.detectChanges();
    tick();
    expect(component.todos.length).toBe(3);
  }));
});
