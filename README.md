# utility-scripts

A set of small utility scripts for my personal usage.

## Quick Start

Just clone it and run `npm i` to get started!

## Delete duplicates from folders

Delete recursively all files contained in folder B that have the same names as one of the files in folder A.
Set the path for the folders in a `.env` file:

```
FOLDER_A=foo/bar
FOLDER_B=bar/foo
```

Run the script in the terminal with the `npm run delete-duplicates` command. You will be prompted for confirmation before the script deletes anything. If you want to ignore some filenames, add them inside the variable `filesToIgnore` in `delete-duplicates-from-folders.mjs`.