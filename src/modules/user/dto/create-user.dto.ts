import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({message : "username is required"})
    @MinLength(4,{message : "username should have 4 characters"})
    username : string;

    @IsEmail({},{message : "Invalid email"})
    @IsNotEmpty({message : "email is required"})
    email : string;

    @IsString()
    @IsNotEmpty({message : "phone is required"})
    @MinLength(10,{message : "Invalid phone number"})
    phone : string;

    @IsString()
    @IsNotEmpty({message : "password is required"})
    @MinLength(4,{message : "Password should have 4 characters"})
    password :string
}
