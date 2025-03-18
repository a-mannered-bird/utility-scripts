import * as fs from 'fs'
import trackers from '../input/trackers.mjs'

trackers.forEach(tracker => {
  const fileName = `output/${tracker.Date}.md`;
  const frontmatter = Object.entries(tracker)
    .filter(([key, value]) => {
      const isEmpty = value === -1 || value === ''
      return key && key !== 'Date' && !isEmpty
    })
    .map(([key, value]) => {
      const newKey = key
        .toLowerCase()
        .replace(/:/g, '')
        .replace(/[ ']/g, '_',)
      return `${newKey}: ${value}`
    })
    .join('\n');
  const content = `---\n${frontmatter}\n---\n`;

  fs.writeFileSync(fileName, content, 'utf8');
});