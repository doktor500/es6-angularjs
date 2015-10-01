const TITLE = 'todos';
const HELP_TEXT = 'What needs to be done?';

class TodoController {
  /* @ngInject */
  constructor(todoService, log) {
    this.todoService = todoService;
    this.log = log;
    this.title = TITLE;
    this.helpText = HELP_TEXT;
    this.newTodo = {};
  }

  loadTodos() {
    return this.todoService.loadTodos().catch(() => this.log.error('Error loading todos'));
  }

  add() {
    return this.todoService.add(this.newTodo).then(() => this._resetNewTodo());
  }

  toggleCompleted(todo) {
    return this.todoService.toggleCompleted(todo);
  }

  delete(todo) {
    return this.todoService.delete(todo);
  }

  get todos() {
    return this.todoService.todos;
  }

  _resetNewTodo() {
    this.newTodo = {};
  }
}

class TodoDirective {
  constructor() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/todo.html',
      controller: TodoController,
      controllerAs: 'todoController',
      bindToController: true
    };
  }
}

export default { TodoController, TodoDirective };
