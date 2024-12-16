export class VelvetMocker {
    constructor() {
        this.implementation = () => console.log();
        this._mockStates = new WeakMap();
        this._mockConfigs = new WeakMap();
    }

    _createDefaultMockConfig() {
        return {
            impl: () => {},
        }
    }

    _createDefaultMockState() {
        return {
            calls: [],
            lastCall: [],
            numberOfCalls: 0,
        }
    }

    _getMockConfig(f) {
        let config = this._mockConfigs.get(f);
        if (!config) {
            config = this._createDefaultMockConfig();
            this._mockConfigs.set(f, config);
        }
        return config;
    }

    _getMockState(f) {
        let state = this._mockStates.get(f);
        if (!state) {
            state = this._createDefaultMockState();
            this._mockStates.set(f, state);
        }
        return state;

    }

    fn(newImpl) {
        const mocker = this;
        const mockConstructor = function(...args) {
            const config = mocker._getMockConfig(f);
            const state = mocker._getMockState(f);
            state.calls.push(args)
            state.lastCall = args;
            state.numberOfCalls = state.numberOfCalls + 1;
            return config.impl(...args);
        }

        const f = this._createMockFuction(mockConstructor);

        f.setImplementation = (n) => this._setImplementation(f, n);
        f.getLastCall = () => this._getLastCalledWith(f);
        f.getNumberOfCalls = () => this._getCallCount(f);

        if(newImpl) {
            f.setImplementation(newImpl);
        }
        return f;
    }

    _createMockFuction(mockConstructor) {
        return mockConstructor;
    }

    _setImplementation(fn, newImpl) {
        let config = this._getMockConfig(fn);
        config.impl = newImpl;
    }

    _getLastCalledWith(f) {
        const state = this._getMockState(f);
        return state.lastCall;
    }

    _getCallCount(f) {
        const state = this._getMockState(f);
        return state.numberOfCalls;
    }
}

const mocker = new VelvetMocker();
export const fn  = mocker.fn.bind(mocker);
