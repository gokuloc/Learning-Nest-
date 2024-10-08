import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDto } from './DTO/create-playlist-dto';
import { Playlist } from './playlist.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('Playlist Routes')
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}

  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
