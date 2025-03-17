from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from engineio.payload import Payload

Payload.max_decode_packets = 200


app = Flask(__name__)
CORS(app, origins="*")

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

w
@socketio.on('connect')
def test_connect():
    print("socket connected")
    emit("done", "OK")
    # emit("")

@socketio.on('makeio')
def makeConnection(data):
    @socketio.on(data["id"])
    def dataShare(pac):
        emit(data["id"], pac,broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
