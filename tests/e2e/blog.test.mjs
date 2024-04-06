import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it} from '@jest/globals'
import supertest from 'supertest';

import server from '../../src/server.mjs';
import MyDatabase from "../../src/configurations/database.config.mjs";

describe('Blog post e2e tests', () => {
    let connection;
    let db;
    let collection;

    beforeAll(async () => {
        connection = await MyDatabase.connect();
        db = await connection.db("express");
        collection = await db.collection("blog");
    });

    afterAll(async () => {
        await collection.deleteMany({})
        await connection.close();
        server.close()
    })

    describe('create blog', () => {
        it('create blog post with title, content and description', async () => {
            const payload = {title: "Blog Title", content: "Blog Content", description: "Blog description"};

            const response = await supertest(server).post('/api/blog').send(payload);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
            expect(response.body).toHaveProperty("description");
        });

        it('create blog post with title, and content', async () => {
            const payload = {title: "Blog Title", content: "Blog Content"};
            const response = await supertest(server).post('/api/blog').send(payload);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
        })

        it('failed to create a blog post if title or content ot provided', async () => {

            const response = await supertest(server).post('/api/blog').send({});

            expect(response.statusCode).toBe(422);
        })
    });

    describe('load blog', () => {
        let blogPostId;

        beforeEach(async () => {
            const mockBlogPost = {title: "Blog Title", content: "Blog Content", description: "Blog description"};
            const result = await supertest(server).post('/api/blog').send(mockBlogPost);
            blogPostId = result.body.id;
        })

        afterEach(async () => {
            await collection.deleteOne({_id: blogPostId});
        });

        it('load blog post by id', async () => {
            const response = await supertest(server).get(`/api/blog/${blogPostId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
        });

        it('should failed to load blog post if id not exist', async () => {
            const response = await supertest(server).get('/api/blog/661116544a14f1697c9eac1c');

            expect(response.statusCode).toBe(404);
        })

        it('should failed to load blog post if id is not a valid ObjectId type', async () => {
            const response = await supertest(server).get('/api/blog/661116544a14f1697c9eac1h');
            expect(response.statusCode).toBe(422);
        });
    });

    describe('load blog posts', () => {
        let insertedPostIds = [];

        beforeAll(async () => {
            for (let i = 0; i < 5; i++) {
                const mockBlogPost = {
                    title: `Blog Title ${i}`,
                    content: `Blog Content ${i}`,
                    description: `Blog Description ${i}`
                };
                const insertResult = await collection.insertOne(mockBlogPost);
                insertedPostIds.push(insertResult.insertedId); // Save the inserted IDs
            }
        });

        afterAll(async () => {
            await collection.deleteMany({_id: {$in: insertedPostIds}});
        });

        it('should load blog posts', async () => {
            const response = await supertest(server).get('/api/blog');

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            response.body.forEach((post) => {
                expect(post).toHaveProperty("id");
                expect(post).toHaveProperty("title");
                expect(post).toHaveProperty("content");
            })
        });


    });

    describe('update blog post', () => {
        let blogPost;

        beforeEach(async () => {
            const mockBlogPost = {title: "Blog Title", content: "Blog Content", description: "Blog description"};
            const result = await supertest(server).post('/api/blog').send(mockBlogPost);
            blogPost = result.body;
        })

        afterEach(async () => {
            await collection.deleteOne({_id: blogPost.id});
        });

        it('should update a blog post', async () => {
            const payload = {title: "updated title", content: "Blog Content updated", description: "updated description"};
            const response = await supertest(server).patch(`/api/blog/${blogPost.id}`).send(payload);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("id");
        });

        it('should not update a blog post if not exist', async () => {
            const payload = {title: "updated title", content: "Blog Content updated", description: "updated description"};
            const response = await supertest(server).patch('/api/blog/661116544a14f1697c9eac1c').send(payload);

            expect(response.statusCode).toBe(400);
        });

        it('should not update a blog post if id is invalid', async () => {
            const payload = {title: "updated title", content: "Blog Content updated", description: "updated description"};
            const response = await supertest(server).patch('/api/blog/661116544a14f1697c9eac1h').send(payload);

            expect(response.statusCode).toBe(422);
        });

        it('should not update a blog post if required fields are missing', async () => {
            const payload = {};
            const response = await supertest(server).patch(`/api/blog/${blogPost.id}`).send(payload);

            expect(response.statusCode).toBe(422);
        });
    });

    describe('delete blog post', () => {
        let blogPostId;

        beforeEach(async () => {
            const mockBlogPost = {title: "Blog Title", content: "Blog Content", description: "Blog description"};
            const result = await supertest(server).post('/api/blog').send(mockBlogPost);
            blogPostId = result.body.id;
        })

        afterEach(async () => {
            await collection.deleteOne({_id: blogPostId});
        });

        it('should delete a blog post', async () => {
           const response = await supertest(server).delete(`/api/blog/${blogPostId}`);

           expect(response.statusCode).toBe(204);
        });

        it('should not delete a blog post if not exist', async () => {
            const response = await supertest(server).get('/api/blog/661116544a14f1697c9eac1c');

            expect(response.statusCode).toBe(404);
        });

        it('should not delete a blog post id is invalid', async () => {
            const response = await supertest(server).get('/api/blog/661116544a14f1697c9eac1h');

            expect(response.statusCode).toBe(422);
        });
    });
})