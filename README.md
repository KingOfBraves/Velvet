# Velvet
Trying to setup a simple testing framework using the least amount of external modules as I can

## Example

```js
describe('velvet test suite', () => {
    it('simple test', () => {
        expect(4).toBeLessThan(5);
        expect(() => throw new Error()).toThrow();
    })
})
```

## TODO

- [x] Fix multiple suites running in sequence
- [ ] Setup expect object
  - get .not working
- [ ] Setup config file
- [x] Setup mock functions
  - [ ] setup matchers for mock functions
- [ ] Look into node vm for running test files