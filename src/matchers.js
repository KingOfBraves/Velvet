import { TestFailure, GenericTestFailure } from "./exceptions.js";

export const toEqual = (result, expected) => {
    if (Array.isArray(expected) && Array.isArray(result) && expected.length === result.length) {
        if (result.every((e, i) => e === expected[i])) {
            return true;
        }
    }
    if (result === expected) {
        return true;
    }
    throw new TestFailure(result, expected)
}

/**
 * expects given function to throw
 * @param {*} func 
 * @param {*} expectedError 
 * @returns 
 */
export const toThrow = (func, expectedError) => {
    try {
        func();
    } catch (e) {
        if (e instanceof Error) {
            if (!expectedError) {
                return true;
            }
            if (typeof expectedError === 'string') {
                if (e.message !== expectedError) {
                    throw new TestFailure(e.message, expectedError);
                }
            } else if (expectedError instanceof Error) {
                if (!(e instanceof expectedError) && e.name === expectedError.name) {
                    throw new TestFailure(e.message, expectedError.message);
                }
            }
            return true
        } else {
            throw e;
        }
    }
    throw new GenericTestFailure('expected function to throw');
}

export const toBeOfType = (result, expected) => {
    if (typeof result === expected) {
        return;
    }
    throw new TestFailure(result, expected);
}

/**************************************
 * Truthiness
 */

export const toBeTruthy = (result) => {
    if (result) {
        return true;
    }
    throw new TestFailure(result);
}

export const toBeFalsy = (result) => {
    if (!result) {
        return true;
    }
    throw new TestFailure(result);
}

export const toBeNull = (result) => {
    if (result === null) {
        return true;
    }
    throw new TestFailure(result);
}

export const toBeUndefined = (result) => {
    if (result === undefined) {
        return true;
    }
    throw new TestFailure(result);
}

export const toBeDefined = (result) => {
    if (result !== undefined && result !== null) {
        return true;
    }
    throw new TestFailure(result);
}


/**************************************
 * Numbers
 */

export const toBeGreaterThan = (result, expected) => {
    if (result > expected) {
        return;
    }
    throw new TestFailure(result, expected);
}

export const toBeGreaterThanOrEqual = (result, expected) => {
    if (result >= expected) {
        return;
    }
    throw new TestFailure(result, expected);
}

export const toBeLessThan = (result, expected) => {
    if (result < expected) {
        return;
    }
    throw new TestFailure(result, expected);
}

export const toBeLessThanOrEqual = (result, expected) => {
    if (result < expected) {
        return;
    }
    throw new TestFailure(result, expected);
}

/**************************************
 * Iterables
 */

export const toContain = (result,  expected) => {
    if (result === null || result) {
        throw new TestFailure(result, expected);
    }
    if (typeof result[Symbol.iterator] !== 'function') {
        throw new TestFailure(result, expected);
    }
    if (result.contains(expected)) {
        return true;
    }
    throw new TestFailure(result, expected);
}
