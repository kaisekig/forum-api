import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "src/dtos/post/create.post.dto";
import { PostService } from "src/services/post.service";
import { Request } from "express";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles";
import { CreateCommentDto } from "src/dtos/comment/create.comment.dto";
import { CommentService } from "src/services/comment.service";

@Controller("api/post")
export class PostController {
    constructor(
        public readonly postService: PostService,
        public readonly commentService: CommentService
    ) {}

    @Post("create")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async addPost(@Body() data: CreatePostDto, @Req() req: Request) {
        const userId = req.token.id;
        return await this.postService.createPost(data, userId);
    }

    @Get()
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async getAllPosts() { 
        return await this.postService.getAll();
    }

    @Get(":id")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async getById(@Param("id") id: number) {
        return await this.postService.getPostById(id);
    }

    @Post(":id/comment")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async addPostComment(@Param("id") id: number, @Body() data: CreateCommentDto, @Req() req: Request) {
        const userId = req.token.id;

        return await this.commentService.createComment(id, data.text, userId);
    }
    
}