import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { UserPaginateDTO } from './DTO/user-paginate.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Retrieved Users' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the User Array in the response',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  getAllUser(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
    @Body() filter: UserPaginateDTO,
  ): Promise<Pagination<User>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.userService.paginateWithFilterAndSorting(
        {
          page,
          limit,
        },
        filter,
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  // @Post('file-upload')
  // userFileUpload(file: string): Promise<User> {}
}
