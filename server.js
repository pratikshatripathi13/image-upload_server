const express = require("express")
const multer = require("multer")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const { v4: uuidv4 } = require("uuid")
require("dotenv").config()

const app = express()

const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(new Error("Only JPG/PNG allowed"))
        }
    }
})

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }

        const fileName = `${Date.now()}-${uuidv4()}.jpg`

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })

        await s3.send(command)

        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`

        res.json({ url })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})