const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const token = process.env.GITHUB_TOKEN;

let final_json;

async function syncData() {
    try {
        const response = await fetch("https://api.github.com/repos/ahmersiddiqui9889/WeTrix/contents/data/data.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.github.v3+json",
                "Authorization": "token " + token,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        })
        const data = await response.json();
        const decoded_data = atob(data.content);
        final_json = JSON.parse(decoded_data);
    } catch (err) {
        console.log(err);
    }
}

syncData();
setInterval(syncData, 1000*30);


app.get("/", async (req, res) => {
    res.json({ "Connected": "It's working"});
})

app.get("/:Url", async (req, res) => {
    const result = final_json.find(obj => obj.url === req.params.Url);
    res.json(result);
})

app.listen(PORT, () => console.log("Listening to port " + PORT));
