import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class ToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "할 일 내용",
    length: 100,
    type: "varchar",
  })
  content!: string;

  @Column({
    comment: "날짜",
    length: 10,
    type: "char",
  })
  date!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    default: null,
    type: "timestamp",
  })
  deletedAt!: Date;
}

export default ToDo;
