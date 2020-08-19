import { Route, Controller, Get, OperationId, Security, Request, Post } from 'tsoa';
import { IRequestUser } from '../models/core/core';

@Route('test')
export class TestController extends Controller {

    /**
     * Basic test endpoint to try things out with API
     *
     * @param {*} request
     * @returns
     * @memberof TestController
     */
    @Get('msg')
    @OperationId('testMsg')
    @Security({
        'api_key': [],
        'some_test': ['write:testData']
    })
    public async test(
        @Request() request: any
    ) {
        if (request.user) {
            console.log('auth data set from authentication.ts: ', request.user);
        }
        return 'some test message';
    }

    /**
     * Basic test endpoint to try authentication mechanisms out with the API
     *
     * @param {IRequestUser} request
     * @returns
     * @memberof TestController
     */
    @Post('auth')
    @OperationId('testAuth')
    @Security({
        'api_key': [],
        'owns_stellar_account': ['read:body.senderAddress'],
    })
    public async auth(
        @Request() request: IRequestUser
    ) {
        if (request.user) {
            console.log('auth data set from authentication.ts: ', request.user);
        }
        return 'some test auth message';
    }

}