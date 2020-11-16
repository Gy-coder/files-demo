const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(3,1)).toBeTruthy()
});

test('add',()=>{
  expect(sum(1,1)).toBe(2)
})