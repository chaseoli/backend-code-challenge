#!/bin/bash

# USAGE: $ bash deploy-api.bash -i -e prod

install=false # default not to install npm dependencies (unless specified)

show_help()
{ 
cat << EOF
Deploy API to specific Goolge App-Engine environment:
--env (alias: -e) <dev|staging|prod> REQUIRED
Install API dependencies (useful for CICD):
--install (alias: -i) OPTIONAL
EOF
}

# flags usage - https://archive.is/5jGpl#selection-709.0-715.1 or https://archive.is/TRzn4
while :; do
    case $1 in
        -h|-\?|--help)   # Call a "show_help" function to display a synopsis, then exit.
            show_help
            exit
            ;;
        -i|--install) 
            install=true
            ;;
        -e|--env) # Takes an option argument, ensuring it has been specified.
            if [ -n "$2" ]; then
                env=$2
            #   echo "env" $2
                shift
            else
                printf "$(tput setaf 1)ERROR: \"-e|--env\" requires a non-empty option argument.\n" >&2
                exit 1
            fi
            ;;
        -v|--verbose)
            verbose=$((verbose + 1)) # Each -v argument adds 1 to verbosity.
            ;;
        --)              # End of all options.
            shift
            break
            ;;
        -?*)
            printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
            ;;
        *)               # Default case: If no more options then break out of the loop.
            break
    esac

    shift
done


deployApi()
{ 
    copyDependentFilesToLib

    echo "starting $env deployment"
    # set deployment by service account
    # gcloud auth activate-service-account --key-file=$serviceAccount || exit 1

    # set the project to deploy to 
    gcloud config set project $gcloud_project || exit 1

    # deploy as defined in app.yaml
    cd lib ; gcloud app deploy --quiet ; cd ..

}

copyDependentFilesToLib()
{
    mkdir -p lib
    cp app-$env.yaml lib/app.yaml # copy over the specific app.yaml for the specified env  
    cp package.json lib    
    echo "copied app.yaml to ./apis/client/lib"
}

build()
{
    if [ $install == true ]
    then
        echo "installing all dependencies"
        npm i -g tslint@5.12.0 typescript@3.7.5 tsoa@3.0.5 ts-node@7.0.1 js-yaml
        npm i 
    fi

    echo "tanspiling tsoa.yml to tsoa.json"
    ~/.nvm/versions/node/v10.20.1/bin/js-yaml tsoa.yml > tsoa.json
    
    echo "generating tsoa routes"
    ~/.nvm/versions/node/v10.20.1/bin/tsoa routes 

    echo "transpile API from typescript to javascript"
    tsc --project tsconfig.prod.json

    copyDependentFilesToLib

}

if [ "$env" == "dev" ]
then
    # TODO: update dir and project names...
    serviceAccount="../../.secrets-test/dev-service-account.json"
    gcloud_project="quantum-pokemon-dev"
    build
    deployApi

elif [ "$env" == "prod" ]
then

    serviceAccount="../../.secrets/prod-service-account.json"
    gcloud_project="quantum-pokemon-prod"
    build
    deployApi

else
    echo ">>>>> INFO <<<<<: No API deployment conditions were matched $env"
    exit 0
fi
