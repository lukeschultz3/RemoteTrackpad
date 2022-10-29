from flask import Flask, render_template
from flask_socketio import SocketIO, emit

async_mode = None
app = Flask(__name__, static_folder="static")
socket_ = SocketIO(app, async_mode=async_mode)

@app.route("/")
def index():
    return render_template("index.html", sync_mode=socket_.async_mode)

@socket_.on("conn", namespace="/main")
def init_client():
    emit("initialization", None)

@socket_.on("move", namespace="/main")
def click(coords):
    print(coords)

if __name__ == "__main__":
    socket_.run(app, debug=True, host="0.0.0.0", port=5000)
