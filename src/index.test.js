import chatModule from '.';

test('says hello world', () => {
    expect(chatModule()).toBe('hello world');
});
