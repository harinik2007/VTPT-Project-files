require("dotenv").config();
const mongoose = require("mongoose");

async function test() {
  try {
    const uri = process.env.MONGO_URI;

    console.log("Testing direct Atlas node...");

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      directConnection: true
    });

    console.log("SUCCESS!");
    console.log("Host:", conn.connection.host);

    await mongoose.disconnect();
  } catch (error) {
    console.error("FAILED!");
    console.error(error);
  }
}

test();