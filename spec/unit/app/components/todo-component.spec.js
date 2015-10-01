import TodoComponent from '~/src/app/components/todo-component';

import ng from '~/spec/unit/ng';

describe('Todo controller', () => {

  let controller, todoService, log, rootScope, q;

  beforeEach(angular.mock.module('todo-app'));

  beforeEach(angular.mock.inject(($injector, $rootScope, $q) => {
    todoService = $injector.get('todoService');
    log = $injector.get('log');
    rootScope = $rootScope;
    q = $q;
    controller = new TodoComponent.TodoController(todoService, log, q);
  }));

  it('sets title', () => {
    chai.expect(controller.title).to.be.equal('todos');
  });

  it('sets empty list of todos by default', () => {
    chai.expect(controller.todos).to.be.deep.equal([]);
  });

  it('loads todos', () => {
    given:
    const loadTodos = sinon.spy(todoService, 'loadTodos');

    when:
    controller.loadTodos();

    then:
    chai.expect(loadTodos).to.have.been.called;
  });

  it('returns todos', () => {
    given:
    const todos = [{ content: 'Buy milk' }, { content: 'Buy beer' }];
    todoService.todos = todos;

    then:
    chai.expect(controller.todos).to.be.deep.equal(todos);
  });

  it('logs error if an exception occurss while loading the todos', () => {
    given:
    const errorMessage = 'Error loading todos';
    const loadTodosError = q.reject();
    const loadTodos = sinon.stub(todoService, 'loadTodos').returns(loadTodosError);
    const logError = sinon.stub(log, 'error');

    when:
    controller.loadTodos();

    then:
    chai.expect(loadTodos).to.have.been.called;

    and:
    rootScope.$apply();

    then:
    chai.expect(logError).to.have.been.calledWith(errorMessage);
  });

  it('calls todo service to add a todo', () => {
    given:
    const todo = { content: 'Buy soup' };
    const todoAction = q.when();
    const addTodo = sinon.stub(todoService, 'add').returns(todoAction);
    controller.newTodo = todo;

    when:
    controller.add();

    then:
    chai.expect(addTodo).to.have.been.calledWith(todo);

    and:
    rootScope.$apply();

    then:
    chai.expect(controller.newTodo).to.be.deep.equal({});
  });

  it('calls todo service to switch todo completed state', () => {
    given:
    const todo = { content: 'Buy milk', completed: false };
    const toggleCompleted = sinon.stub(todoService, 'toggleCompleted');

    when:
    controller.toggleCompleted(todo);

    then:
    chai.expect(toggleCompleted).to.have.been.calledWith(todo);
  });

  it('calls todo service to delete a todo', () => {
    given:
    const todo = { content: 'Buy milk', completed: true };
    const deleteTodo = sinon.stub(todoService, 'delete');

    when:
    controller.delete(todo);

    then:
    chai.expect(deleteTodo).to.have.been.calledWith(todo);
  });
});

describe('Todo directive', () => {
  it('is defined', () => {
    chai.expect(new TodoComponent.TodoDirective()).to.be.defined;
  });

  it('displays title', () => {
    given:
    const element = ng.compile('todo');

    then:
    chai.expect(element.html()).to.contain('todos');
  });
});
