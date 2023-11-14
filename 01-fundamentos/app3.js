const fs = require('node:fs');

const content = fs.readFileSync('README.md', 'utf-8');

console.log({wordCount: content.split(' ').length});

// const reactWordCount = content.split(' ').filter(
//   word => word.toLocaleLowerCase().includes('react')
// ).length;

const reactWordCount = content.match(/react/ig).length;

console.log({reactWordCount: reactWordCount ?? []});

