import { Interface } from 'readline'

export interface IGenericHttpResponse {
  message?: string
}

export interface IGenericSuccessResponse extends IGenericHttpResponse {
  data: any
}

export interface IGenericErrorResponse extends IGenericHttpResponse {
  errorMessage: string // 
  errorId?: string // used to look up confidential error details in logs
  errorDetails?: any
}
