import * as Validator from 'class-validator';
export class CreateCommentDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 150)
    text: string;
}