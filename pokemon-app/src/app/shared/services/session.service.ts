import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { AuthService } from '../../shared/services/auth.service'
import { IPerson } from '../../../../../apis/client/src/models/core/core'

import * as firebase from 'firebase/app';
import 'firebase/database';

import { ServerApi } from 'stellar-sdk/lib/server_api.d'
import { LodashService } from 'src/app/shared/services/lodash.service';
import { Horizon } from 'stellar-sdk/lib/horizon_api.d'
import { StellarSdkService } from './stellar.service';

interface IWebBalances {
    code: string, // stellar blockchain string 
    human: string,  // human readable string (ie: last 3 digits of stellar blockchain code)
    balance: number
}

@Injectable()
export class SessionService {

    user: IPerson
    stellarAddress: string
    ethereumAddress: string
    init: boolean
    balances: IWebBalances[]
    private _initBalances: boolean

    constructor(
        private db: AngularFireDatabase,
        public authService: AuthService,
        private stellarService: StellarSdkService,
        private _: LodashService
    ) {
        this.user = null
        this.stellarAddress = ''
        this.init = false
        this.watchProfile()
        this._initBalances = false
        this.balances = []
    }

    async getStellarBalances() {

        // check if the user accounts exist
        if (
            !this._._.isEmpty(
                this._._.get(this.user, 'accounts.stellar.primary.address')
            )
        ) {

            if (!this._initBalances) {

                await this.stellarService.server.accounts()
                    .accountId(this.stellarAddress)
                    .call()
                    .then(async (accountResult: ServerApi.AccountRecord) => {

                        this._initBalances = true

                        this._._.forEach(accountResult.balances, (val: Horizon.BalanceLineAsset<"credit_alphanum12">) => {
                            // console.log(`${val['asset_code'] || val.asset_type}: ${val.balance}`)
                            const stellarCode = (val.asset_code || 'xlm')
                            const human = (stellarCode === 'xlm' ? 'xlm' : stellarCode.substr(9, 3)).toUpperCase()
                            const balance: IWebBalances = { code: (val.asset_code || 'xlm'), balance: Number(val.balance), human: human }

                            this.balances.push(balance)
                        })

                        return void 0

                    })
                    .catch((error) => {
                        console.error(`failed to get account balances for ${this.stellarAddress} ${error}`)
                    })

            }

        }

    }

    async refreshBalances() {
        this._initBalances = false
        this.getStellarBalances()
    }

    async getProfile() {
        return await this.db.database.ref(`users/${this.authService.auth.auth.currentUser.uid}`)
            .once('value', (dataSnapshot: firebase.database.DataSnapshot) => {
                this.setVals(dataSnapshot)
            })
    }

    private async watchProfile() {
        return this.db.database.ref(`users/${this.authService.auth.auth.currentUser.uid}`)
            .on('value', (dataSnapshot: firebase.database.DataSnapshot) => {
                this.setVals(dataSnapshot)
            })
    }

    private setVals(dataSnapshot: firebase.database.DataSnapshot) {
        const user: IPerson = dataSnapshot.val()
        // IMPORTANT: when user registers for the first time 
        // the account and profile might not be created yet. 
        // The firebase trigger must fire to create the profile
        // and account + keys 
        if (user) {
            this.user = user
            this.stellarAddress = this._._.get(this.user, 'accounts.stellar.primary.address','')
            this.ethereumAddress = this._._.get(this.user, 'accounts.eth.primary','')
        }
    }

}