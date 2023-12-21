import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

const app = express();

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}))

app.put("/upload", (req, res) => {
    console.log(req.files)
    console.log(req.path)

    if (!req.files || !req.files.file) {
        return res.status(300).json({ error: "Choose a file" });
    }
    const file = req.files.file;
    const filename = file.name;
    const randomString = Math.floor(Math.random() * 100_000).toString();
    const uploadFolder = path.join(path.dirname(new URL(import.meta.url).pathname), randomString);
    const filePath = path.join(uploadFolder, req.params.filename || filename);

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(`File can be accessed at: ${filePath}`)
    })
})

app.put("/upload/:filename", (req, res) => {
    console.log(req.files)
    console.log(req.path)
    if (!req.files || !req.files.file) {
        return res.status(300).json({ error: "Choose a file" });
    }
    const file = req.files.file;
    const filename = file.name;
    const randomString = Math.floor(Math.random() * 100_000).toString();
    const uploadFolder = path.join(path.dirname(new URL(import.meta.url).pathname), randomString);
    const filePath = path.join(uploadFolder, req.params.filename || filename);

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(`File can be accessed at: ${filePath}`)
    })
})

app.post("/upload/:filename", (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(300).json({ error: "Choose a file" });
    }
    const file = req.files.file;
    const filename = file.name;
    const randomString = Math.floor(Math.random() * 100_000).toString();
    const uploadFolder = path.join(path.dirname(new URL(import.meta.url).pathname), randomString);
    const filePath = path.join(uploadFolder, req.params.filename || filename);

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(`File can be accessed at: ${filePath}`)
    })
})

app.get("/status", (req, res) => {
    res.json("Server running")
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started at: ", 5000);
})
