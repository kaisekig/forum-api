import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/entities/post";
import { CreatePostDto } from "src/dtos/post/create.post.dto";
import { ApiResponse } from "src/misc/api.response";
import { Repository } from "typeorm";
import { UserService } from "./user.service";

@Injectable()
export class PostService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Post)
        private readonly post: Repository<Post>,
    ) {}

    getPostById(postId: number): Promise<Post> {
        return this.post.findOne(postId, {
            relations: [
                "comments",
                "user",
                "user.comments"
                
            ]
        });
    }

    async createPost(data: CreatePostDto, userId: number): Promise<Post | ApiResponse> {
        let newPost: Post = new Post();
        const user = await this.userService.getById(userId);

        newPost.author    = data.author;
        newPost.body      = data.body;
        newPost.user      = user;

        return await this.post.save(newPost);

    }

    async getAll(): Promise<Post[]> {
        return await this.post.find({
            relations: [
                "user",
                "comments"
            ],
        })
    }
}