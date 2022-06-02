module.exports = {
  port: 3000,
  database_url: "mongodb://localhost:27017/media-project",
  database_option: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
