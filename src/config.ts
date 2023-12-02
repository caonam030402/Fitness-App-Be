export const config = () => ({
  port: process.env.PORT || 8000,
  MongoUri: process.env.DATABASE_URL,
});
