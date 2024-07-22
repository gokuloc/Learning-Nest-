import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './DTO/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {
  constructor(
    private songsServive: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(`this is connection string`, this.connection);
  }
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsServive.create(createSongDto);
  }
  @Get()
  findAll() {
    try {
      return this.songsServive.findAll();
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
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetching one song by Id ${typeof id}`;
  }
  @Put(':id')
  updateOne() {
    return 'update song by id song';
  }
  @Delete(':id')
  deleteOne() {
    return 'delete song by id song';
  }
}
