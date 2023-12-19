import { UserService } from '@/user/user.service'
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { User } from '@/user/schemas/user.schema'
import { Response } from 'express'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { CreateUserDto } from '@/user/dtos/createUser.dto'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getAll(@Res() response: Response) {
    try {
      const users: Array<User> = await this.userService.getAll()
      return response.status(HttpStatus.OK).json({ data: users, error: null })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        data: null,
        error
      })
    }
  }

  @Get(':userId')
  public async getById(@Param('userId') userId: string, @Res() response: Response) {
    try {
      const user: User = await this.userService.getById(userId)
      return response.status(HttpStatus.OK).json({ data: user, error: null })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({ data: null, error })
    }
  }

  @Post('/')
  public async create(@Body() requestBody: CreateUserDto, @Res() response: Response) {
    try {
      const newUser = await this.userService.create(requestBody)
      const newUserResp = instanceToPlain(new CreateUserDto(newUser))

      return response.status(HttpStatus.CREATED).json({
        data: newUserResp,
        error: null
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error
      })
    }
  }
}
