import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.APIKEY); 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'shivaansharma16@gmail.com',
      subject: `New message from ${name}`,
      text: message,
      reply_to: email,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}