import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodoService {

  private url = "http://angular2api2.azurewebsites.net/api/internships";

  constructor( private http: Http ) { }


  // postNewTodo(todo){
  //   console.log(todo);
  //   var jTodo = {
  //      "todoCML" : todo._value.todo,
  //      "done" : "false"
  //     };
  //   return this.http.post(this.url, jTodo).map(this.extractData);
  // }

postTodo(todoCML): Observable < any > {
  // Here we create the data that goes to the API, like the body in postman
  const data = new URLSearchParams();
  data.append('todoCML', todoCML);
  data.append('done', "false");

  // Here we send the request and gets a response
  return this.http.post(this.url, data)
    .map(
      (response: Response) => {
        console.log(response);
        return response;
      }
    );
}



  // getAllTodos(){
  //   return this.http.get(this.url)
  //   .map(this.extractData);
  // };

  getAllTodos() {
    return this.http.get(this.url)
    .map((response: Response) => {
      return response.json();
    });
  }


  private extractData(res: Response){
    let body = res.json();
    console.log(body);
    return body;
  };

  deleteTodo(){

  }



}
