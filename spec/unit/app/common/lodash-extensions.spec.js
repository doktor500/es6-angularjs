import _ from '~/spec/lodash';

describe('insert lodash extension', () => {

  it('inserts an item on an empty array', () => {
    given:
    const array = [];
    const item = 'item';

    then:
    chai.expect(_.insert(array, item, 0)).to.be.deep.equal(['item']);
    chai.expect(_.insert(array, item, 1)).to.be.deep.equal(['item']);
  });

  it('inserts an item on an array of length 1', () => {
    given:
    const array = ['item-a'];
    const item = 'item-b';

    then:
    chai.expect(_.insert(array, item, 0)).to.be.deep.equal(['item-b']);
    chai.expect(_.insert(array, item, 1)).to.be.deep.equal(['item-a', 'item-b']);
  });

  it('inserts an item on an array of length 2', () => {
    given:
    const array = ['item-a', 'item-b'];
    const item = 'item-c';

    then:
    chai.expect(_.insert(array, item, 0)).to.be.deep.equal(['item-c', 'item-b']);
    chai.expect(_.insert(array, item, 1)).to.be.deep.equal(['item-a', 'item-c']);
    chai.expect(_.insert(array, item, 2)).to.be.deep.equal(['item-a', 'item-b', 'item-c']);
  });

  it('does not insert an item if the array is null', () => {
    chai.expect(_.insert(null, 'item', 0)).to.be.equal(null);
  });

  it('does not insert an item if the index is negative', () => {
    given:
    const array = ['item'];

    then:
    chai.expect(_.insert(array, 'item', -1)).to.be.equal(array);
  });
});
