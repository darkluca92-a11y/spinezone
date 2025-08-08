import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically:
    // 1. Validate the form data
    // 2. Send email using a service like SendGrid, Nodemailer, etc.
    // 3. Store the inquiry in a database
    // 4. Send confirmation email to the user
    
    console.log('Contact form submission:', body);
    
    // For demo purposes, we'll simulate a successful submission
    // In production, implement actual email sending logic
    
    if (body.type === 'general_inquiry') {
      // Handle general contact form
      const emailContent = `
        New General Inquiry from SpineZone Website
        
        Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone || 'Not provided'}
        Subject: ${body.subject || 'Not specified'}
        Preferred Contact Method: ${body.contactMethod}
        
        Message:
        ${body.message}
      `;
      
      console.log('General inquiry email content:', emailContent);
      
    } else if (body.type === 'clinic_contact') {
      // Handle clinic-specific appointment request
      const emailContent = `
        New Appointment Request from SpineZone Website
        
        Clinic ID: ${body.clinicId}
        Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone || 'Not provided'}
        Preferred Date: ${body.appointmentDate || 'Not specified'}
        Preferred Time: ${body.appointmentTime || 'Not specified'}
        
        Message:
        ${body.message || 'No additional message'}
      `;
      
      console.log('Clinic appointment email content:', emailContent);
    }
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'There was an error processing your request. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for form testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'SpineZone Contact API is running',
    endpoints: {
      POST: 'Submit contact form or appointment request'
    }
  });
}