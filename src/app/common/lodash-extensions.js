import _ from 'lodash';

class LodashExtensions {
  static init() {
    _.mixin({
      insert: (array, item, index) => {
        if (_.isArray(array) && index >= 0) {
          const left = _.take(array, index);
          const right = _.takeRight(array, array.length - index - 1);
          return _.union(left, [item], right);
        }
        return array;
      }
    });
  }
}

export default LodashExtensions;
