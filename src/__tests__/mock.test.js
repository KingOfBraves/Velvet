describe('mocking', () => {
    it('can mock a function', () => {
        let wasCalled2 = false;
        let wasCalled3 = false;
        const mockFunction = velvet.fn();
        const mockFunction2 = velvet.fn(() => { wasCalled2 = true });
        const mockFunction3 = velvet.fn((n) => { wasCalled3 = n });

        expect(wasCalled2).toEqual(false)
        expect(wasCalled3).toEqual(false)
        mockFunction();
        mockFunction2();
        mockFunction3('test');
        expect(wasCalled2).toEqual(true)
        expect(wasCalled3).toEqual('test')

        expect(mockFunction2.getLastCall()).toEqual([]);
        expect(mockFunction3.getLastCall()).toEqual(['test']);
    })
})