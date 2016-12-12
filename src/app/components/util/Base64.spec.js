import * as Base64 from './Base64';

describe('Util: Base6', function () {
  it('Encodes a string to Base64', function () {
    expect(Base64.encode('Hello world!')).toEqual('SGVsbG8gd29ybGQh');
  });

  it('Decodes a Base64 to a String', function () {
    expect(Base64.decode('SGVsbG8gd29ybGQh')).toEqual('Hello world!');
  });
});