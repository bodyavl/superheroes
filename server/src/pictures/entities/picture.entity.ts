import { Superhero } from 'src/superheroes/entities/superhero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => Superhero, (superhero) => superhero.pictures)
  superhero: Superhero;
}
