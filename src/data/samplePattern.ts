const baseSymbols = ['●', '▲', '■', '○'];

function createGrid(rows: number, cols: number) {
    return Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((_, colIndex) => {
            return baseSymbols[(rowIndex + colIndex) % baseSymbols.length];
        })
    );
}

export const patternInfo = {
    title: 'Sample Pattern',
    width: 50,
    height: 50,
    symbols: {
        '●': { thread: 'DMC 310', name: 'Black', color: '#111111' },
        '▲': { thread: 'DMC 321', name: 'Red', color: '#c0392b' },
        '■': { thread: 'DMC Blanc', name: 'White', color: '#f5f1e8' },
        '○': { thread: 'DMC 798', name: 'Blue', color: '#2f5f9f' },
    },
    pages: [
        {
            pageNumber: 1,
            grid: createGrid(50, 50),
        },
    ],
};