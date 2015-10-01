import _ from '~/spec/lodash';
import TodoService from '~/src/app/components/todo-service';
import Todo from '~/src/app/model/todo';

describe('Todo service', () => {

  const HTTP_OK = 200, TODO = 'todo';
  let todoService, restService, rootScope, q;

  beforeEach(angular.mock.module('todo-app'));

  beforeEach(angular.mock.inject(($injector, $rootScope, $q) => {
    restService = $injector.get('restService');
    todoService = new TodoService(restService, $q);
    rootScope = $rootScope;
    q = $q;
  }));

  it('sets empty list of todos by default', () => {
    chai.expect(todoService.todos).to.be.deep.equal([]);
  });

  it('loads the list of todos', () => {
    given:
    const todo1 = { id: 1, content: 'Buy milk', completed: true };
    const todo2 = { id: 2, content: 'Buy beer', completed: true };
    const response = q.when([todo1, todo2]);
    const loadTodosAction = sinon.stub(restService, 'list').returns(response);
    const todos = [new Todo(todo1), new Todo(todo2)];

    when:
    todoService.loadTodos();

    then:
    chai.expect(loadTodosAction).to.have.been.calledWith(TODO);

    and:
    rootScope.$apply();

    then:
    chai.expect(todoService.todos).to.be.deep.equal(todos);
  });

  it('adds a todo', () => {
    given:
    const todo1 = new Todo({ id: 1, content: 'Buy milk', completed: true });
    const todo2 = new Todo({ id: 2, content: 'Buy beer', completed: true });
    const response = q.when(HTTP_OK);
    const addTodoAction = sinon.stub(restService, 'add').returns(response);

    todoService.todos = [todo1];

    when:
    todoService.add(todo2);

    then:
    chai.expect(addTodoAction).to.have.been.calledWith(TODO, todo2);

    and:
    chai.expect(todoService.todos).to.deep.equal([todo1, todo2]);
  });

  it('changes the state of a todo', () => {
    given:
    const todo = new Todo({ id: 1, completed: false });
    const completedTodo = new Todo({ id: 1, completed: true });
    const anotherTodo = new Todo({ id: 2, completed: false });
    const response = q.when(HTTP_OK);
    const updateTodoAction = sinon.stub(restService, 'update').returns(response);

    todoService.todos = [todo, anotherTodo];

    when:
    todoService.toggleCompleted(todo);

    then:
    chai.expect(todoService.todos).to.deep.equal([completedTodo, anotherTodo]);

    and:
    chai.expect(updateTodoAction).to.have.been.calledWith(TODO, completedTodo);
  });

  it('deletes a todo', () => {
    given:
    const todo1 = new Todo({ id: 1, content: 'Buy milk', completed: true });
    const todo2 = new Todo({ id: 2, content: 'Buy beer', completed: true });
    const todos = [todo1, todo2];
    const response = q.when(HTTP_OK);
    const deleteTodoAction = sinon.stub(restService, 'delete').returns(response);

    todoService.todos = todos;

    when:
    todoService.delete(todo1);

    then:
    chai.expect(deleteTodoAction).to.have.been.calledWith(TODO, todo1);

    and:
    chai.expect(todoService.todos).to.deep.equal(_.tail(todos));
  });
});
