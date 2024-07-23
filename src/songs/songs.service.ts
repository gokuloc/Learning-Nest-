import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './DTO/create-song-dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './DTO/update-song-dto';
import {
  Pagination,
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artirt.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  private readonly songs = [];

  async createSong(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releaseDate;
    song.lyrics = songDTO.lyrics;
    song.duration = songDTO.duration;

    const artists = await this.artistRepository.findByIds(songDTO.artists);
    song.artists = artists;

    return await this.songRepository.save(song);
  }

  findAllSong(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOneSong(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  async deleteSong(id: number): Promise<DeleteResult> {
    return await this.songRepository.delete(id);
  }

  async updateSong(
    id: number,
    recordToUpdate: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);
  }

  async paginatewithSorting(
    options: IPaginationOptions,
  ): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate(queryBuilder, options);
  }
}
