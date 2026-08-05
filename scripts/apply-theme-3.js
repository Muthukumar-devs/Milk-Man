const fs = require('fs');
const path = require('path');

const targetDirs = ['d:/nearby/consumer app/consumer app/app', 'd:/nearby/consumer app/consumer app/components'];

const classReplacements = [
  // Text Grays
  { from: /\btext-gray-900\b/g, to: 'text-espresso' },
  { from: /\btext-gray-800\b/g, to: 'text-espresso' },
  { from: /\btext-gray-700\b/g, to: 'text-espresso-100' },
  { from: /\btext-gray-600\b/g, to: 'text-espresso-100' },
  { from: /\btext-gray-500\b/g, to: 'text-ochre-200' },
  { from: /\btext-gray-400\b/g, to: 'text-ochre-200' },
  { from: /\btext-gray-300\b/g, to: 'text-ochre-100' },
  { from: /\btext-gray-200\b/g, to: 'text-cream-200' },
  
  // Background Grays
  { from: /\bbg-gray-900\b/g, to: 'bg-espresso' },
  { from: /\bbg-gray-800\b/g, to: 'bg-espresso' },
  { from: /\bbg-gray-700\b/g, to: 'bg-espresso-100' },
  { from: /\bbg-gray-600\b/g, to: 'bg-espresso-100' },
  { from: /\bbg-gray-500\b/g, to: 'bg-ochre-200' },
  { from: /\bbg-gray-400\b/g, to: 'bg-ochre-200' },
  { from: /\bbg-gray-300\b/g, to: 'bg-ochre-100' },
  { from: /\bbg-gray-200\b/g, to: 'bg-cream-200' },
  { from: /\bbg-gray-100\b/g, to: 'bg-cream-100' },
  { from: /\bbg-gray-50\b/g, to: 'bg-cream' },
  { from: /\bbg-slate-100\b/g, to: 'bg-cream-100' },

  // Border Grays
  { from: /\bborder-gray-900\b/g, to: 'border-espresso' },
  { from: /\bborder-gray-800\b/g, to: 'border-espresso' },
  { from: /\bborder-gray-700\b/g, to: 'border-espresso-100' },
  { from: /\bborder-gray-600\b/g, to: 'border-espresso-100' },
  { from: /\bborder-gray-500\b/g, to: 'border-ochre-200' },
  { from: /\bborder-gray-400\b/g, to: 'border-ochre-200' },
  { from: /\bborder-gray-300\b/g, to: 'border-ochre-100' },
  { from: /\bborder-gray-200\b/g, to: 'border-cream-200' },
  { from: /\bborder-gray-100\b/g, to: 'border-cream-100' },
  
  // Black & White
  { from: /\btext-white\b/g, to: 'text-cream' },
  { from: /\bbg-white\b/g, to: 'bg-cream' },
  { from: /\bborder-white\b/g, to: 'border-cream' },
  { from: /\btext-black\b/g, to: 'text-espresso' },
  { from: /\bbg-black\b/g, to: 'bg-espresso' },
  { from: /\bborder-black\b/g, to: 'border-espresso' },

  // Orange (VIP/Badges) mapped to Ochre for uniformity
  { from: /\bbg-orange-400\b/g, to: 'bg-ochre-200' },
  { from: /\bbg-orange-500\b/g, to: 'bg-ochre-200' },
  { from: /\btext-orange-400\b/g, to: 'text-ochre-200' },
  { from: /\btext-orange-500\b/g, to: 'text-ochre-200' },
  { from: /\btext-yellow-400\b/g, to: 'text-ochre-200' },
  
  // Hex color codes
  { from: /#f8f9fa/ig, to: '#FFFDF6' },
  { from: /#f5f5f5/ig, to: '#FAF6E9' },
  { from: /#f3f4f6/ig, to: '#F5EFDB' },
  { from: /#e5e7eb/ig, to: '#DFCDA2' },
  { from: /#9ca3af/ig, to: '#D4BE8B' },
  { from: /#999999/ig, to: '#D4BE8B' },
  { from: /#999/ig, to: '#D4BE8B' },
  { from: /#666666/ig, to: '#4E342E' },
  { from: /#666/ig, to: '#4E342E' },
  { from: /#333333/ig, to: '#3E2723' },
  { from: /#333/ig, to: '#3E2723' },
  { from: /#000000/ig, to: '#3E2723' },
  { from: /#000/ig, to: '#3E2723' },
  { from: /#ffffff/ig, to: '#FFFDF6' },
  { from: /#fff/ig, to: '#FFFDF6' }
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
        
        classReplacements.forEach(r => {
          newContent = newContent.replace(r.from, r.to);
        });
        
        if (content !== newContent) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Deep cleaned colors in ${filePath}`);
        }
      }
    });
  }
});
