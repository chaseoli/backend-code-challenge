#!/bin/sh

# pwd ; ls

# delete secrets if it exists
rm -rf $HOME/secrets

# Decrypt the file
mkdir $HOME/secrets

# try to set from input - important for github actions
passphrase="$1"

# set default to locally defined env var
if [ -z "$passphrase" ] && [ "${passphrase+xxx}" = "xxx" ]; then passphrase="$POKEMON_PASSPHRASE"; fi

# echo "trying to run with $passphrase"
# echo "and your mongo connection string $db_uri"

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$passphrase" \
--output $HOME/secrets/service-account.json src/.enc/service-account.json.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$passphrase" \
--output $HOME/secrets/dev.env src/.enc/dev.env.gpg