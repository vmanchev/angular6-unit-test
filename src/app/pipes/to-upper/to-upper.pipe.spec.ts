import { ToUpperPipe } from './to-upper.pipe';

describe('ToUpperPipe', () => {

  const pipe = new ToUpperPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a text to upper-case', () => {
    expect(pipe.transform('test4')).toEqual('TEST4');
  });
});
