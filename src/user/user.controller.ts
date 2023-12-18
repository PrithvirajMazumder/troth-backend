import { UserService } from "@/user/user.service";
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { User } from "@/user/schemas/user.schema";
import { Response } from "express";

@Controller("user")
export class UserController {
  public constructor(private readonly userService: UserService) {
  }

  @Get("/")
  public async getAll(@Res() response: Response) {
    const users: Array<User> = await this.userService.getAll();
    return response.status(HttpStatus.CREATED).json({ data: users });
  }
}
