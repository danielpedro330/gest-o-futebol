import { User, type UserProps } from '../../src/domain/Entites/User';
import { UniqueEntityID } from '../../src/domain/Entites/unique-entity-id';
import {faker} from '@faker-js/faker';

export function makeUsers(override: Partial <UserProps> ={}, id?: UniqueEntityID){
    const user=User.Create({
        name:faker.internet.displayName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
        createdAt: new Date(),
        ...override
    },id);

    return user;
}