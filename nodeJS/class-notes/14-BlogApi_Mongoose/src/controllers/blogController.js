"use strict"

// call models: 
const {BlogCategory,BlogPost}=require('../models/blogModel')
module.exports.blogCategory={
  
    list: async (req, res) => {

        const result = await BlogCategory.find();

        res.status(200).send({
            error: false,
            result
        })
    },
    //CRUD
  
    create: async (req, res) => {
      const result=  await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        // await BlogCategory.findOne({...filter})

        //const result= await BlogCategory.findOne({_id:req.params.categoryId})
        const result= await BlogCategory.findById(req.params.categoryId)


        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        //const result= ({...filter},{...data})
       const result=await BlogCategory.updateOne({_id:req.params.categoryId}, req.body)
        res.status(202).send({
            error: false,
            result,
            new: await BlogCategory.findById(req.params.categoryId)
        })
    },

    delete: async (req, res) => {

        const result= await BlogCategory.deleteOne({_id: req.params.cetegoryId})
        if(result.deletedCount){
            res.sendStatus(204)
        }else{
            res.errorStatusCode=404
            throw new Error('data is not found')
        }
        
    },
}



module.exports.blogPost={
 
    list: async (req, res) => {

        const result = (await BlogPost.find({},{categoryId: true, title: true, content: true})).populate('categoryId')

        res.status(200).send({
            error: false,
            result
        })
    },
    //CRUD
  
    create: async (req, res) => {
      const result=  await BlogPost.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        // await BlogCategory.findOne({...filter})

        //const result= await BlogCategory.findOne({_id:req.params.categoryId})
        const result= await BlogPost.findById(req.params.blogId)


        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        //const result= ({...filter},{...data})
       const result=await BlogPost.updateOne({_id:req.params.blogId}, req.body)
        res.status(202).send({
            error: false,
            result,
            new: await BlogPost.findById(req.params.blogId)
        })
    },

    delete: async (req, res) => {

        const result= await BlogPost.deleteOne({_id: req.params.blogId})
        if(result.deletedCount){
            res.sendStatus(204)
        }else{
            res.errorStatusCode=404
            throw new Error('data is not found')
        }
        
    },
} 

// module.exports={blogCategory,blogPost}
