const { PDFParse } = require('pdf-parse');
const fs = require('fs');

const filePath = './assets/sample.pdf';

async function main() {
    const parser = new PDFParse({ url: filePath });
    const result = await parser.getText();

    const output = {
        title: 'sample.pdf',
        pageCount: result.pages?.length ?? null,
        rawTextPreview: result.text.slice(0, 1000),
    };

    fs.writeFileSync(
        './src/data/patternAnalysis.json',
        JSON.stringify(output, null, 2),
        'utf8'
    );

    console.log('저장 완료: src/data/patternAnalysis.json');

    await parser.destroy();
}

main().catch(console.error);