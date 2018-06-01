import { ChangemePipe } from './changeme.pipe';

describe('ChangemePipe', () => {

  const pipe = new ChangemePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a text to upper-case', () => {
    expect(pipe.transform('test4')).toEqual('TEST4');
  });
});
