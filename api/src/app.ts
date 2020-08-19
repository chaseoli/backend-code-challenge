import { RegisterRoutes } from './routes'
import { Config } from './config'

import './controller/test.controller'

import { customResponseHandler } from './middleware/response'

class Main {

    public config: Config

    constructor() {

        this.config = new Config()
        RegisterRoutes(this.config.app as any)
        customResponseHandler(this.config.app)

    }

}

new Main().config.start()
