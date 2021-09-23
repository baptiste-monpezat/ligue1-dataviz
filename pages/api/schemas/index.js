import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Day {
    day: Int!
    points: Int!
    ranking: Int!
  }
  type seasonResult {
    team: String
    color: String
    evolution: [Day]
  }

  type Query {
    seasonResults(season: String): [seasonResult]
    dates: [String]
  }
`;
