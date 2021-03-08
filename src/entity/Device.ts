import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Device {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

}
