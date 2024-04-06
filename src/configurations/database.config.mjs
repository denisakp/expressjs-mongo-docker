import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

// project imports
import applicationEnv from "./config.mjs";

/**
 * Class representing a MongoDB database connection
 */
class MyDatabase {
    /**
     * The MongoClient instance
     *  @static
     *  @type { MongoClient }
     */
    static client;

    /**
     * The MongoDB database instance
     * @static
     * @type {Db}
     */
    static db;

    /**
     * The MongoDB collection instance
     * @static
     * @type {Collection}
     */
    static collection;

    /**
     * Connect to the MongoDB database. It uses a singleton pattern to ensure that
     * only one database connection is maintained throughout the application.
     * @static
     * @return {Promise<Db>} A promise that resolves to the MongoDB database instance
     */
    static async connect() {
        if(!this.client) {
            try {
                this.client = new MongoClient(applicationEnv.mongodb_uri, { serverApi: ServerApiVersion.v1 });
                const connection = await this.client.connect();
                this.db = connection.db("express");
                console.info('connected to database')
            } catch (error) {
                console.error("failed to connect to MongoDB: ", error.message);
            }
        }
        return this.db;
    }

    /**
     * Get the MongoDB collection instance. If the collection does not exist, it is
     * created. It ensures that only one collection instance is used.
     * @static
     * @return {Promise<Collection>} A promise that resolves to the MongoDB collection instance
     */
    static async getCollection() {
        if(!this.collection) {
            const db = await this.connect();
            this.collection = db.collection("blog");
        }
        return this.collection;
    }
}

export default MyDatabase;
