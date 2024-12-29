from uuid import uuid4

from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def generate_uuid():
    return str(uuid4())

def send_verification_email(user):
    verification_url = f"{settings.FRONTEND_URL}/verify?token={user.verification_token}"

    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=user.email,
        subject="Verify your email",
        html_content=f"""
        <p>Hi {user.first_name},</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="{verification_url}">Verify Email</a>
        """
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        print(f"Error sending email: {e}")

