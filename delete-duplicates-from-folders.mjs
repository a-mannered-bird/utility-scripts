import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'
import * as dotenv from 'dotenv'

dotenv.config() 

// Get the folder paths from environment variables
const folderAPath = process.env.FOLDER_A;
const folderBPath = process.env.FOLDER_B;

const filesToIgnore = [
  '.DS_Store',
]

// Function to collect all files recursively in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to compare files between two directories
function findCommonFiles(filesA, filesB) {
  const filesASet = new Set(filesA.map((file) => path.basename(file)));
  return filesB.filter((file) => {
    const basename = path.basename(file)
    return filesASet.has(basename) && !filesToIgnore.includes(basename)
  })
}

// Main logic
async function main() {
  if (!folderAPath || !folderBPath) {
    console.error('Please set the FOLDER_A and FOLDER_B environment variables.');
    process.exit(1);
  }

  console.log('Collecting files from folder A...');
  const filesA = getAllFiles(folderAPath);
  console.log(`Found ${filesA.length} files in folder A.`);

  console.log('Collecting files from folder B...');
  const filesB = getAllFiles(folderBPath);
  console.log(`Found ${filesB.length} files in folder B.`);

  // Find common files by name and extension
  const commonFiles = findCommonFiles(filesA, filesB);

  if (commonFiles.length === 0) {
    console.log('No matching files found between folder A and folder B.');
    return;
  }

  console.log('Matching files found:');
  commonFiles.forEach((file) => console.log(file));

  // Ask the user if they want to delete the files
  const { confirmDelete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: 'Do you want to delete these files?',
      default: false,
    },
  ]);

  if (confirmDelete) {
    commonFiles.forEach((file) => {
      fs.unlinkSync(file);
      console.log(`Deleted: ${file}`);
    });
    console.log('Files deleted.');
  } else {
    console.log('No files were deleted.');
  }
}

main();
