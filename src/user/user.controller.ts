import { UserService } from '@/user/user.service'
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { User } from '@/user/schemas/user.schema'
import { Response } from 'express'
import { instanceToPlain } from 'class-transformer'
import { ApiBody } from '@nestjs/swagger'
import { UserDto } from '@/user/dtos/user.dto'

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
      return response
        .status(HttpStatus.OK)
        .json({ data: instanceToPlain(new UserDto(user)), error: null })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({ data: null, error })
    }
  }

  @Post('/')
  @ApiBody({
    type: UserDto,
    examples: {
      example_1: {
        value: {
          name: 'escon engineering co',
          phone: 1234567890,
          email: 'p@p.com'
        }
      }
    }
  })
  public async create(@Body() requestBody: UserDto, @Res() response: Response) {
    try {
      const newUser = await this.userService.create(requestBody)
      const newUserResp = instanceToPlain(new UserDto(newUser), { excludeExtraneousValues: true })
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
