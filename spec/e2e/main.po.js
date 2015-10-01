/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

class MainPage {
  constructor() {
    this.title = element(by.css('h1'));
    this.newTodoInputField = element(by.model('todoController.newTodo.content'));
    this.todos = element.all(by.repeater('todo in todoController.todos'));
    this.checkedTodos = element.all(by.css('input[type="checkbox"]:checked'));
    this.firstTodo = element(by.css('#todo-list > li:nth-child(1)'));
    this.firstTodoRemoveButton = element(by.css('#todo-list > li:nth-child(1) > button'));
  }
}

export default MainPage;
