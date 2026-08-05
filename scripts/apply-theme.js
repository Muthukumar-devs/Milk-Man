const fs = require('fs');
const path = require('path');

const targetDirs = ['d:/nearby/consumer app/consumer app/app', 'd:/nearby/consumer app/consumer app/components'];

const replacements = [
  // Classes
  { from: /bg-blue-900/g, to: 'bg-ochre-200' },
  { from: /text-blue-900/g, to: 'text-espresso' },
  { from: /border-blue-900/g, to: 'border-ochre-200' },
  { from: /bg-white/g, to: 'bg-cream' },
  { from: /text-gray-800/g, to: 'text-espresso' },
  { from: /text-gray-700/g, to: 'text-espresso-100' },
  { from: /bg-gray-50/g, to: 'bg-cream-100' },
  { from: /bg-gray-100/g, to: 'bg-cream-100' },
  { from: /border-gray-100/g, to: 'border-cream-200' },
  { from: /border-gray-300/g, to: 'border-ochre-100' },
  // Hex Colors
  { from: /#3b4a87/ig, to: '#3E2723' },
  { from: /#ffffff/ig, to: '#FFFDF6' },
  { from: /#fff/ig, to: '#FFFDF6' },
  { from: /#000000/ig, to: '#3E2723' },
  { from: /#000/ig, to: '#3E2723' },
  { from: /#333333/ig, to: '#4E342E' },
  { from: /#333/ig, to: '#4E342E' },
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, (filePath) => {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        replacements.forEach(r => {
          newContent = newContent.replace(r.from, r.to);
        });
        
        if (content !== newContent) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Updated colors in ${filePath}`);
        }
      }
    });
  }
});
