#!/bin/bash

touch ~/.bashrc

QUICKDIFFSET=false

while read -r line
do
	if [[ "$line" =~ ^"alias quickdiff="* ]]; then
		QUICKDIFFSET=true
	fi
done < ~/.bashrc

NEWLINESET=false

if [[ "$QUICKDIFFSET" != true ]]; then
	if [[ "$NEWLINESET" != true ]]; then
		echo '' >> ~/.bashrc
		NEWLINESET=true
	fi
	echo "Setting 'quickdiff' alias";
	echo "alias quickdiff='dt=\$(pwd); cd $(pwd); node --no-warnings QuickDiff.js -folderPath \$dt; cd \$dt;'" >> ~/.bashrc
fi

source ~/.bashrc

echo "Setup complete"