#!/bin/bash

# To use, update paths and add to user's local crontab:
# */5 * * * *   /var/www/git_repos/illinoiscovid_sync.sh

cd /var/www/git_repos/rohandandavati.github.io

if [[ $(git pull origin deploy 2>/dev/null) != *"Already up-to-date"* ]]; then
	echo "Synchronizing with remote deploy branch..."
	rsync -rv _site/* /var/www/html/illinoiscovid.org/
fi

