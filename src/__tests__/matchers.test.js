import * as matchers from '../matchers.js';

describe('matchers', () => {
    it('toEqual', () => {
        expect(matchers.toEqual(4, 4)).toEqual(true);
        expect(() => matchers.toEqual(4, 5)).toThrow();
    })

    it('toThrow', () => {
        class FakeFailure extends Error {
            constructor(message, options) {
                super(message, options)
            }
        }
        const willThrow = (message) => { throw new FakeFailure(message)};
        const testErrorMessage = 'this is just a small test';
        expect(matchers.toThrow(() => willThrow())).toBeTruthy();
        expect(matchers.toThrow(() => willThrow(testErrorMessage), testErrorMessage)).toBeTruthy();
        expect(matchers.toThrow(() => willThrow(), FakeFailure)).toBeTruthy();
        expect(() => matchers.toThrow(() => {})).toThrow();
        expect(() => matchers.toThrow(() => {}, Error)).toThrow();
    })

    it('toBeOfType', () => {
        
    })
})