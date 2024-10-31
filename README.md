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

## Move Markdown files by tag

Move markdown files from a folder A to a folder B, only if they have the tag TAG_TARGET that you defined in the environmental variables.
Set the env variables in a `.env` file:

```
FOLDER_A=foo/inbox
FOLDER_B=bar/dev-articles
TAG_TARGET=dev-article
```

Run the script in the terminal with the `npm run move-md-files` command. You will be prompted for confirmation before the script moves anything.