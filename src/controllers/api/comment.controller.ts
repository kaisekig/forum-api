import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Comment } from "src/entities/comment";
import { AllowToRoles } from "src/misc/allow.to.roles";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { CommentService } from "src/services/comment.service";

@Controller("api/comment")
export class CommentController {
    constructor(
        public readonly commentService: CommentService
    ) {}

    @Get()
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async getAllComments(): Promise<Comment[]> {
        return await this.commentService.showAllComments();
    }

    @Get(":id")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    async getCommentsByPostId(@Param("id") postId: number): Promise<Comment[] | null> {
        return await this.commentService.showCommentsByPostId(postId);
    }
}