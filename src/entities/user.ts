import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Comment } from "./comment";
  import { Post } from "./post";
  import * as Validator from 'class-validator';
  
  @Index("uq_user_username", ["username"], { unique: true })
  @Index("uq_user_email", ["email"], { unique: true })
  @Entity("user", { schema: "forum" })
  export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
    userId: number;
  
    @Column("varchar", { 
      name: "username", 
      unique: true, 
      length: 32 
    })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9]{1,30}$/)
    username: string;
  
    @Column("varchar", { 
      name: "email", 
      unique: true, 
      length: 255 
    })
    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      require_tld: true
    })
    email: string;
  
    @Column("varchar", { 
      name: "password_hash", 
      length: 128 
    })
    @Validator.IsNotEmpty()
    @Validator.IsHash('sha512')
    passwordHash: string;
  
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
  
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
  }
  