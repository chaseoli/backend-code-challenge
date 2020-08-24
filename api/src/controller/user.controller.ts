import {
  Route,
  Controller,
  OperationId,
  Post,
  Body,
  Get,
  Request,
  Security,
} from 'tsoa'
import { UserError } from '../err'
import {
  IGenericHttpResponse,
  IGenericErrorResponse,
} from '../models/generic.type'
import { UserContext } from '../context/user.context'
import { IPerson, IRequestUser } from '../models/user.type'

@Route('user')
export class UserController extends Controller {
  private userDb = new UserContext()
  /**
   * Adds the user to the database (used during registration process)
   *
   * @param {IPerson} person
   * @param {IRequestUser} request
   * @return {*}  {(Promise<IGenericHttpResponse | IGenericErrorResponse>)}
   * @memberof UserController
   */
  @Post()
  @OperationId('personAdd')
  @Security({
    user: [],
  })
  public async add(
    @Body() person: IPerson,
    @Request() request: IRequestUser
  ): Promise<IGenericHttpResponse | IGenericErrorResponse> {
    // check if the requesting uid matches the profile uid
    // ie: user should only be able to edit their own profile
    if (request.user.uid === person.uid) {
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
    } else {
      const e = new UserError(
        `${person.email} is not allowed to write to this profile`
      )
      this.setStatus(401)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Get user detail/profile by user id (aka: uid)
   *
   * @param {string} id
   * @return {*}  {(Promise<IPerson | IGenericErrorResponse>)}
   * @memberof UserController
   */
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
