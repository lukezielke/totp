import hashlib
import hmac
import secrets
import time

class Totp:
    def createKey():
        return secrets.token_hex(32)

    def getCurrentTime():
        time_since = time.time()
        return int(time_since)

    def makeTimeList(listname, time):
        for i in range(0, 31):
            listname.append(time - i)

    def sign_string(key, to_sign):
        key = key.encode("utf-8")
        to_sign = repr(to_sign).encode("utf-8")
        signed_hmac_sha256 = hmac.new(key, to_sign, "sha256").hexdigest()
        return signed_hmac_sha256

    def makeKeysList(listname, resultlist, key):
        for i in listname:
            result = Totp.sign_string(key, i)[:6]
            resultlist.append(result)


