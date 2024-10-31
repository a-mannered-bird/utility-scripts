import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'
import * as dotenv from 'dotenv'
import yaml from 'js-yaml'

dotenv.config() 

const folderA = process.env.FOLDER_A;
const folderB = process.env.FOLDER_B;
const tagTarget = process.env.TAG_TARGET;

// Function to read files and parse YAML front matter
function getMarkdownFilesWithMatchingTag() {
  const files = fs.readdirSync(folderA);
  const matchingFiles = [];

  files.forEach((file) => {
    if (path.extname(file) !== ".md") return
    const filePath = path.join(folderA, file);
    const content = fs.readFileSync(filePath, "utf8");

    const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (!yamlMatch) return

    const yamlContent = yaml.load(yamlMatch[1]);
    const tags = yamlContent.tags || [];

    if (tags.includes(tagTarget)) {
      matchingFiles.push(file);
    }
  });

  return matchingFiles;
}

// Function to prompt user and move files
async function promptAndMoveFiles(files) {
  console.log(`📄 Found ${files.length} file(s) with the tag "${tagTarget}":`);
  files.forEach((file) => console.log(` - ${file}`));
  console.log(`\n📂 Target folder: ${folderB}`);

  const { shouldMove } = await inquirer.prompt([
    {
      type: "confirm",
      name: "shouldMove",
      message: "Do you want to move these files to the target folder?",
      default: false,
    },
  ]);

  if (shouldMove) {
    files.forEach((file) => {
      const sourcePath = path.join(folderA, file);
      const destinationPath = path.join(folderB, file);
      fs.renameSync(sourcePath, destinationPath);
      console.log(`✅ Moved ${file} to ${folderB}`);
    });
    console.log("🎉 All files have been moved successfully!");
  } else {
    console.log("🚫 No files were moved.");
  }
}

// Main script execution
(async function main() {
  if (!folderA || !folderB || !tagTarget) {
    console.error("🙈  Please set FOLDER_A, FOLDER_B, and TAG_TARGET environment variables.");
    process.exit(1);
  }

  const matchingFiles = getMarkdownFilesWithMatchingTag();

  if (matchingFiles.length > 0) {
    await promptAndMoveFiles(matchingFiles);
  } else {
    console.log(`🔍 No markdown files with the tag "${tagTarget}" were found in ${folderA}.`);
  }
})();
