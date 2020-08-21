import { Route, Controller, OperationId, Post, Body, Get, Query } from 'tsoa'
import { UserError } from '../err'
import {
  IGenericHttpResponse,
  IGenericErrorResponse,
} from '../models/generic.type'
import { UserContext } from '../context/user.context'
import { IPerson } from '../models/profile.type'

@Route('user')
export class UserController extends Controller {
  private userDb = new UserContext()
  @Post()
  @OperationId('personAdd')
  public async add(
    @Body() person: IPerson
  ): Promise<IGenericHttpResponse | IGenericErrorResponse> {
    try {
      await this.userDb.register(person)
      return {
        message: `registered new user ${person.email}`,
      }
    } catch (error) {
      const e = new UserError(`failed to register ${person.email}`, error)
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  @Get('{id}')
  @OperationId('personByUid')
  public async byId(id: string): Promise<IPerson | IGenericErrorResponse> {
    try {
      const p = await this.userDb.getByUid(id)
      return p
    } catch (error) {
      const e = new UserError(
        'failed to retrieve user details from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }
}
