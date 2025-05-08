import { NextRequest } from "next/server";
import Mock, { Random } from "mockjs";

const generateData = () => {
    return {
        "auditStatus|1": ["SUCCESS", "FAIL"],
        coverImage: Random.image("117x66"),
        "price|1-100.1-2": 100,
        "softwareType|1": ["视频素材", "AE模板", "C4D模版"],
        title: "@ctitle(8,12)",
        "licType|1": ["NP", "LP", "LPPLUS"],
        vid: "@increment()",
    };
};
const result = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "data|1-10": [generateData()],
    code: 200,
});
export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    return Response.json(result);
}

export async function POST(request: NextRequest) {
    const url = request.nextUrl;
    result.data.push(Mock.mock(generateData()));
    return Response.json(result);
}
