const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/services/mockData.js');
const assetsPath = path.join(__dirname, 'src/assets/img-produtos');

try {
    const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');
    const lines = mockDataContent.split('\n');
    const imports = lines.filter(line => line.trim().startsWith('import img'));
    
    console.log(`Checking ${imports.length} image imports...`);
    
    let allGood = true;
    
    imports.forEach(line => {
        // Parse 'import imgName from '../assets/img-produtos/filename.png';'
        const match = line.match(/from\s+['"]\.\.\/assets\/img-produtos\/(.+?)['"]/);
        if (match) {
            const filename = match[1];
            const fullPath = path.join(assetsPath, filename);
            if (!fs.existsSync(fullPath)) {
                console.error(`❌ MISSING: ${filename}`);
                allGood = false;
            } else {
                // console.log(`✅ OK: ${filename}`);
            }
        }
    });
    
    if (allGood) {
        console.log('All image imports are valid!');
    } else {
        console.log('Found missing image files.');
    }
    
} catch (e) {
    console.error('Error reading file:', e);
}
