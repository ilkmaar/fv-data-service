import dotenv from 'dotenv'
dotenv.config({ path: `.env` })

export default {
    BATCH_SIZE: 100,
    neo4j: {
        url: process.env.NEO4J_URL,
        username: process.env.NEO4J_USERNAME,
        password: process.env.NEO4J_PASSWORD,
        params: {
            disableLosslessIntegers: true,
        },
    },
}