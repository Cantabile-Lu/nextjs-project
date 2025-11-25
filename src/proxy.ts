import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    // Middleware logic
    const token = request.cookies.get("Token");
    if (token) {
        return NextResponse.next();
    }
    return NextResponse.next();
    // return NextResponse.rewrite(new URL("/login", request.url));
}

export const config = {
    matcher: ["/"],
};
