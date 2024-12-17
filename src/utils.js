const ESC = '\x1b[';
const ESC_FINISH = '\x1b[0m';

const colours = {
    black: "30m",
    red: "31m",
    green: "32m",
    yellow: "33m",
    blue: "34m",
    magenta: "35m",
    cyan: "36m",
    white: "37m",
    grey: "90m",
}

export const paint = (text, colour) => {
    if (!colour) {
        return text;
    }
    return ESC + colours[colour] + text + ESC_FINISH;
}

const buildRow = (row, columns, border, lengthContainer, options = defaultTableOptions()) => {
    let rowContainer = [];
    
    columns.forEach(c => {
        const length = row[c.id].toString().length;
        const diff = lengthContainer[c.id] - length;
        const colour = options.fontColour(row, options);
        if (c.justification === 'right') {
            rowContainer.push(`${' '.repeat(diff)}${paint(row[c.id], colour)}`);
        } else {
            rowContainer.push(`${paint(row[c.id], colour)}${' '.repeat(diff)}`);
        }
    })
    return border + ' ' + rowContainer.join(` ${border} `) + ' ' + border;
}

const buildHeaders = (columns, border, lengthContainer, options = defaultTableOptions()) => {
    let rowBuilder = [];
    columns.forEach(c => {
        console.log(c)
        const length = c.name.toString().length;
        const diff = lengthContainer[c.id] - length;
        rowBuilder.push(`${paint(c.name, options.fontColour({}, options))}${' '.repeat(diff)}`);
    })
    return border + ' ' + rowBuilder.join(` ${border} `) + ' ' + border;
}

export const objectMap = (o, cb) => {
    const result = [];
    for (const [key, entry] of Object.entries(o)) {
        result.push(cb(key, entry));
    }
    return result;
}

/*
 * column = {
 *   name: '',
 *   id: '',
 *   justification: 'left',
 *  }
 *  
 *  data is either object of objects or []
 *  data = {
 *    mocking: { column1: '' }
 *   }
*/

const defaultTableOptions = () => {
    return {
        borderColour: 'grey',
        fontColour: (row, options) => 'green',
        vertical: '|',
        horizontal: '-',
        showHeaders: true,
    }
}

export const textTable = (columns, data, options = {}) => {
    let properData = data;
    let properOptions = { ...defaultTableOptions(), ...options };
    if (!Array.isArray(data)) {
        properData = objectMap(data, ((k, e) => ({ _oName: k, ...e })));
    }

    const vertical = paint(properOptions.vertical, properOptions.borderColour);
    const horizontal = paint(properOptions.horizontal, properOptions.borderColour);

    const lengthContainer = {};
    let totalLength = 0;
    columns.forEach((c) => {
        lengthContainer[c.id] = Math.max(...[c.id.length, ...properData.map((r) => r[c.id].toString().length)]);
        totalLength += lengthContainer[c.id];
    });

    const edge = horizontal.repeat(totalLength + (columns.length * 3) + 1);
    const rowContainer = [edge];

    if (properOptions.showHeaders) {
        rowContainer.push(buildHeaders(columns, vertical, lengthContainer, properOptions));
        rowContainer.push(edge);
    }

    properData.forEach((r) => {
        rowContainer.push(buildRow(r, columns, vertical, lengthContainer, properOptions));
    })
    rowContainer.push(edge);

    return rowContainer.join('\n');
}

export const resultPrinter = (results, successes, failures) => {
    const columns = [{ name: 'test', id: 'name' }, { name: 'passed', id: 'successes', justification: 'right' }, { name: 'failed', id: 'failures', justification: 'right' }]
    return textTable(columns, results, { fontColour: (row, options) => row.failures > 0 ? 'red' : 'green' });
}