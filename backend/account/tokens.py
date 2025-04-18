from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
         # Include an expiry timestamp (1 day from token creation)
        expiry_timestamp = timestamp + (24 * 60 * 60)  # 1 day in seconds
        return f"{user.pk}{timestamp}{user.is_active}{expiry_timestamp}"


account_activation_token = AccountActivationTokenGenerator()
