const dealers=require("../Models/Dealer");
const express=require("express");
const app=express();

const updatedealers = (req, res,next) => {
    const query = { $set: req.body };
   dealers.findByIdAndUpdate(
        req.params.id,
        query,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) {
                res.status(500);
                next(
                    new Error(
                        `Internal Server Error, Please Try later.`,
                    ),
                );
            } else {
                res.status(200).send({ doc });
            }
        }
    );
};


const delDealers=app.delete('/delete/:id',function(req,res,next){
    const id=req.params.id;
  dealers.findByIdAndRemove(id).exec()
    res.send("deleted!")



})
module.exports={updatedealers,delDealers}