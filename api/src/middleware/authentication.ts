// see usage docs here https://github.com/lukeautry/tsoa#security
// See routes.ts for implementation of the expressAuthentication() function

import * as express from 'express'
import * as _ from 'lodash'
import { AuthenticationError } from '../err'

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {


    // // used to get uid and email for authenticated user via auth header
    // async function getAuthToken() {
    //     try {

    //         // check if header exists
    //         if (_.isEmpty(request.headers['x-auth'])) {

    //             // missing x-auth
    //             throw 'authentication required'

    //         } else {

    //             // verify the auth token
    //             //  TODO:

    //         }

    //     } catch (error) {
    //         // not able to verify
    //         return Promise.reject(
    //             new AuthenticationError(`auth error: ${error}`)
    //         )

    //     }
    // }

    // just a test see live.controller.ts
    if (securityName === 'live_auth') {

        console.log('scope is defined in controller and read at authentication.ts: ', scopes)

        // // success (via normal return)
        // return 

        // failed (return an custom error and handle via response response.ts )
        return Promise.reject(
            new AuthenticationError('you failed authentication', { hello: 'world error' })
        )
    }

    if (securityName === 'api_key') {

        // Google Endpoints uses ESP to check permissions of the API Key
        // Therefore, if the request reaches this point in the code the
        // default response is to allow the request to continue through
        // remaining middleware.
        return

    }

    // default response to reject if not previously resolved
    return Promise.reject(
        new AuthenticationError('failed to match security name')
    )

}