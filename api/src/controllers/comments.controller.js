import { Comments } from "../models/comments.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const test = asyncHandler(async (req, res) =>{
    res.send("Comment test");
});

const comments = asyncHandler( async (req, res) =>{
    const { pId,username,comment } = req.body;

    const postComments =  await Comments.create({
        pId,
        username,
        comment,
    });

    return res
            .status(201)
            .json(
                new APIResponse( 201 , postComments, "Comments posted successfully"),
            )
} )

export {
    test,
    comments,
    }