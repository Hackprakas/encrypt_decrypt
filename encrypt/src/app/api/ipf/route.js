import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const details = process.env.IPFS_URL;
        const result = await fetch(details);
        const response = await result.json();

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.status(500).json({ error: 'Internal Server Error' });
    }
};
