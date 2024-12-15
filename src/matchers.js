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

const _isError = (err) => {
    if (Object.prototype.toString.call(err) === '[object Error]') {
        return true;
    }
    return false;
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
        if (_isError(e)) {
            if (!expectedError) {
                return true;
            }
            if (typeof expectedError === 'string') {
                if (e.message !== expectedError) {
                    throw new TestFailure(e.message, expectedError);
                }
            } else if (_isError(expectedError)) {
                if (e.name !== expectedError.name) {
                    throw new TestFailure(e.message, expectedError.message);
                }
            }
            return true
        } else {
            console.log('somethings wrong')
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

/**************************************
 * Mock Functions
 */

export const toHaveBeenCalled = (result) => {
    if (!result.getNumberOfCalls) {
        console.log('toHavbeBeenCalled', result)
        throw new GenericTestFailure('not a mock function');
    }
    if (result.getNumberOfCalls() > 0) {
        return true;
    }
    throw new GenericTestFailure(result.getNumberOfCalls());
}

export const toHaveBeenCalledNTime = (result, expected) => {
    if (!result?.getNumberOfCalls) {
        throw new GenericTestFailure('not a mock function');
    }
    if (result.getNumberOfCalls() === expected) {
        return true;
    }
    throw new TestFailure(result.getNumberOfCalls(), expected);
}