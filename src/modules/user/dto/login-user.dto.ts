import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    
        @IsEmail({},{message : "Invalid email"})
        @IsNotEmpty({message : "email is required"})
        email : string;

        
        @IsString()
        @IsNotEmpty({message : "password is required"})
        @MinLength(4,{message : "Password should have 4 characters"})
        password :string


}