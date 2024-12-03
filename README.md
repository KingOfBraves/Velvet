# Velvet
Testing framework based off jest

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

- [ ] Fix multiple suites running in sequence
- [ ] Setup expect object
  - get .not working