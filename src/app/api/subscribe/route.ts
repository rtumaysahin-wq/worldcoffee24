import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || "";
const SERVER = process.env.MAILCHIMP_SERVER || "us11";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    if (!API_KEY || !AUDIENCE_ID) {
      return NextResponse.json(
        { error: "Bülten servisi şu an kullanılamıyor." },
        { status: 500 }
      );
    }

    const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json({ success: true, message: "Bültene başarıyla kaydoldunuz!" });
    }

    if (data.title === "Member Exists") {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kayıtlı." },
        { status: 409 }
      );
    }

    if (data.title === "Invalid Resource") {
      return NextResponse.json(
        { error: "Geçersiz e-posta adresi." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Bir hata oluştu, lütfen tekrar deneyin." },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu, lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
