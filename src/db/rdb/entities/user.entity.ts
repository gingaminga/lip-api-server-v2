import { TSocialType } from "@my-types/social.type";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "닉네임",
    length: 16,
    type: "varchar",
    unique: true,
  })
  nickname!: string;

  @Column({
    comment: "이메일",
    default: null,
    length: 64,
    type: "varchar",
  })
  email!: string | null;

  @Column({
    comment: "소셜 종류",
    length: 16,
    type: "varchar",
  })
  socialType!: TSocialType;

  @Column({
    comment: "소셜 unique id",
    length: 64,
    type: "varchar",
  })
  socialKey!: string;

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
  deletedAt!: Date | null;
}

export default User;
