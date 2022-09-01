import * as Validator from 'class-validator';

export class UpdateUserDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 64)
    password: string;
}