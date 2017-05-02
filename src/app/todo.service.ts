import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  private url = "http://angular2api2.azurewebsites.net/api/internships";

  constructor( private http: Http ) { }


  postNewTodo(todo){
    console.log(todo);
    var jTodo = {
       "todoCML" : todo._value.todo, 
       "done" : "false" 
      };
    return this.http.post(this.url, jTodo).map(this.extractData);
  }


  getAllTodos(){
    return this.http.get(this.url).map(this.extractData);
  };
  

  private extractData(res: Response){
    let body = res.json();
    return body;
  };

  deleteTodo(){
    
  }
  


}
