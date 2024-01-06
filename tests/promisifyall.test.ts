import promisifyAll from '../src/PromisifyAll';

describe('promisifyAll', () => {
  it('should promisify all functions in an object', () => {
    type Org = { [key: string]: () => any };
    const object: Org = {
      foo: function () {},
      bar: function () {},
      baz: function () {},
    };

    promisifyAll(object);

    expect(object.fooAsync).toBeDefined();
    expect(object.barAsync).toBeDefined();
    expect(object.bazAsync).toBeDefined();
  });

  it('should promisify all functions in a prototype', () => {
    type Org = { [key: string]: () => any };
    const object: Org = {
      foo: function () {},
      bar: function () {},
      baz: function () {},
    };

    const proto: Org = {
      foo: function () {},
      bar: function () {},
      baz: function () {},
    };

    Object.setPrototypeOf(object, proto);

    promisifyAll(object);

    expect(object.fooAsync).toBeDefined();
    expect(object.barAsync).toBeDefined();
    expect(object.bazAsync).toBeDefined();

    expect(proto.fooAsync).toBeDefined();
    expect(proto.barAsync).toBeDefined();
    expect(proto.bazAsync).toBeDefined();
  });
});
