class Todo {
  constructor(args) {
    this.id = args.id;
    this.content = args.content;
    this.completed = args.completed;
  }

  toggleCompleted() {
    return new Todo({
      id: this.id,
      content: this.content,
      completed: !this.completed
    });
  }
}

export default Todo;
