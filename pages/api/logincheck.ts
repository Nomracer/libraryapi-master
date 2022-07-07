import { NextApiRequest,NextApiResponse } from "next";
import {Prisma, PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
export default async function(req:NextApiRequest,res:NextApiResponse){
    if(req.method=='POST'){
        const {xemail,xsifre}=req.body
        let data:Prisma.userdatasWhereInput
        data={email:xemail,sifre:xsifre}
        const userdata= await prisma.userdatas.findMany(
            {
                where:data
            }
        )
        res.json(userdata)
        prisma.$disconnect()
    }
}