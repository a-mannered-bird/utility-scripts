import * as fs from 'fs'
import trackers from '../input/trackers.mjs'

// -1 = undefined
// 0 = value entered
// 1 = Tick but not from today (weekly)
// 2 = Tick
// 3 = Skip

trackers.forEach(tracker => {
  const fileName = `output/${tracker.Date}.md`;
  const frontmatter = Object.entries(tracker)
    .filter(([key, value]) => {
      return key && key !== 'Date'
    })
    .map(([key, value]) => {
      const newKey = key
        .toLowerCase()
        .replace(/:/g, '')
        .replace(/[ ']/g, '_',)
      let newValue = value
      if (newValue > 3) newValue = newValue / 1000
      else if ([1,2].includes(newValue)) newValue = true
      else if ([-1,3].includes(newValue)) newValue = ''
      return `${newKey}: ${newValue}`
    })
    .join('\n');
  const content = `---\n${frontmatter}\n---\n`;

  fs.writeFileSync(fileName, content, 'utf8');
});