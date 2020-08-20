import { Route, Controller, Get, OperationId, Security, Request, Post } from 'tsoa';

@Route('live')
export class TestController extends Controller {

    /**
     * Basic test endpoint to try things out with API
     *
     * @param {*} request
     * @returns
     * @memberof TestController
     */
    @Get('test')
    @OperationId('test')
    public async test(
        @Request() request: any
    ) {
        return 'some test message';
    }

    /**
     * Basic test endpoint to try authentication mechanisms out with the API
     *
     * @param {*} request
     * @return {*} 
     * @memberof TestController
     */
    @Post('auth')
    @OperationId('testAuth')
    @Security({
        'api_key': [],
        'live_auth': ['read:body.senderAddress'],
    })
    public async auth(
        @Request() request: any
    ) {
        if (request.user) {
            console.log('auth data set from authentication.ts: ', request.user);
        }
        return 'some test auth message';
    }

}