const express = require("express");

const { google } = require("googleapis");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const spreadsheetId = "1zLyw905QkmkpLuKKNqNdhNYTCNmHdw786j3ltvJ2PGE";

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    resource: {
      values: [req.body],
    },
  });

  console.log(req.body);
  res.send("got it");
});

app.listen(4000, () => {
  console.log("running on 4000");
});
