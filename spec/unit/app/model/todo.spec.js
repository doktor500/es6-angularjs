import Todo from '~/src/app/model/todo';

describe('Todo', () => {

  it('returns todo content', () => {
    given:
    const content = 'Buy milk';
    const todo = new Todo({ content: content });

    then:
    chai.expect(todo.content).to.be.equal(content);
  });

  it('returns if todo has been completed', () => {
    given:
    const completed = false;
    const todo = new Todo({ completed: completed });

    then:
    chai.expect(todo.completed).to.be.equal(completed);
  });

  it('creates a new todo with completed state switched', () => {
    given:
    const todo = new Todo({ completed: false });

    when:
    const newTodo = todo.toggleCompleted();

    then:
    chai.expect(newTodo.completed).to.be.equal(true);
  });
});
