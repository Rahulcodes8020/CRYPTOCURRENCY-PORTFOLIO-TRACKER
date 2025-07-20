import { NextResponse } from "next/server";

// ✅ Replace with your real CoinGecko API key if available
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "CG-w7RJBgY5HzEG33DuU69BEzoM";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const url = new URL("https://api.coingecko.com/api/v3/coins/markets");

    // Forward all params from client
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    // Always append API key (optional if you’re using one)
    url.searchParams.append("x_cg_demo_api_key", COINGECKO_API_KEY);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 0 }, // disable caching
    });

    if (!response.ok) {
      return NextResponse.json({ error: "CoinGecko error" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
