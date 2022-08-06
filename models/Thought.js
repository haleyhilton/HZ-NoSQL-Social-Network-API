const { Schema, model, Types } = require('mongoose');

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
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY h:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Total count of reactions a thought has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);
Thought.create(
  {
    thoughtText: 'Oh wow - Im not so sure about that',
    username: 'janedoe',
    reactions: {
      reactionBody: 'What in the world!?',
      username: 'janedoe',
    }
  },
  (err) => (err ? handleError(err) : console.log('Created new human interaction'))
);

module.exports = Thought;
