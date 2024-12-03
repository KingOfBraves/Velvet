import * as matchers from './matchers.js';
import { TestFailure } from './exceptions.js';

class Velvet {
    static GENERIC_TESTS_LABEL = 'generic';
    constructor() {
        this.reset();
        // a test is an object with the shape { testname: String, test: function }
        this.tests = [];
        this.before = () => {};
        this.suites = [];
        this.results = {};
        this.currentSuite = undefined;
        this.suiteTests = [];
        this.runningSuite = undefined;
        this.rules = this._loadRules();
        this.logger = console;
    }

    setCurrentSuite(suitename = undefined) {
        this.currentSuite = suitename;
    }

    createNewSuite(suitename) {
        this.setCurrentSuite(suitename);
        this.results[suitename] = { successess: 0, failures: 0};
    }

    _setConfig() {

    }

    _loadRules() {
        const rules = [];
        for (const [k, _v] of Object.entries(matchers)) {
            rules.push(matchers[k]);
        }
        return rules;
    }

    /**
     * 
     * @param {*} value value to test
     * @param {*} expected expected value to test against
     * @param {function} custom if provided, expected to throw TestFailure on failure
     */
    expect(value) {
        return this._buildRules(value, this.rules)
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    expectVec(value, expected) {
        if (value.x !== expected.x || value.y !== expected.y || value.z !== expected.z) {
            throw new TestFailure(value.toString(), expected.toString());
        }
    }

    _buildRules(result, rules) {
        const rulesObject = {};
        rules.forEach(rule => {
            rulesObject[rule.name] = (expected) => rule(result, expected);
        })
        return rulesObject;
    }

    /**
     * test
     * @param {*} suitename 
     * @param {*} tests 
     */
    describe(suitename, tests) {
        // create new suite
        this.createNewSuite(suitename);
        try {
            tests();
        } 
        catch (e) {
            this.logger.error(e)
        }
        finally {
            this.closeCurrentSuite();
        }
        // set tests to be suite tests
    }

    it(testname, test) {
        this.logger.debug('adding test', testname)
        if (this.currentSuite) {
            this.logger.debug('--adding to suite');
            this.suiteTests.push({testname, test});
        } else {aa
            this.logger.debug('--adding to base tests');
            this.tests.push({testname, test});
        }
    }

    before(beforeFunction) {
        if (typeof beforeFunction === 'function') {
            this.before = beforeFunction;
        } else {
            throw new Error('before() requires a function as its argument')
        }
    }

    runTest({ testname, test, suitename }) {
        try {
            this.before();
            test()
            this.results[suitename].successess = this.results[suitename].successess + 1
        } catch (e) {
            const name = suitename ? suitename : Velvet.GENERIC_TESTS_LABEL;
            if (!this.failureReasons[name]) {
                this.failureReasons[name] = [];
            }
            this.failureReasons[name].push({ testname, reason: e.message, error: e})
            this.results[suitename].failures = this.results[suitename].failures + 1
        }
    }

    runSuite({ suitename, tests }) {
        tests.forEach(test => {
            this.runTest({ ...test, suitename })
        })
    }
    
    run() {
        this.suites.forEach(suite => {
            this.runSuite(suite);
        })
        this.tests.forEach(testObject => {
            this.runTest({...testObject, suitename: Velvet.GENERIC_TESTS_LABEL})
        });
    };

    print(printStack = false) {
        this.logger.log(this.failureReasons)
        this.logger.log(`Successess: ${this.successess}, Failures: ${this.failures}`);
        for (const suitename in this.results) {
            this.logger.log(suitename);
            this.logger.log('    ', 'successess:', this.results[suitename].successess)
            this.logger.log('    ', 'failures:', this.results[suitename].failures)
        }
        for (const suitename in this.failureReasons) {
            if (this.failureReasons[suitename].length > 0) {
                this.logger.log(suitename);
                this.failureReasons[suitename].forEach(failure => {
                    this.logger.log('    ', `${failure.testname}:`, failure.reason);
                    if (printStack) {
                        this.logger.log('   ', failure.error)
                    }
                })
            }
        }
    }

    reset() {
        this.successess = 0;
        this.failures = 0
        this.failureReasons = {};
        this.failureReasons[Velvet.GENERIC_TESTS_LABEL] = [];
    }

    closeCurrentSuite() {
        this.logger.debug(`closing current suite ${this.currentSuite}`);
        this.suites.push({suitename: this.currentSuite, tests: [...this.suiteTests]})
        this.currentSuite = undefined;
        this.suiteTests = [];
        this.logger.debug('current suites', this.suites)
    }

    getResults() {
        return this.results;
    }
}

const velvet = new Velvet();


const describe = (s, t) => velvet.describe(s, t);
const addRule = (r) => velvet.addRule(r);
const expect = (v) => velvet.expect(v);
const it = (tn, t) => velvet.it(tn, t);
const test = (tn, t) => velvet.it(tn, t);
const runTests = (print = true) => {
    velvet.run();
    velvet.print(print)
};

describe('velvet 2', () => {
    it('should run', () => {
        expect(1).toEqual(1);
    })
});

const mountVelvet = () => {
    global.velvet = velvet;
    global.describe = describe;
    global.addRule = addRule;
    global.expect = expect;
    global.it = it;
    global.test = test;
}

const loadSuites = async (files) => {
    const promises = [];
    files.forEach((filename) => {
        promises.push(import(filename));
    })
    console.log(promises)
    await Promise.all(promises);
    console.debug('loading finished')
}

const run = async (files) => {
    mountVelvet();
    await loadSuites(files);
    runTests();
}

export { run };