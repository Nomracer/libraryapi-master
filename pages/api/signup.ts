import {Prisma,PrismaClient} from '@prisma/client'
import { NextApiRequest,NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function(req:NextApiRequest,res:NextApiResponse){
    if(req.method=='POST'){
        const {okulNo,email,sifre,name,surname}=req.body
        let userdata:Prisma.userdatasCreateInput
        userdata={okulNo:okulNo,sifre:sifre,email:email,admin:false,teacher:false,student:true,name:name,surname:surname}
        const user = await prisma.userdatas.create({
            data:userdata
        })
        res.json(user)
        prisma.$disconnect()
    }
}