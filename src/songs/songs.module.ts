import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

const mockSongService = {
  findAll() {
    return [
      {
        id: 1,
        title: 'Song 1',
        artist: 'Artist 1',
        genre: 'Genre 1',
      },
    ];
  },
};

@Module({
  controllers: [SongsController],
  providers: [
    //standard provider
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    //mock provider
    {
      provide: SongsService,
      useValue: mockSongService,
    },
  ],
})
export class SongsModule {}
