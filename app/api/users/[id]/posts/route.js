import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        
        return new Response(JSON.stringify(prompts), { status: 200})
    } catch (err) {
        return new Response("프롬프트를 설치하는데 실패하였습니다.", { status: 500})
    }
}