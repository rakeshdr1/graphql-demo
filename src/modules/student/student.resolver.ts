import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { CreateStudentInput } from './create-student.input';
import { StudentType } from './student.type';

@Resolver()
export class StudentResolver {
  studentsData = [];

  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    const data = this.studentsData.find((data) => data.id == id);
    if (!data) {
      throw new NotFoundException(id);
    }
    return data;
  }

  @Query((returns) => [StudentType])
  students() {
    return this.studentsData;
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    const newData = {
      id: uuid(),
      ...createStudentInput,
    };

    this.studentsData.push(newData);
    return newData;
  }
}
