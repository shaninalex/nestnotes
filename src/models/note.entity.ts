import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'


@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;


    // Foreign key for user
}
