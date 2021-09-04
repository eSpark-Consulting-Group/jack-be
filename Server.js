const express = require("express");

const app = express();

const {Storage} = require('@google-cloud/storage');
const {BigQuery} = require('@google-cloud/bigquery');

const options = {
  keyFilename: './secret/ion-energy-solutions-293023-09c11dd2963b.json',
  projectId: 'ion-energy-solutions-293023',
};

const bigquery = new BigQuery(options);

const storage = new Storage();

const PORT = process.env.PORT || 8000;

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`server`);
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
