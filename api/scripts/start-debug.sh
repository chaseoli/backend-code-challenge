# used to attach to running process using WSL see attach ./api
# Step 1: $ npm run start-debug
# Step 2: attach to process using vscode debugger "attach ./api"

# start in debug mode
build=dev node --nolazy --inspect-brk=5858 lib/app.js