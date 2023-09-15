import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IsString } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id: number;

    @IsString()
    @Column({ nullable: false })
    public title: string;

    @IsString()
    @Column({ nullable: false })
    public content: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    public user: number;
}
