import {Collection, Db, MongoClient, ServerApiVersion} from "mongodb";

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
     * @return {Promise<MongoClient>}
     */
    static async connect() {
        if (!this.client) {
            try {
                this.client = new MongoClient(applicationEnv.mongodb_uri, {serverApi: ServerApiVersion.v1});
                await this.client.connect();
                console.info('connected to database')
            } catch (error) {
                console.error("failed to connect to MongoDB: ", error.message);
                throw error
            }
        }
        return this.client;
    }

    /**
     * Retrieves the MongoDB database instance.
     * @static
     * @returns {Promise<Db>}
     */
    static async getDB() {
        if (!this.db) {
            const client = await this.connect();
            this.db = client.db("express");
        }
        return this.db
    }

    /**
     * Get the MongoDB collection instance. If the collection does not exist, it is
     * created. It ensures that only one collection instance is used.
     * @static
     * @return {Promise<Collection>} A promise that resolves to the MongoDB collection instance
     */
    static async getCollection() {
        if (!this.collection) {
            const db = await this.getDB();
            this.collection = db.collection("blog");
        }
        return this.collection;
    }

    /**
     * Closes the current MongoDB connection, then resets the client, db, and collection
     * @static
     * @returns {Promise<void>}
     */
    static async close() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
            this.collection = null;
            console.info("database connection closed !")
        }
    }
}

export default MyDatabase;
