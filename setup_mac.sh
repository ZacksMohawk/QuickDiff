#!/bin/bash

touch ~/.zshrc

QUICKDIFFSET=false

while read -r line
do
	if [[ "$line" =~ ^"alias quickdiff="* ]]; then
		QUICKDIFFSET=true
	fi
done < ~/.zshrc

NEWLINESET=false

if [[ "$QUICKDIFFSET" != true ]]; then
	if [[ "$NEWLINESET" != true ]]; then
		echo '' >> ~/.zshrc
		NEWLINESET=true
	fi
	echo "Setting 'quickdiff' alias";
	echo "alias quickdiff='dt=\$(pwd); cd $(pwd); node --no-warnings QuickDiff.js -folderPath \$dt; cd \$dt;'" >> ~/.zshrc
fi

source ~/.zshrc

echo "Setup complete"