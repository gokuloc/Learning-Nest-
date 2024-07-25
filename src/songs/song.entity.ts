import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artists/artirt.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Animal',
    description: 'Provide a song title',
  })
  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @ApiProperty({
    example: '01/01/2024',
    description: 'Provide a date ',
  })
  @Column({ type: 'date' })
  releasedDate: Date;

  @ApiProperty({
    example: '05:00',
    description: 'Provide a time duration',
  })
  @Column({ type: 'time' })
  duration: Date;

  @ApiProperty({
    example: 'Lyrics',
    description: 'Provide song lyrics',
  })
  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @ManyToOne(() => Playlist, (playlist) => playlist.song)
  playList: Playlist;
  song: Artist;
}
