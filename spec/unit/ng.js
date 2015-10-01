const APP_MODULE = 'todo-app';
const TEMPLATES_MODULE = 'todo-app-templates';

class AngularUtils {

  static compile(directiveName, directiveTemplate) {
    const $injector = angular.injector(['ng', APP_MODULE, TEMPLATES_MODULE]);
    const $compile = $injector.get('$compile');
    const $rootScope = $injector.get('$rootScope');
    const $template = directiveTemplate ? directiveTemplate : `<${directiveName}></${directiveName}>`;
    const $directive = angular.element($template);
    const $element = $compile($directive)($rootScope);
    $rootScope.$apply();
    return $element;
  }
}

export default AngularUtils;
