import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    return Response.json({
        code: 200,
        data: {
            countryCode: "US",
            currencyName: "USD",
        },
    });
}
