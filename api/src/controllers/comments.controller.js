import { Comments } from "../models/comments.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const test = asyncHandler(async (req, res) =>{
    res.send("Comment test");
});

const comments = asyncHandler( async (req, res) =>{
    const { pId,username,comments,uId,useravatar } = req.body;

    const postComments =  await Comments.create({
        pId,
        username,
        comments,
        uId,
        useravatar
    });

    return res
            .status(201)
            .json(
                new APIResponse( 201 , postComments, "Comments posted successfully"),
            )
} );

const getcomments = asyncHandler(async(req, res, next) =>{
    const query = {};
    const result = await Comments.find(query);
    res.status(201).json(
        new APIResponse(201, result, "All the comments are provided.")
    )
})

export {
    test,
    comments,
    getcomments,
    }