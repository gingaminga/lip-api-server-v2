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
export default class RoutineCycleDays {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "월요일",
    type: "boolean",
  })
  monday!: boolean;

  @Column({
    comment: "화요일",
    type: "boolean",
  })
  tuesday!: boolean;

  @Column({
    comment: "수요일",
    type: "boolean",
  })
  wednesday!: boolean;

  @Column({
    comment: "목요일",
    type: "boolean",
  })
  thursday!: boolean;

  @Column({
    comment: "금요일",
    type: "boolean",
  })
  friday!: boolean;

  @Column({
    comment: "토요일",
    type: "boolean",
  })
  saturday!: boolean;

  @Column({
    comment: "일요일",
    type: "boolean",
  })
  sunday!: boolean;

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

  @OneToOne(() => Routine, (routine) => routine.routineCycleDays)
  routine!: Routine;
}
