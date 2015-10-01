import Main from '~/spec/e2e/main.po';

describe('The main view', () => {

  const page = new Main();
  browser.get('/index.html');

  it('displays the list of todos', () => {
    expect(page.title.getText()).toBe('todos');
    expect(page.todos.count()).toBe(2);
  });

  it('displays the todos that are completed', () => {
    page.checkedTodos.then((todos) => expect(todos.length).toBe(1));
  });

  it('completes a todo', () => {
    page.todos.get(1).click();
    page.checkedTodos.then((todos) => expect(todos.length).toBe(2));
  });

  it('adds a todo', () => {
    when:
    page.newTodoInputField.sendKeys('Buy newspaper');
    page.newTodoInputField.submit();

    then:
    expect(page.todos.count()).toBe(3);
  });

  it('removes a todo', () => {
    given:
    browser.actions().mouseMove(page.firstTodo).perform();

    when:
    page.firstTodoRemoveButton.click();

    then:
    expect(page.todos.count()).toBe(2);
  });
});
