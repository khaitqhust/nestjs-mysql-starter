import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDTO } from "./users.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: "Users fetched successfully",
      users,
    };
  }

  @Post()
  async createUsers(@Body() data: UsersDTO) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: "User created successfully",
      user,
    };
  }

  @Get(":id")
  async readUser(@Param("id") id: number) {
    const user = await this.usersService.read(id);
    console.log(user);
    return {
      statusCode: HttpStatus.OK,
      message: "User fetched successfully",
      user,
    };
  }

  @Patch(":id")
  async updateUser(@Param("id") id: number, @Body() data: Partial<UsersDTO>) {
    // const data = await this.usersService.read(id);
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: "User updated successfully",
    };
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: "User deleted successfully",
    };
  }
}
