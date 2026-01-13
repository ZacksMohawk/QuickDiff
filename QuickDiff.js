global.appType = "QuickDiff";
global.version = "0.0.1";

const fs = require('fs');
const prompt = require('prompt-sync')({});
const Logger = require('./includes/Logger');
require('colors');
const {diffChars} = require('diff');

Logger.log();
Logger.log(fs.readFileSync('AppLogo.txt', 'utf8').replace('[version]', 'QuickDiff v' + version));
Logger.log();


let folderPath = "./";
if (process.argv.indexOf("-folderPath") != -1){
	folderPath = process.argv[process.argv.indexOf("-folderPath") + 1] + "/";
}


let allFilenames = fs.readdirSync(folderPath, { withFileTypes: true });
let filenames = allFilenames.filter(file => file.isFile()).map(file => file.name);
if (filenames.length == 0){
	Logger.log("No files present in current folder. Aborting");
	process.exit(0);
}

Logger.log("Files in current directory\n");
for (let index = 0; index < filenames.length; index++){
	Logger.log("\t" + (index + 1) + ". " + filenames[index]);
}

Logger.log('');
let fileChoiceAIndex = prompt(filenames.length > 1 ? 'Choose first file (1-' + filenames.length + '): ' : 'Choose: ');
if (fileChoiceAIndex == null || fileChoiceAIndex == ''){
	process.exit(0);
}
fileChoiceAIndex = parseInt(fileChoiceAIndex.trim());
if (Number.isNaN(fileChoiceAIndex) || fileChoiceAIndex < 1 || fileChoiceAIndex > filenames.length){
	Logger.log("Invalid choice.");
	process.exit(0);
}
let fileA = filenames[fileChoiceAIndex - 1];

let fileChoiceBIndex = prompt(filenames.length > 1 ? 'Choose second file (1-' + filenames.length + '): ' : 'Choose: ');
if (fileChoiceBIndex == null || fileChoiceBIndex == ''){
	process.exit(0);
}
fileChoiceBIndex = parseInt(fileChoiceBIndex.trim());
if (Number.isNaN(fileChoiceBIndex) || fileChoiceBIndex < 1 || fileChoiceBIndex > filenames.length){
	Logger.log("Invalid choice.");
	process.exit(0);
}
let fileB = filenames[fileChoiceBIndex - 1];


let fileAText = fs.readFileSync(folderPath + fileA, 'utf8');
let fileBText = fs.readFileSync(folderPath + fileB, 'utf8');

let diff = diffChars(fileAText, fileBText);

diff.forEach((part) => {
	let text = part.added ? part.value.bgGreen : part.removed ? part.value.bgRed : part.value;
	process.stderr.write("\n" + text);
});