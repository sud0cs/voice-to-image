import pyaudio
import wave
from transformers import pipeline, Wav2Vec2ForCTC, Wav2Vec2Processor
from huggingsound import SpeechRecognitionModel
class Speech2text():
    def __init__(self) -> None:
        self.record = True
        self.CHUNK = 1024
        self.FORMAT = pyaudio.paInt16
        self.CHANNELS = 2
        self.RATE = 44100
        self.WAVE_OUTPUT_FILENAME = "static/audio.wav"
        self.model = SpeechRecognitionModel("jonatasgrosman/wav2vec2-large-xlsr-53-english")
        self.p = pyaudio.PyAudio()
        self.frames = []

    def init_record(self):
        self.record = True
        self.stream = self.p.open(format=self.FORMAT,
                channels=self.CHANNELS,
                rate=self.RATE,
                input=True,
                frames_per_buffer=self.CHUNK)
        self.frames = []
        print(f'1: {self.record}')
        while True:
            if not self.record:
                return None
            data = self.stream.read(self.CHUNK)
            self.frames.append(data)
    def stop_record(self):
        self.record = False
        wf = wave.open(self.WAVE_OUTPUT_FILENAME, 'wb')
        wf.setnchannels(self.CHANNELS)
        wf.setsampwidth(self.p.get_sample_size(self.FORMAT))
        wf.setframerate(self.RATE)
        wf.writeframes(b''.join(self.frames))
        wf.close()

    def get_transcription(self):
        transcription = self.model.transcribe((self.WAVE_OUTPUT_FILENAME,))
        return transcription
