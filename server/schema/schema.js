import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
// import { projects, clients } from '../sampleData.js'
import Client from '../models/Client.js'
import Project from '../models/Project.js'

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        // return clients.find((client) => client.id === parent.id)
        return Client.findById(parent.clientId)
      },
    },
  }),
})

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // return projects
        return Project.find()
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return projects.find((project) => project.id === args.id)
        return Project.findById(args.id)
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // return clients
        return Client.find()
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id)
        return Client.findById(args.id)
      },
    },
  },
})

export default new GraphQLSchema({
  query: RootQuery,
})
