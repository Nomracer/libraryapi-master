import { NextApiRequest,NextApiResponse } from "next";
import {Prisma, PrismaClient} from '@prisma/client'
export default async function (req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const prisma = new PrismaClient()
        const {xemail,xsifre}= await req.body
        let data:Prisma.userdatasWhereInput
        data={email:xemail,sifre:xsifre}
        const userdata = await prisma.userdatas.findMany(
            {where:data}
        )
        res.json(userdata)
        prisma.$disconnect()
    }

}