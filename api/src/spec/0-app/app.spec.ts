import {
  describe,
  // it,
  after,
  // before
} from 'mocha'
// import { expect } from 'chai'
import { IEnv } from '../../models/env.model'
import * as _ from 'lodash'

declare var process: {
  env: IEnv
}

describe('shared', () => {

  after(async () => {
    // // force wait after all tests have been called
    // await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve()
    //     }, 10000)
    // })
  })
})
