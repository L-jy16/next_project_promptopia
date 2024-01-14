import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt:{
        type: String,
        required: [true, '프롬프트가 필요합니다.']
    },
    tag : {
        type: String,
        required: [true, '태그가 필요합니다.']
    }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;