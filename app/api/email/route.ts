import { NextRequest, NextResponse } from "next/server";
import { MailDataRequired } from "@sendgrid/mail";
import sendgrid from "@/config/sendgrid-config";
import {
  renderCustomResourceEmail,
  renderSwatTeamEmail,
} from "@/utils/emailTemplates";
import { ICustomResourcePDF, ISwatTeamPDF } from "@/common";

type EmailRequest =
  | {
      email: string;
      name: string;
      type: "custom";
      data: ICustomResourcePDF;
    }
  | {
      email: string;
      name: string;
      type: "swat";
      data: ISwatTeamPDF;
    };

export async function POST(req: NextRequest) {
  const { email, name, type, data }: EmailRequest = await req.json();

  // console.log(data);

  if (!email || !name || !type || !data) {
    return NextResponse.json(
      {
        message: "From, name, type, and data fields are required.",
        success: false,
      },
      { status: 400 }
    );
  }

  const fromEmail = process.env.EMAIL_FROM;

  if (!fromEmail) {
    return NextResponse.json(
      {
        error: "EMAIL_FROM environment variables are missing.",
        success: false,
      },
      { status: 500 }
    );
  }

  let html = "";
  let subject = "Hub71 Rate Card";
  if (type === "custom") {
    html = renderCustomResourceEmail(data);
    subject = `Custom Resource Rate Card for ${data.role} (${data.region})`;
  } else if (type === "swat") {
    html = renderSwatTeamEmail(data);
    subject = `SWAT Team Rate Card for ${data.role}`;
  }

  // return NextResponse.json(
  //   {
  //     message: html,
  //   },
  //   { status: 200 }
  // );

  try {
    const emailData: MailDataRequired = {
      from: {
        email: fromEmail,
        name: name,
      },
      to: email,
      subject,
      text: "See attached rate card.",
      html,
    };
    console.log(emailData);
    await sendgrid.send(emailData);

    return NextResponse.json(
      { message: "Email sent successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    // console.error("SendGrid Error:", JSON.stringify(error, null, 2));
    console.log("error ", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: "Failed to send email.", success: false },
      { status: 500 }
    );
  }
}
