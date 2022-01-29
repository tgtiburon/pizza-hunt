
const { Schema, model, Types }  = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
    {
        // set a custom id to avoid confusion with parent comment_id
        // we imported Types to use this
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true, 
            trim: true
        },
        writtenBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema (
    {
        writtenBy: {
            type: String
        },
        commentBody: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // Associate replies to comments
        // Use ReplySchema to validate data for a reply
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Add a virtual for CommentSchema to get a total reply count

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);


module.exports = Comment;


