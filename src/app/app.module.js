import LodashExtensions from '~/src/app/common/lodash-extensions';
import AppConfig from '~/src/app/config/app.config';
import todoAppConfig from '~/src/app/app-config/config';
import RouterConfig from '~/src/app/config/app.route';
import App from '~/src/app/config/app.run';
import Backend from '~/src/app/config/app.backend';
import Log from '~/src/app/common/decorators/log';
import RestService from '~/src/app/common/rest-service';
import TodoService from '~/src/app/components/todo-service';
import { TodoController, TodoDirective } from '~/src/app/components/todo-component';

todoAppConfig();
angular.module('todo-app-backend-config', ['app-config']).config(Backend.load);
angular.module('todo-app', ['todo-app-backend-config', 'todo-app-backend', 'ui.router', 'ngSanitize'])
  .config(LodashExtensions.init)
  .config(AppConfig.init)
  .config(RouterConfig.init)
  .run(Backend.setUp)
  .run(App.run)
  .service('log', Log)
  .service('restService', RestService)
  .service('todoService', TodoService)
  .controller('TodoController', TodoController)
  .directive('todo', () => new TodoDirective());
