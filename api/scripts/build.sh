# convert tsoa def yaml to json (ie: yaml allows for comments)
js-yaml tsoa.yml > tsoa.json

# generate openAPI spec and routes from controllers
tsoa spec  
tsoa routes 

# transpile ts 
tsc --p tsconfig.dev.json