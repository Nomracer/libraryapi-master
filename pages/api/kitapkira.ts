import {NextApiRequest,NextApiResponse} from 'next'
import {Prisma,PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
export default async function (req:NextApiRequest,res:NextApiResponse){
    if(req.method=='POST'){
        const date= new Date()
        const newDate = new Date()
        newDate.setDate(date.getDate()+7)
        const newTime=new Date(newDate)
        console.log(newTime)
        const {userId,kitapId}=req.body
        let bookData:Prisma.kiralananlarCreateInput
        bookData={
            userId:userId,
            kitapId:kitapId,
            teslimTarih:newTime.toString()
        }
        const createBook= await prisma.kiralananlar.create({
            data:bookData
        })
        const stokDown = await prisma.kitaplar.update({
            where:{id:kitapId},
            data:{kalanKitap:{decrement:1}}
        })
        res.json(createBook)
        prisma.$disconnect()
    }
}