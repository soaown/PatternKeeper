const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const pdfPath = path.join(__dirname, "../assets/sample.pdf");
const outputPath = path.join(
    __dirname,
    "../src/data/patternAnalysis.json"
);

function cleanLine(line) {
    return line.replace(/\s+/g, " ").trim();
}

async function main() {
    const buffer = fs.readFileSync(pdfPath);

    const parser = new PDFParse({
        data: buffer,
    });

    const resultText = await parser.getText();

    await parser.destroy();

    const rawText = resultText.text || "";

    const rows = rawText
        .split("\n")
        .map(cleanLine)
        .filter(Boolean);

    const symbolRows = rows.filter((row) => {
        const chars = row.replace(/\s/g, "");

        if (chars.length < 10) return false;

        const symbolLikeCount = [...chars].filter((ch) =>
            /[^\dA-Za-z가-힣\s]/.test(ch)
        ).length;

        return symbolLikeCount / chars.length > 0.3;
    });

    const patternWidth = 70;

    const patternRows = symbolRows
        .map((row) => row.replace(/\s/g, ""))
        .filter((row) => row.length === patternWidth);

    const gridRows = patternRows.map((row, rowIndex) => {
        return [...row].map((symbol, colIndex) => ({
            row: rowIndex,
            col: colIndex,
            symbol,
            checked: false,
        }));
    });

    const rowLengths = gridRows.map((row) => row.length);

    const result = {
        title: "sample.pdf",
        pageCount: resultText.total || 41,

        rowCount: gridRows.length,
        firstRowLength: gridRows[0]?.length ?? 0,

        minRowLength: rowLengths.length ? Math.min(...rowLengths) : 0,
        maxRowLength: rowLengths.length ? Math.max(...rowLengths) : 0,

        rowLengthCounts: rowLengths.reduce((acc, length) => {
            acc[length] = (acc[length] || 0) + 1;
            return acc;
        }, {}),

        sampleRows: gridRows.slice(0, 10).map((row) =>
            row.map((cell) => cell.symbol).join("")
        ),

        grid: gridRows,
        rawTextPreview: rawText.slice(0, 500),
    };

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

    console.log("PDF analysis complete");
    console.log("pageCount:", result.pageCount);
    console.log("rowCount:", result.rowCount);
    console.log("firstRowLength:", result.firstRowLength);
    console.log("minRowLength:", result.minRowLength);
    console.log("maxRowLength:", result.maxRowLength);
    console.log("rowLengthCounts:", result.rowLengthCounts);
    console.log("sampleRows:", result.sampleRows);
}

main().catch(console.error);