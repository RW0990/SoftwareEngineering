//setting up connection
mongoose
  .connect(DatabaseURI)
  .then(() => {
    console.log("Connected to MongoDB");
    append.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => console.log("MongoDB connection error: ", error));
