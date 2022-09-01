import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Comment } from "./comment";
  import { User } from "./user";
  import * as Validator from 'class-validator';
  
  @Index("fk_post_user_id_idx", ["userId"], {})
  @Entity("post", { schema: "forum" })
  export class Post {
    @PrimaryGeneratedColumn({ type: "int", name: "post_id", unsigned: true })
    postId: number;
  
    @Column("int", { name: "user_id", unsigned: true })
    userId: number;
  
    @Column("text", { name: "body" })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6, 150)
    body: string;

    @Column("varchar", {
      name: "author",
      length: "128"
    })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 64)
    author: string;
  
    @Column("timestamp", {
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
  
    @ManyToOne(() => User, (user) => user.posts, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
    user: User;
  }
  