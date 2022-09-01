import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Post } from "./post";
  import { User } from "./user";
  import * as Validator from 'class-validator';
  
  @Index("fk_comment_post_id_idx", ["postId"], {})
  @Index("fk_comment_user_id_idx", ["userId"], {})
  @Entity("comment", { schema: "forum" })
  export class Comment {
    @PrimaryGeneratedColumn({ type: "int", name: "comment_id", unsigned: true })
    commentId: number;
  
    @Column("int", { name: "post_id", unsigned: true })
    postId: number;
  
    @Column("int", { name: "user_id", unsigned: true })
    userId: number;
  
    @Column("varchar", { 
      name: "text", 
      length: 255 
    })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 150)
    text: string;
  
    @Column("timestamp", {
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @ManyToOne(() => Post, (post) => post.comments, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "post_id", referencedColumnName: "postId" }])
    post: Post;
  
    @ManyToOne(() => User, (user) => user.comments, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
    user: User;
  }
  