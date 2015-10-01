import _ from 'lodash';
import fixtures from '~/src/fixtures/fixtures';
import httpMock from '~/spec/integration/http-mock';

import Todo from '~/src/app/model/todo';

describe('Todo app controller', () => {
  let controller;
  const todos = _.map(fixtures.todos, (todo) => new Todo(todo));

  beforeEach(angular.mock.module('todo-app'));
  beforeEach(httpMock.init());
  afterEach(httpMock.reset());

  beforeEach(angular.mock.inject(($controller) => {
    controller = $controller('TodoController');
  }));

  it('returns todos', (done) => {
    controller.loadTodos().then(() => {
      chai.expect(controller.todos).to.be.deep.equal(todos);
      done();
    });
  });

  it('deletes a todo', (done) => {
    controller.loadTodos()
      .then(() => controller.delete(_.first(controller.todos)))
      .then(() => {
        chai.expect(controller.todos).to.be.deep.equal(_.tail(todos));
        done();
      }
    );
  });

  it('adds a todo', (done) => {
    given:
    const newTodo = new Todo({ id: 3, content: 'Buy soup' });

    then:
    controller.loadTodos()
      .then(() => {
        controller.newTodo = newTodo;
        controller.add();
      })
      .then(() => {
        chai.expect(controller.todos).to.be.deep.equal(_.union(todos, [newTodo]));
        done();
      });
  });
});
