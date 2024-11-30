export const toEqual = (result, expected) => {
    if (result !== expected) {
        throw new TestFailure(result, expected)
    }
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
            if (typeof expectedError === 'string') {
                if (e.message !== expectedError) {
                    throw new TestFailure(e.message, expectedError);
                }
            } else if (expectedError instanceof Error) {
                if (e.message !== expectedError.message) {
                    throw new TestFailure(e.message, expectedError.message);
                }
            }
            return
        } else {
            throw e;
        }
    }
    throw new GenericTestFailure('expected function to throw');
}