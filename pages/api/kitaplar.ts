import { NextApiRequest,NextApiResponse } from "next";
import {PrismaClient} from '@prisma/client'

const prisma=new PrismaClient()
export default async function (req:NextApiRequest,res:NextApiResponse) {
    const {method,adi,basimYili,yazar,kategori}=req.body
    if(method=="search"){
        Search()
    }else if(method=="list"){
        List()
    }
    async function List() {
        const data=await prisma.kitaplar.findMany()
        res.json(data)
        prisma.$disconnect()
    }
    async function Search(){
        const data= await prisma.kitaplar.findMany({
            where:{
                OR:[
                    {adi:
                    {
                        startsWith:adi
                    },
                    basimYili:basimYili,
                    yazar:yazar,
                    kategori:kategori
                    },
                    {adi:
                    {
                        endsWith:adi
                    },
                    basimYili:basimYili,
                    yazar:yazar,
                    kategori:kategori
                    }
                ],
            },
        })
        res.json(data)
        prisma.$disconnect()
    }
}
