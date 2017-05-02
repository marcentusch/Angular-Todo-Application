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
  
  aListOfTodos = [
    {name: "Kill Voldemort", done: false},
    {name: "Learn Flipendo", done: false},
    {name: "Find Nevilles toad", done: false},
    {name: "Brew a potion", done: false},
    {name: "Slap Malfoy in the butt", done: false }
  ];




  incompleteTodos() : number {
    let count: number = 0;
    for(let i=0; i < this.aListOfTodos.length; i++) {
      if (!this.aListOfTodos[i].done) {
        count++;
      }
    }
    console.log(count);
    return count;
  }


  getTodos(){

    let oaAllTodos = this.todoService.getAllTodos();
    console.log(oaAllTodos);
    //jAllTodos.subscribe();

    let newArrayOfThings = []; //Bliver vi nød til fordi at API'en forvirre og vi kan ikke printe vores array ud
    
    for(let i in oaAllTodos){
      console.log(i);
    }

    // oaAllTodos.forEach(function(oTodo){
    //   newArrayOfThings.push(oTodo);
    //   console.log(oTodo);
    // });
    console.log(newArrayOfThings);

    //append js object to table
    // console.log(oaAllTodos);

    // oaAllTodos.forEach(function(todo){
    //   console.log(todo);
    //   this.appendNewTodo(todo);
    // });
  };



  appendNewTodo(newTodo){
    var todoName = newTodo._value.todo;
    this.aListOfTodos.push({
      // Fjern done false og opret det som et object som appendNewTodo laver lort med
      name: todoName, done: false
    });
  }


  submitTodoForm(addTodoForm){
    console.log(addTodoForm);
    this.appendNewTodo(addTodoForm);
    this.todoService.postNewTodo(addTodoForm)
                    .subscribe(addTodos => this.addTodoForm = addTodos)};


   ngOnInit() {
     this.getTodos();
    }

    
}


