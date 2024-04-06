import joi from 'joi';

// environment variable schema
const envSchema = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid("development", "production").default('development'),
        APP_PORT: joi.number().default(3000),
        APP_HOST: joi.string().default('0.0.0.0'),
        MONGODB_HOST: joi.string().default('mongodb://localhost:27017/express'),
    })
    .unknown();

const {value, error} = await envSchema.validate(process.env);

if (error)
    console.error(error.details);

// exported application environment variable
const applicationEnv = {
    node_env: value.NODE_ENV,
    port: parseInt(value.APP_PORT),
    host: value.APP_HOST,
    mongodb_uri: value.MONGODB_HOST,
};

export default applicationEnv;
