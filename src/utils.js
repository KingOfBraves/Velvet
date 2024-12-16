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
    return ESC + colours[colour] + text + ESC_FINISH;
}

const buildRow = (row, columns, border, lengthContainer) => {
    let rowContainer = [];
    
    columns.forEach(c => {
        const length = row[c].toString().length;
        const diff = lengthContainer[c] - length;
        const colour = row.failures === 0 ? 'green' : 'red';
        rowContainer.push(`${paint(row[c], colour)}${' '.repeat(diff)}`);
    })
    return border + ' ' + rowContainer.join(` ${border} `) + ' ' + border;
}

const objectMap = (o, cb) => {
    const result = [];
    for (const [_, entry] of Object.entries(o)) {
        result.push(cb(entry));
    }
    return result;
}

export const resultPrinter = (results, successes, failures) => {
    const border = paint('-', 'grey');
    const vertical = paint('|', 'grey');
    const lengthContainer = {}
    const columns = ['name', 'successes', 'failures'];
    let rowContainer = [];
    let totalLength = 0;
    columns.forEach((c) => {
        lengthContainer[c] = Math.max(...[c.length, ...(objectMap(results, r => r[c].toString().length))]);
        totalLength += lengthContainer[c];
    })
    console.log(lengthContainer)
    const edges = border.repeat(totalLength + (columns.length * 3) + 1);
    rowContainer.push(edges);
    rowContainer = rowContainer.concat(objectMap(results, r => buildRow(r, columns, vertical, lengthContainer)))

    rowContainer.push(edges);
    return rowContainer.join('\n');
}