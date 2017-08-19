import { makeExecutableSchema } from 'graphql-tools';
import { findAllUsers, findUserById } from '../../dao/UserDAO';

const schema = `
  # Generic Person, do not specify any Role
  type Person implements CreationDates {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    userName: String!
    phone: String!
    email: String!
    observations: String
    decision: Decision
    createdOn: String!
    updatedOn: String!
  }
  
  type User implements CreationDates {
    id: ID!
    person: Person
    password: String
    role: Role
    manager: User
    active: Boolean
    lastLogin: String
    createdOn: String!
    updatedOn: String!
  }
  
  type OverTime {
    id: ID!
    employee: Employee!
    hours: Int
  }
  
  type Employee{
    id: ID!
    name: String!
  }
  
  enum Decision {
    granted
    denied
    pending
  }
  
  enum Role {
    person
    manager
    user
    admin
  }
  
  interface CreationDates {
    createdOn: String!
    updatedOn: String!
  }
  
  type Query{    
    users: [User]
    user(id: String): User
    person(id: String): Person
    overTime(id: Int): OverTime
  }

`;

const resolvers = {
  Query: {
    person: () => {
      return {
        id: 3,
        firstName: 'Alex',
        middleName: null,
        lastName: 'Deasss',
        userName: 'anynous',
        phone: '7894561221',
        email: 'absim@gh.com',
        observations: null,
        decision: 'granted'
      }
    },
    users: () => {
      return findAllUsers().then(users => {
        return users;
      }).catch(err => new Error(err));
    },
    user: (rootValue, args) => {
      return findUserById(args.id).then( user =>{
        return user;
      }).catch(err => new Error(err));
    },
    overTime: (_, args)  => {
      console.log("id:", args.id);
      return {
        id: 1,
        employee: {
          id: 100,
          name: "Hari"
        },
        hours: 10
      }
    }

  }
};

const AppSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

export default AppSchema;
