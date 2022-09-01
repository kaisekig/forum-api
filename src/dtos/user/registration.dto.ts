import * as Validator from 'class-validator';

export class RegistrationDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9]{1,30}$/)
    username: string;
    
    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      require_tld: true
    })
    email: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 64)
    password: string;
}