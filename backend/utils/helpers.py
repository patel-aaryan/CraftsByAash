from uuid import uuid4

from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def generate_uuid():
    return str(uuid4())


def send_verification_email(user, verification_type):
    verification_url = f"{settings.FRONTEND_URL}/verify?token={user.verification_token}"

    msg = ''
    subject = ''
    sub_msg = ''
    if verification_type == "verify":
        subject = "Verify your email - Action Required"
        msg = """
            <p>Thank you for creating an account with CraftsByAash. To complete your
            registration, please verify your email by clicking the link below.</p>
        """
        sub_msg = """
            <p>If you did not create this account, please ignore this message.</p>
            """

    elif verification_type == "resend":
        subject = "Verification email resent - Action Required"
        msg = """
            <p>We have received your request to resens the verification email.
            Please verify your email by clicking the link below.</p>
        """
        sub_msg = """
            <p>If you did not request this email, please ignore this message.</p>
        """

    elif verification_type == "change":
        subject = "Confirm Your Email Change Request - Action Required"
        msg = """
            <p>We received a request to change the email address associated with
            your account. If you made this request, please confirm the change
            by clicking the link below.</p>
        """
        sub_msg = """
            <p>If you did not request this change, please contact our support
            team immediately to secure your account.</p>
        """


    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=user.email,
        subject=subject,
        html_content=f"""
        <p>Hi {user.first_name},</p>
        {msg}
        <a href="{verification_url}">Verify Email</a>
        
        <p>{sub_msg}</p>
                
        <p>Thank you,</p>
        <p>CraftsByAash Team</p>
        """
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        sg.send(message)
        print(f"Mail sent successfully to {user.email}")
    except Exception as e:
        print(f"Error sending email: {e}")
