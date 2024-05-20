import RoutineCycleDays from "@my-rdb/entities/routine-cycle-days.entity";
import RoutineCycleEvery from "@my-rdb/entities/routine-cycle-every.entity";
import User from "@my-rdb/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Routine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "제목",
    length: 30,
    type: "varchar",
  })
  title!: string;

  @Column({
    comment: "설명",
    default: null,
    length: 100,
    type: "varchar",
  })
  description!: string | null;

  @Column({
    comment: "테마 색상",
    length: 6,
    type: "char",
  })
  color!: string;

  @Column({
    comment: "루틴 시작 날짜",
    length: 10,
    type: "char",
  })
  startDate!: string;

  @Column({
    comment: "루틴을 끝내는 날짜",
    default: null,
    length: 10,
    type: "char",
  })
  endDate!: string | null;

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

  @ManyToOne(() => User, (user) => user.routines, {
    onDelete: "CASCADE",
    nullable: false,
  })
  user!: User;

  @OneToOne(() => RoutineCycleDays, (routineCycleDays) => routineCycleDays.routine, {
    cascade: true,
  })
  @JoinColumn()
  routineCycleDays!: RoutineCycleDays | null;

  @OneToOne(() => RoutineCycleEvery, (routineCycleEvery) => routineCycleEvery.routine, {
    cascade: true,
  })
  @JoinColumn()
  routineCycleEvery!: RoutineCycleEvery | null;
}
