import { NextRequest, NextResponse } from 'next/server';

interface InternalTransferForm {
  id: string;
  date: string;
  ssidPsidType: 'SSID' | 'PSID' | '';
  ssidPsidValue: string;
  poNumber: string;
  siteName: string;
  quantity: string;
  partNumber: string;
  description: string;
}

interface EmailPayload {
  forms: InternalTransferForm[];
  technicianName: string;
  submittedAt: string;
}

function generateEmailHTML(data: EmailPayload): string {
  const { forms, technicianName, submittedAt } = data;
  const submittedDate = new Date(submittedAt).toLocaleDateString('en-ZA');

  // Generate parts table rows
  const partsRows = forms.map(form => `
    <tr>
      <td style="border: 1px solid #000; padding: 8px; text-align: center;">${form.quantity}</td>
      <td style="border: 1px solid #000; padding: 8px;">${form.partNumber}</td>
      <td style="border: 1px solid #000; padding: 8px;">${form.description}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #ffffff;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 10px 0;
      text-align: center;
    }
    .form-section {
      margin: 20px 0;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 15px;
    }
    .form-field {
      margin-bottom: 10px;
    }
    .form-field label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
    .form-field .value {
      border-bottom: 1px solid #000;
      padding: 5px 0;
      min-height: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th {
      background-color: #f0f0f0;
      border: 1px solid #000;
      padding: 10px;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    td {
      border: 1px solid #000;
      padding: 8px;
    }
    .signature-section {
      margin: 30px 0;
      padding: 15px;
      border-top: 2px solid #000;
    }
    .signature-field {
      margin: 10px 0;
    }
    .admin-section {
      border: 2px solid #000;
      padding: 15px;
      margin-top: 20px;
      display: inline-block;
    }
    .checkbox {
      margin: 5px 0;
    }
    .stamp {
      color: #FF2B00;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header with Logos -->
    <div class="header">
      <div class="logo-section">
        <div style="color: #FF2B00; font-weight: bold; font-size: 24px;">TRANE</div>
        <div style="color: #666; font-weight: bold; font-size: 18px;">TRANE TECHNOLOGIES</div>
      </div>
      <div class="title">TRANE INTERNAL PARTS</div>
      <div class="title">TRANSFER ORDER FORM</div>
    </div>

    <!-- General Information Section -->
    <div class="form-section">
      <div class="form-row">
        <div class="form-field">
          <label>Date:</label>
          <div class="value">${forms[0].date}</div>
        </div>
        <div class="form-field">
          <label>SSID/PSID Number:</label>
          <div class="value">${forms[0].ssidPsidValue} (${forms[0].ssidPsidType})</div>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-field">
          <label>Site Name:</label>
          <div class="value">${forms[0].siteName || '-'}</div>
        </div>
        <div class="form-field">
          <label>PO Number:</label>
          <div class="value">${forms[0].poNumber || '-'}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>Technician Name:</label>
          <div class="value">${technicianName}</div>
        </div>
        <div class="form-field">
          <label>Signature:</label>
          <div class="value">Digital Submission - ${submittedDate}</div>
        </div>
      </div>
    </div>

    <!-- Parts Table -->
    <table>
      <thead>
        <tr>
          <th style="width: 80px;">QTY</th>
          <th style="width: 200px;">PART NO.</th>
          <th>DISCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        ${partsRows}
      </tbody>
    </table>

    <!-- Client Collection Section -->
    <div class="signature-section">
      <p style="margin-bottom: 15px; font-size: 14px;">
        Below is for parts that are sold and collected by client. MUST be signed and dated before releasing the parts.
      </p>
      <div class="signature-field">
        <label>Client name:</label>
        <div class="value">____________________________________</div>
      </div>
      <div class="signature-field">
        <label>Date:</label>
        <div class="value">____________________________________</div>
      </div>
      <div class="signature-field">
        <label>Signature:</label>
        <div class="value">____________________________________</div>
      </div>
    </div>

    <!-- Office Admin Section -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
      <div class="admin-section">
        <div style="font-weight: bold; margin-bottom: 10px;">OFFICE ADMIN USE ONLY</div>
        <div class="checkbox">A – ☐</div>
        <div class="checkbox">B – ☐</div>
        <div style="margin-top: 10px;">
          <label>Date and Signature:</label>
          <div>____________________________________</div>
        </div>
      </div>
      <div style="text-align: right;">
        <div class="stamp">SUBMITTED DIGITALLY</div>
        <div>${submittedDate}</div>
      </div>
    </div>

    <!-- Footer note -->
    <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #FF2B00;">
      <p style="margin: 0; font-size: 12px; color: #666;">
        <strong>Note:</strong> This form was submitted digitally via PartPulse on ${submittedDate} at ${new Date(submittedAt).toLocaleTimeString('en-ZA')}.
        ${forms.length > 1 ? `This submission contains ${forms.length} parts.` : ''}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailPayload = await request.json();
    const { forms, technicianName } = body;

    if (!forms || forms.length === 0) {
      return NextResponse.json(
        { error: 'No forms provided' },
        { status: 400 }
      );
    }

    // Generate email HTML
    const emailHTML = generateEmailHTML(body);

    // In production, this would use Resend API
    // For now, we'll use a mock implementation
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    if (RESEND_API_KEY) {
      // Send email using Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: ['joline.kruger@tranetechnologies.com'],
          subject: `Internal Parts Transfer - ${forms[0].ssidPsidType} ${forms[0].ssidPsidValue} - ${new Date().toLocaleDateString()}`,
          html: emailHTML,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
        throw new Error('Failed to send email via Resend');
      }

      const data = await response.json();
      console.log('Email sent successfully:', data);
    } else {
      // Mock: Log the email content for development
      console.log('=== MOCK EMAIL (No RESEND_API_KEY configured) ===');
      console.log('To: joline.kruger@tranetechnologies.com');
      console.log('Subject: Internal Parts Transfer');
      console.log('Forms:', forms);
      console.log('HTML generated (length):', emailHTML.length);
      console.log('================================================');
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      formsCount: forms.length,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
