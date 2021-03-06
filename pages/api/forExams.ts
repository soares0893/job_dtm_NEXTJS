import connect from '../../src/utils/connection';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    const { db } = await connect();
    const { data, title, subtitle, subject, width } = req.body

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

    if (req.method === 'GET') {
        const array = await db.collection('forExams').find().toArray()
        return res.status(200).json(array)
    }
        
    if (req.method === 'POST') {
        if(!data || !title || !subtitle || !subject || !width) { return res.status(404).json({message: 'Missing data.'})}
        const object = {data, title, subtitle, subject, width}
        const postDB = await db.collection('forExams').insertOne(object)

        return res.status(200).json(postDB)
    }
        
    if (req.method === 'PUT') {

    }
        
    if (req.method === 'DELETE') {
        const title = req.body
        const deletedOne = await db.collection('forExams').deleteOne({'title': title.title})
        return res.status(200).json(deletedOne)
        
    }

    return res.status(404).json({message: 'Not Allowed.'})
    
}