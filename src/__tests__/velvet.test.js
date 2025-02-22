const isEven = (n) => {
    return n % 2 === 0;
}

describe('velvet', () => {
    it('should run', () => {
        expect(1).toEqual(1);
    })
    it('should run a second time', () => {
        expect(1).toEqual(1);
    })
    it('should run a third time', () => {
        expect(1).toEqual(1);
    })
    it('should run the first time', () => {
        expect(1).toEqual(1);
    })

    it('will run with functions defined in test', () => {
        const result = isEven(12);
        expect(result).toEqual(true);
        expect(isEven(13)).toEqual(false);
        expect(isEven(0)).toEqual(true);
        expect(isEven(-35)).toEqual(false);
    })
});