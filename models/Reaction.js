const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: true,
          maxlength: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY h:mm a')
      }
  },
  {
      toJSON: {
          getters: true
      },
      id: false,
  }
);

  
  module.exports = reactionSchema;
