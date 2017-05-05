import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators,
  FormControl } from '@angular/forms';
import { TodoValidators } from './app.customValidators';
import { TodoService } from './todo.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TodoService],
  styleUrls: ['./css/style.css']
})


export class AppComponent {


  private addTodoForm: FormGroup;


  constructor(fb: FormBuilder, private todoService : TodoService){
    this.addTodoForm = fb.group({
      'todo' : ["", TodoValidators.limitChars()]
    })
  };

  title = 'The great todo app';

  aListOfTodos = [];



  onRead() {
    this.todoService.getAllTodos().subscribe(response => {
      this.aListOfTodos = response.filter((todo) => {
        if (todo.todoCML) {
          this.aListOfTodos.push(todo);
          return todo;
        }
      });
      console.log(this.aListOfTodos);
      console.log("Data has been read.");
    });
  }


  //Adds a todo to the html
  appendNewTodo(newTodo){
    var todoName = newTodo._value.todo;
    this.aListOfTodos.push({
      todoCML: todoName, done: false
    });
  }

  // submitTodoForm(addTodoForm){
  //   console.log(addTodoForm);
  //   this.appendNewTodo(addTodoForm);
  //   this.todoService.postTodo(addTodoForm)
  //                   .subscribe(addTodos => this.addTodoForm = addTodos)
  // };

  onCreate(todoCML: String){
    this.todoService.postTodo(todoCML).subscribe(
      () => {
        this.onRead();

      }
    );
  }

   ngOnInit() {
     this.onRead();
    }


}


