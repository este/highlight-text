import expect from 'expect';
import highlightText from '../src/index';

describe('highlightText', () => {
  it('should highlight words case and accent insensitive', () => {
    const text = highlightText('foo Bla and bla and blá', 'bla');
    expect(text).toBe('foo <b>Bla</b> and <b>bla</b> and <b>blá</b>');
  });
  it('should highlight matches case and accent insensitive', () => {
    const text = highlightText('fooBlaandblaandblá', 'bla');
    expect(text).toBe('foo<b>Bla</b>and<b>bla</b>and<b>blá</b>');
  });
  it('should highlight with custom tag', () => {
    const text = highlightText('foo bla', 'bla', 'i');
    expect(text).toBe('foo <i>bla</i>');
  });
  it('should handle spaces', () => {
    const text = highlightText('foo   bla   and', 'bla');
    expect(text).toBe('foo   <b>bla</b>   and');
  });
  it('should handle multi words highlight', () => {
    const text = highlightText('mala chuchle', 'mala chuchle');
    expect(text).toBe('<b>mala</b> <b>chuchle</b>');
  });
  it('should handle multi words highlight in any order', () => {
    const text = highlightText('mala chuchle', 'chuchle mala');
    expect(text).toBe('<b>mala</b> <b>chuchle</b>');
  });
});
