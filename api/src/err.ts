// good explanation of error handling - see https://stackify.com/node-js-error-handling/
// nodejs - see https://www.joyent.com/node-js/production/design/errors
// best practices with typescript - see https://joefallon.net/2018/09/typescript-try-catch-finally-and-custom-errors/

// When should I restart by throwing and unhandled exception? 
// When an handling and recovering from and error is not possible. 

// When should I use "throw"?
// Use throw when you want to stop the program/application.
// The nearest catch that JavaScript finds is where the 
// thrown exception will emerge. If no try/catch is found, 
// the exception throws, and the Node.js process will exit, 
// causing the server to restart.

// When should I use new Error()?
// Use Error objects (or subclasses) for ALL errors. 
// You should provide name and message properties, and 
// stack should work too (and be accurate).

class BaseError extends Error {
    // random identifier is used for when someone wants to call in with a specific 
    // unique error code we can search the logs to pin-point the problem in log output
    id?: string

    // extra are details that only are recorded to system logs but not in the rejection response message
    // ie: this is helpful when we don't want the user receiving the error to see the details 
    extra_msg: any
    extra_stack: any

    constructor(message?: string, unexpectedError?: any) {

        let _message = message
        if (!_message) {
            _message = ''
        }

        // generate a random id that can be used to lookup the specific error details from log
        function randString(length: number) {

            let result: string = ''

            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'

            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const id = 'error-' + randString(8)
        _message = `${_message} :: ${id} `

        let extra: any
        let extraStack: any
        if (unexpectedError) {

            // check if the error has a message
            if (unexpectedError.message) {
                extra = unexpectedError.message
            }

            // check if the error has a stack
            if (unexpectedError.stack) {
                extraStack = unexpectedError.stack
            }

            if ((typeof unexpectedError === 'string' || unexpectedError instanceof String)) {
                extra = unexpectedError
            }

            // otherwise, hail mary and hopefully this prints well...
            if (!extra) {
                extra = unexpectedError
                // try {
                //     // try to make it a string that is readable
                //     extra = JSON.stringify(normalizeObject(unexpectedError))
                // } catch (err) {
                //     // hail mary, hopefully this prints something useful
                //     extra = unexpectedError
                // }
            }

        }

        super(_message);

        // set class properties
        this.extra_msg = extra
        this.extra_stack = extraStack
        this.id = id

        // log the error in the system 
        err(this)

        // can be used to pass unique id back to client, 
        // this allows user to call in and provide the error code 
        // so that we can look-up in the logs what they are specifically
        // referring to
        return this

    }
}

export class AuthenticationError extends BaseError {
    constructor(message?: string, unexpectedError?: any) {
        super(message, unexpectedError);
        this.name = 'AuthenticationError'
    }
}

class GenericDatabaseError extends BaseError {
    constructor(message?: string, dbError?: any) {
        super(message, dbError)
        // this.name ='DO NOT SET, set at the child level via polymorph'
    }
}

export class DatabaseError extends BaseError {
    constructor(message?: string, dbError?: any, uid?: string) {
        let _message = message
        if (uid) {
            _message = _message + `uid: ${uid}`
        }
        super(_message, dbError)
        this.name = 'DatabaseError'
    }
}


// Why use custom error handling? See function err() below:  
// 1. ensures consistency in logging errors (eg: stackdriver captures console.log())
// 2. if the error type is unknown throw an unhandled exception (forcing a restart if not caught by try/catch)
// 3. allows for custom handling of errors based on type and logic

const err = (e: any) => {

    // error objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    if (
        e instanceof BaseError ||
        e instanceof DatabaseError 
        ) {
        // IDE type hinting now available
        // properly handle Error e
        console.error(e)
    }
    else if (typeof e === 'string' || e instanceof String) {
        // IDE type hinting now available
        // properly handle e or...stop using libraries that throw naked strings
        console.error(e)
    }
    else if (typeof e === 'number' || e instanceof Number) {
        // IDE type hinting now available
        // properly handle e or...stop using libraries that throw naked numbers
        console.error(e)
    }
    else if (typeof e === 'boolean' || e instanceof Boolean) {
        // IDE type hinting now available
        // properly handle e or...stop using libraries that throw naked booleans
        console.error(e)
    }
    else {
        // if we can't figure out what what we are dealing with then
        // probably cannot recover...therefore, rethrow and possibly exit()
        // if uncaught
        throw new Error(e);
    }
}
