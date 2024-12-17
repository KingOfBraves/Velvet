import { textTable, paint, objectMap } from "../utils.js";

describe('text table', () => {
    it('text paint', () => {
        const result = 'result'
        const blackResult = '\x1b[30mresult\x1b[0m'
        const redResult = '\x1b[31mresult\x1b[0m'
        const greenResult = '\x1b[32mresult\x1b[0m'
        const yellowResult = '\x1b[33mresult\x1b[0m'
        const blueResult = '\x1b[34mresult\x1b[0m'
        const magentaResult = '\x1b[35mresult\x1b[0m'
        const cyanResult = '\x1b[36mresult\x1b[0m'
        const whiteResult = '\x1b[37mresult\x1b[0m'
        const greyResult = '\x1b[90mresult\x1b[0m'

        expect(paint(result, 'black')).toEqual(blackResult);
        expect(paint(result, 'red')).toEqual(redResult);
        expect(paint(result, 'green')).toEqual(greenResult);
        expect(paint(result, 'yellow')).toEqual(yellowResult);
        expect(paint(result, 'blue')).toEqual(blueResult);
        expect(paint(result, 'magenta')).toEqual(magentaResult);
        expect(paint(result, 'cyan')).toEqual(cyanResult);
        expect(paint(result, 'white')).toEqual(whiteResult);
        expect(paint(result, 'grey')).toEqual(greyResult);
    });

    it('object map', () => {
        const mockMapFunc = velvet.fn();
        const mockObject = {
            test: {},
            test2: {},
            test3: {}
        };
        const result = objectMap(mockObject, mockMapFunc);
        expect(mockMapFunc).toHaveBeenCalledNTime(3);
        expect(result).toHaveLength(3)
    })
})