import Record from "../models/Record.js";

export const createRecord = async (req, res) => {
    try{
        const user = req.user;

        const record = Record.create({
            user : user._id,
            role : user.role,
            amount : req.body.amount,
            type : req.body.type,
            category : req.body.category,
            date : req.body.date,
            note : req.body.note
        })

        res.status(201).json({
            success : true,
            message : "Record created successfully",
            record : record
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getRecords = async (req, res) => {
    try{
        const records = await Record.find({ createdBy: req.user.id }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            message: "Records retrieved successfully",
            records
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateRecord = async (req, res) => {
    try{
        const { id } = req.params;
        const record = await Record.findOne({ _id: id, createdBy: req.user.id });
        if (!record) {
            return res.status(404).json({ 
                success: false,
                message: "Record not found"
            });
        }
        // updating
        Object.assign(record, req.body);
        await record.save();
        res.status(200).json({
            success: true,
            message: "Record updated successfully",
            record
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const deleteRecord = async (req, res) => {
    try{
        const id = req.params.id;
        const record = await Record.findOneAndDelete({
            _id : id,
            createdBy: req.user.id
            });

        if(!record){
            return res.status(400).json({
                success : false,
                message : "Invaild cridatial"
            })
        }
        res.status(200).json({
            success : true,
            message : "Record deleted successfully"
        });

        
    }
    catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error"
        });
    }
}



export  default {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
};