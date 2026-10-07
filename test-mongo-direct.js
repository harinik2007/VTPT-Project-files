require("dotenv").config();

const mongoose = require("mongoose");

async function test() {
  const uri = new URL(process.env.MONGO_URI);

  // Connect directly to the Atlas PRIMARY
  uri.protocol = "mongodb:";
  uri.hostname = "ac-obhjqrp-shard-00-01.hch3bo5.mongodb.net";
  uri.port = "27017";

  uri.searchParams.set("authSource", "admin");
  uri.searchParams.set("tls", "true");
  uri.searchParams.set("directConnection", "true");

  console.log("Node:", process.version);
  console.log("Mongoose:", mongoose.version);
  console.log("Testing:", uri.hostname);

  try {
    const connection = await mongoose.connect(uri.toString(), {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000
    });

    console.log("================================");
    console.log("CONNECTED SUCCESSFULLY!");
    console.log("Host:", connection.connection.host);
    console.log("================================");

    await mongoose.disconnect();
  } catch (error) {
    console.log("================================");
    console.log("CONNECTION FAILED");
    console.log("================================");

    console.log("Name:", error.name);
    console.log("Message:", error.message);

    if (error.reason) {
      console.log("\nTopology:");
      console.dir(error.reason, { depth: 5 });
    }

    if (error.cause) {
      console.log("\nCause:");
      console.dir(error.cause, { depth: 10 });
    }
  }
}

test();