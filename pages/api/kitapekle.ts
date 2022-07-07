import { NextApiRequest,NextApiResponse } from "next";
import { PrismaClient,Prisma } from "@prisma/client";

const prisma=new PrismaClient()
export default async function (req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const {adi,basimYili,yazar,adet,sayfaSayisi,kategori}=req.body
        let bookData:Prisma.kitaplarCreateInput
        bookData={
            adi:adi,
            yazar:yazar,
            basimYili:basimYili,
            adet:adet,
            kalanKitap:adet,
            sayfaSayisi:sayfaSayisi,
            kategori:kategori
        }
        const resdata=await prisma.kitaplar.create(
            {
                data:bookData
            }
        )
        res.json(resdata)
        prisma.$disconnect()
    }
    
}