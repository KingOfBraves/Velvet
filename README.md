# Velvet
Trying to setup a simple jest like framework using the least amount of external modules as I can. 

## Example

Jest like syntax
```js
describe('velvet test suite', () => {
    it('simple test', () => {
        expect(4).toBeLessThan(5);
        expect(() => throw new Error()).toThrow();
    })
})
```

Simple mocks
```js
const mockConsole = velvet.fn(() => console.log('hello velvet'));
mockConsole();
```

## TODO

- [x] Fix multiple suites running in sequence
- [ ] Setup expect object
  - get .not working
- [ ] Setup config file
- [x] Setup mock functions
  - [ ] setup matchers for mock functions
- [x] Look into node vm for running test files
  - [ ] Put in support for so that `--experimental-vm-modules` isnt mandatory
  - [ ] Fix swatch linker to handle node modules
- [ ] Investigate spyOn functionality
- [ ] Plugin support? (probably not useful but could be cool)
- [ ] Write docs
- [ ] Increment successes and failures in velvet class
