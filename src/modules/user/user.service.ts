import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseUser } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {


  constructor(@InjectRepository(ExpenseUser) private readonly userRepository : Repository<ExpenseUser> ) {}

  async create(createUserDto: CreateUserDto) {
      try {
        console.log("enetered",createUserDto)
 
        const emailCheck = await this.userRepository.findOne({where :{email:createUserDto.email}})
    
        if(emailCheck){
           return {success : false , message :"email already exist"}
        }
    
        const hashedPassword = await bcrypt.hash(createUserDto.password,10)
    
    
        const newUser = this.userRepository.create({
          ...createUserDto,
          password : hashedPassword,
          created_at: new Date().toISOString(), 
        })
    
      const result =  await this.userRepository.save(newUser);
    
      return {success : true , message : 'Successfully signed In'}
      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: "An error occurred while logging in. Please try again later."
        };
      }

  }

  async login(loginUserDto : LoginUserDto) {
    try {
      console.log("enetered",loginUserDto)
 
       const User = await this.userRepository.findOne({where : {email : loginUserDto.email}}) 
       console.log(User) 
        if(User){
          const passCheck = await bcrypt.compare(loginUserDto.password, User.password)

          console.log(passCheck)

            if(passCheck){
              return {success : true, message : "LOgged in successfully"}
            }else{
              return {success : false , message: "Incorrect password"}
            }

        }else{
        return {success : false , message: "Incorrect Email"}
        } 
  
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: "An error occurred while logging in. Please try again later."
      };
    }
  }

  findOne(id: number) {

    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
