import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment";
import { Repository } from "typeorm";
import { PostService } from "./post.service";
import { UserService } from "./user.service";

@Injectable()
export class CommentService {
    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService,

        @InjectRepository(Comment)
        private readonly comment: Repository<Comment>,
    ) {}

    async createComment(postId: number, text: string, userId: number): Promise<Comment> {
        const user = await this.userService.getById(userId);

        let newComment = new Comment();
        newComment.postId = postId;
        newComment.text   = text;
        newComment.user   = user;

        return await this.comment.save(newComment);
    }

    async showAllComments(): Promise<Comment[]> {
        return await this.comment.find({
            relations: [
                "user",
                "post"
            ],
        })
    }

    async showCommentsByPostId(postId: number): Promise<Comment[] | null> {
        let comments = await this.comment.find({
            where: {
                postId: postId
            }, 
            relations:[
                "user",
                "post"
            ],
            
        })

        if (!comments) {
            return null;
        }

        return comments;
    }












    

}