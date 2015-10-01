import _ from 'lodash';
import Todo from '~/src/app/model/todo';

const TODO = 'todo';

class TodoService {
  /* @ngInject */
  constructor(restService) {
    this.restService = restService;
    this.todos = [];
  }

  loadTodos() {
    return this.restService.list(TODO).then((todos) => this._setTodos(todos));
  }

  add(newTodo) {
    const todo = new Todo(newTodo);
    this.todos = _.union(this.todos, [todo]);
    return this.restService.add(TODO, todo);
  }

  toggleCompleted(todo) {
    const updatedTodo = todo.toggleCompleted();
    this._update(todo, updatedTodo);
    return this.restService.update(TODO, updatedTodo);
  }

  delete(todo) {
    this.todos = _.without(this.todos, todo);
    return this.restService.delete(TODO, todo);
  }

  _update(todo, newTodo) {
    const index = _.findIndex(this.todos, todo);
    this.todos = _.insert(this.todos, newTodo, index);
  }

  _setTodos(todos) {
    this.todos = _.map(todos, (todo) => new Todo(todo));
  }
}

export default TodoService;
