import { NextRequest, NextResponse } from "next/server";

function isAuth(req: NextRequest) {
  return req.cookies.get("wc24_admin")?.value === "authenticated";
}

const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const SERVER = process.env.MAILCHIMP_SERVER || "us11";
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || "";

async function mailchimpFetch(endpoint: string) {
  const res = await fetch(`https://${SERVER}.api.mailchimp.com/3.0${endpoint}`, {
    headers: {
      Authorization: `apikey ${API_KEY}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  if (!API_KEY || !AUDIENCE_ID) {
    return NextResponse.json({ error: "Mailchimp yapılandırılmamış" }, { status: 500 });
  }

  const [listData, membersData, activityData] = await Promise.all([
    mailchimpFetch(`/lists/${AUDIENCE_ID}`),
    mailchimpFetch(`/lists/${AUDIENCE_ID}/members?count=20&sort_field=timestamp_opt&sort_dir=DESC`),
    mailchimpFetch(`/lists/${AUDIENCE_ID}/activity`),
  ]);

  const stats = listData?.stats || {};
  const members = (membersData?.members || []).map((m: Record<string, unknown>) => ({
    email: m.email_address,
    status: m.status,
    joined: m.timestamp_opt || m.timestamp_signup,
    name: (m.merge_fields as Record<string, string>)?.FNAME || "",
  }));

  const recentActivity = (activityData?.activity || []).slice(0, 7).map((a: Record<string, unknown>) => ({
    day: a.day,
    subs: a.subs,
    unsubs: a.unsubs,
    other_adds: a.other_adds,
  }));

  return NextResponse.json({
    totalSubscribers: stats.member_count || 0,
    unsubscribed: stats.unsubscribe_count || 0,
    cleaned: stats.cleaned_count || 0,
    avgOpenRate: stats.open_rate ? (stats.open_rate * 100).toFixed(1) : "0",
    avgClickRate: stats.click_rate ? (stats.click_rate * 100).toFixed(1) : "0",
    listName: listData?.name || "—",
    members,
    recentActivity,
  });
}
