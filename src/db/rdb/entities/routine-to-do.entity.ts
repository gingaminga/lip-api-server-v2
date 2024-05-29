import Routine from "@my-rdb/entities/routine.entity";
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
export default class RoutineToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "할 일 체크 여부",
    type: "boolean",
  })
  checked!: boolean;

  @Column({
    comment: "할 일 날짜",
    length: 8,
    type: "varchar",
  })
  date!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    default: null,
    type: "timestamp",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    default: null,
    type: "timestamp",
  })
  deletedAt!: Date;

  @ManyToOne(() => User, (user) => user.routineTodos, {
    onDelete: "CASCADE",
    nullable: false,
  })
  user!: User;

  @ManyToOne(() => Routine, (routine) => routine.routineToDos, {
    nullable: false,
  })
  routine!: Routine;
}
