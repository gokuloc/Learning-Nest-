import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
// import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { SongsService } from './songs.service';

// const mockSongService = {
//   findAll() {
//     return [
//       {
//         id: 1,
//         title: 'Song 1',
//         artist: 'Artist 1',
//         genre: 'Genre 1',
//       },
//     ];
//   },
// };

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    //standard provider
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },

    //mock provider
    // {
    //   provide: SongsService,
    //   useValue: mockSongService,
    // },

    //non class based provider
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
