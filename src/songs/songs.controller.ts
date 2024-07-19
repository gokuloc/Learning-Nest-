import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsServive: SongsService) {}
  @Post()
  create() {
    return this.songsServive.create('new song 1');
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
