import { Controller, Get, Post } from '@nestjs/common';

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
    return 'creating a song';
  }
}
