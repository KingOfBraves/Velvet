export class TestFailure extends Error {
    constructor(value, expected, options) {
        const message = `${value} !== ${expected}`
        super(message, options)
    }
}

export class GenericTestFailure extends Error {
    constructor(message) {
        super(message, {})
    }
}
