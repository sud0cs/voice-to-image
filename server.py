from flask import Flask, jsonify, request, render_template
import audio, image
import threading

app = Flask('app')
s2t = None
t2i = None

def init_models():
    global s2t, t2i
    s2t = audio.Speech2text()
    t2i = image.Text2image()

@app.route('/', methods=['GET', 'POST'])
def index():
    if s2t is None or t2i is None:
        init_models()
    return render_template('index.html')

@app.route('/api/init_record', methods=['GET', 'POST'])
def init_record():
    t = threading.Thread(target=s2t.init_record)
    t.start()
    return jsonify({'init': True})

@app.route('/api/get_transcription', methods=['GET', 'POST'])
def get_transcription():
    s2t.stop_record()
    result = s2t.get_transcription()[0]['transcription']
    return jsonify({'transcription': result})

@app.route('/api/generate_image', methods=['GET', 'POST'])
def generate_imge():
    prompt = request.args.get('prompt')
    #t = threading.Thread(target=t2i.generate, args = (prompt,))
    #t.start()
    t2i.generate(prompt)
    return jsonify({'generation': True})

if __name__ == '__main__':
    app.run(debug=True)
