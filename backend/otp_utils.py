import random
import time
from typing import Dict, Tuple
import os

try:
    from twilio.rest import Client  # type: ignore
except ImportError:
    Client = None  # Twilio optional

OTP_STORE: Dict[str, Tuple[str, float]] = {}

TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM = os.getenv("TWILIO_FROM_NUMBER")


def _send_sms(phone: str, body: str):
    if Client and TWILIO_SID and TWILIO_TOKEN and TWILIO_FROM:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        client.messages.create(body=body, from_=TWILIO_FROM, to=phone)
    else:
        # Fallback: print to console (development)
        print(f"[OTP] Sending to {phone}: {body}")


def generate_and_send_otp(phone: str) -> None:
    code = f"{random.randint(100000, 999999)}"
    OTP_STORE[phone] = (code, time.time())
    _send_sms(phone, f"Your verification code is {code}")


def verify_otp(phone: str, code: str) -> bool:
    stored = OTP_STORE.get(phone)
    if not stored:
        return False
    stored_code, ts = stored
    # Expire after 5 minutes
    if time.time() - ts > 300:
        OTP_STORE.pop(phone, None)
        return False
    if stored_code == code:
        OTP_STORE.pop(phone, None)
        return True
    return False