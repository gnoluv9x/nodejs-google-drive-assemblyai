
const { google } = require("googleapis")
const fs = require("fs")
require("dotenv").config()
const path = require("path")

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID

const oauth2Client = new google.auth.OAuth2({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: REDIRECT_URL })
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
})

async function setFilePublic(fileId) {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    const getUrl = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink'
    })

    return getUrl
  } catch (error) {
    console.error("Debug_here error: ", error);
  }
}

async function uploadFile() {
  try {
    const createFile = await drive.files.create({
      requestBody: {
        name: "record2.mp3",
        mimeType: "audio/mpeg",
        parents: [DRIVE_FOLDER_ID]
      },
      media: {
        mimeType: "audio/mpeg",
        body: fs.createReadStream(path.join(__dirname, "./record2.mp3"))
      }
    })

    const getUrl = await setFilePublic(createFile.data.id);

    console.log("Debug_here createFile: ", createFile.data);
    console.log("Debug_here getUrl: ", getUrl.data);

  } catch (error) {
    console.error("Debug_here error: ", error);
  }
}

async function deleteFile(fileId) {
  try {
    const deleteFile = await drive.files.delete({
      fileId
    })
    console.log("Debug_here deleteFile: ", deleteFile.data, deleteFile.status);
  } catch (error) {
    console.error("Debug_here error: ", error);
  }
}

module.exports = {
  uploadFile,
  deleteFile
}