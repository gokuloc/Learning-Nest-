import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    return 'fetching all songs';
  }
  @Get(':id')
  findOne() {
    return 'fetching one song';
  }
  @Post(':id')
  create() {
    return 'creating a song enpoint';
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
