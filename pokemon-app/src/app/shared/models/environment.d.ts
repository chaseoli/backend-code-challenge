export interface IWebEnvironment {
    production: boolean;
    firebase: {
        apiKey: string
        authDomain: string
        databaseURL: string
        projectId: string
        storageBucket: string
        messagingSenderId: string
        appId: string
        measurementId: string
    }
    apiUrl: string
    stellar_net: string
    stellar_base: string
    timeout: number // minutes
}