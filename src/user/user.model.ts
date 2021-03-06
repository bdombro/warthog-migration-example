import { hashSync } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel, EmailField, EnumField, Model, StringField } from 'warthog';

// Note: this must be exported and in the same file where it's attached with @EnumField
// Also - must use string enums
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

@Model()
export class User extends BaseModel {
  @EmailField({ nullable: true })
  email?: string;

  @StringField({ maxLength: 72, minLength: 8, nullable: true })
  password?: string;

  @StringField({ maxLength: 30, nullable: true })
  firstName?: string;

  @StringField({ maxLength: 50, minLength: 2, nullable: true })
  lastName?: string;

  @EnumField('UserStatus', UserStatus)
  status?: UserStatus;
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 8);
    }
  }
}
