import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ExpenseUser {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column({unique : true})
    email : string;

    @Column()
    phone : string;

    @Column()
    password : string;

    @Column()
    created_at : Date;

}