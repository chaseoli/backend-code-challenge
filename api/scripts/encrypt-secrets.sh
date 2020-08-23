# see https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets

#  get {PROJECT_ROOT}/api/.secrets/service-account.json from a team member
#  gpg  --symmetric --cipher-algo AES256 -o src/.enc/service-account.json.gpg ./.secrets/service-account.json

# delete secrets if it exists
rm -rf ./src/.enc

# Decrypt the file
mkdir ./src/.enc
 
gpg \
    --passphrase "$POKEMON_PASSPHRASE" \
    --batch \
    --output src/.enc/service-account.json.gpg \
    --symmetric \
    --cipher-algo AES256 \
    ./.secrets/service-account.json


gpg \
    --passphrase "$POKEMON_PASSPHRASE" \
    --batch \
    --output src/.enc/dev.env.gpg \
    --symmetric \
    --cipher-algo AES256 \
    ./.secrets/dev.env
