import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Superhero } from '../../superheroes/entities/superhero.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => Superhero, (superhero) => superhero.pictures, {
    onDelete: 'CASCADE',
  })
  superhero: Superhero;
}
