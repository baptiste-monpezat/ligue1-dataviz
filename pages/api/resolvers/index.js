export const resolvers = {
  Query: {
    seasonResults: async (parent, { season }, context, info) => {
      const data = await context.db
        .collection("data")
        .findOne({ season: season });

      return data["results"];
    },
    dates: async (parent, args, context, info) => {
      const data = await context.db
        .collection("data")
        .find({})
        .project({ _id: 0, season: 1 })
        .toArray();

      return data.map((item) => {
        return item["season"];
      });
    },
  },
};
