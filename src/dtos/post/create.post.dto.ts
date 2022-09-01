import * as Validator from 'class-validator';

export class CreatePostDto {
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 64)
    author: string;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6, 150)
    body: string;
}