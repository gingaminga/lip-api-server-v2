import Routine from "@my-rdb/entities/routine.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class RoutineCycleEvery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "routine.startDate(시작 날짜)로부터 주기 일 수 ex) 15, 30",
    type: "int",
  })
  every!: number;

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

  @OneToOne(() => Routine, (routine) => routine.routineCycleEvery)
  routine!: Routine;
}
