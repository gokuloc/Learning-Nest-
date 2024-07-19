import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './DTO/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsServive: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsServive.create(createSongDto);
  }
  @Get()
  findAll() {
    return this.songsServive.findAll();
  }
  @Get(':id')
  findOne() {
    return 'fetching one song';
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
