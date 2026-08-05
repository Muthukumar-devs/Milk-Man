const fs = require('fs');
const path = require('path');

const targetDirs = ['d:/nearby/consumer app/consumer app/app', 'd:/nearby/consumer app/consumer app/components'];

const replacements = [
  { from: /bg-blue-500/g, to: 'bg-ochre-200' },
  { from: /bg-blue-100/g, to: 'bg-cream-200' },
  { from: /bg-blue-50/g, to: 'bg-cream-200' },
  { from: /border-blue-500/g, to: 'border-ochre-200' },
  { from: /border-blue-200/g, to: 'border-ochre-100' },
  { from: /text-blue-500/g, to: 'text-ochre-200' },
  { from: /text-blue-600/g, to: 'text-espresso-100' },
  { from: /text-blue-800/g, to: 'text-espresso' },
  { from: /bg-white/g, to: 'bg-cream' } // Just in case any slipped through
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
          console.log(`Updated stray colors in ${filePath}`);
        }
      }
    });
  }
});
