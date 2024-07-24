import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './DTO/create-song-dto';
// import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { UpdateSongDTO } from './DTO/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistsGuard } from 'src/auth/jwt-artist-guard';

@Controller('songs')
export class SongsController {
  constructor(
    private songsServive: SongsService,
    // @Inject('CONNECTION') private connection: Connection,
  ) {
    // console.log(`this is connection string`, this.connection);
  }

  //create songs
  @Post()
  @UseGuards(JwtArtistsGuard)
  create(@Body() createSongDto: CreateSongDto, @Request() req): Promise<Song> {
    console.log('request from songs controleler : ', req.user);
    return this.songsServive.createSong(createSongDto);
  }

  //get all songs
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsServive.paginate({
        page,
        limit,
      });
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

  //get a song by id
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    try {
      const data = this.songsServive.findOneSong(id);
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: err },
      );
    }
  }

  //update a song by id
  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDtO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsServive.updateSong(id, updateSongDtO);
  }

  //delete a song by id
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsServive.deleteSong(id);
  }
}
