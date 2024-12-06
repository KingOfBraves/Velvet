# Matchers

## Number types

### `toBeGreaterThan`
```js
    expect(5).toBeGreatherThan(4);
```

### `toBeGreaterThanOrEqual`
```js
    expect(5).toBeGreaterThanOrEqual(4);
    expect(4).toBeGreaterThanOrEqual(4);
```

### `toBeLessThan`
```js
    expect(3).toBeLessThan(4);
```

### `toBeLessThanOrEqual`
```js
    expect(3).toBeLessThanOrEqual(4);
    expect(4).toBeLessThanOrEqual(4);
```

## Iterables

### `ToContain`
```js
    expect([1, 2, 3, 4]).toContain(4);
    expect(['hello', 'velvet']).toContain('velvet');
```