#!/bin/sh

# pwd ; ls

# delete secrets if it exists
rm -rf $HOME/secrets

# Decrypt the file
mkdir $HOME/secrets

echo "trying to run with $POKEMON_PASSPHRASE"

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$POKEMON_PASSPHRASE" \
--output $HOME/secrets/service-account.json src/.enc/service-account.json.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$POKEMON_PASSPHRASE" \
--output $HOME/secrets/dev.env src/.enc/dev.env.gpg