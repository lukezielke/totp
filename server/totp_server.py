from flask import Flask, request
from flask_cors import CORS, cross_origin
from totp import Totp
import json
import sqlite3

con = sqlite3.connect('data.db', check_same_thread=False)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/key/<id>")
@cross_origin()
def key(id):
    cur = con.cursor()
    key = Totp.createKey()
    sql = """INSERT INTO keys VALUES('{}', '{}')""".format(
        id, key)
    cur.execute(sql)
    con.commit()
    return json.dumps(key, indent=4)

@app.route("/check", methods=['POST', 'GET'])
@cross_origin()
def codes():
    cur = con.cursor()
    result = False
    timeList = []
    keysList = []
    userid = request.form.get('userid')
    code = request.form.get('code')
    sql = """SELECT key FROM keys WHERE userid = '{}'""".format(userid)
    cur.execute(sql)
    row = cur.fetchone()[0]
    print(code)
    print(row)
    Totp.makeTimeList(timeList, Totp.getCurrentTime())
    Totp.makeKeysList(timeList, keysList, row)
    print(keysList)
    for key in keysList:
        if key == code:
            result = True

    print(result)
    return json.dumps(result, indent=4)




if __name__ == "__main__":
    app.run(debug=True)
