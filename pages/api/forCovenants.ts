import connect from '../../src/utils/connection';

export default async function Header(req, res) {
    const { data, title, subtitle, subject, width } = req.body

    if (req.method === "GET") {
        const { db } = await connect()
        const getData = await db.collection('forCovenants').find().toArray()
        return res.status(200).json(getData)        
    }

    if (req.method === "POST") {
        if (!data || !title || !subtitle || !subject || !width) {
            return res.status(200).json({'message': 'Missing data'})
        }
        const { db } = await connect()

        const saveData = await db.collection('forCovenants').insertOne(
            {data, title, subtitle, subject, width}
        )        
        return res.status(200).json(saveData);
    }

}