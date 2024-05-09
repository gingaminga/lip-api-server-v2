import User from "@my-rdb/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class ToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "완료 유무",
    default: "N",
    length: 1,
    type: "char",
  })
  checked!: string;

  @Column({
    comment: "할 일 내용",
    length: 100,
    type: "varchar",
  })
  content!: string;

  @Column({
    comment: "할 일의 추가 설명(메모)",
    default: null,
    length: 500,
    type: "varchar",
  })
  memo!: string;

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

  @ManyToOne(() => User, (user) => user.toDos, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: User;
}

export default ToDo;
