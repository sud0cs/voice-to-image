# Voice to image

A very simple flask app to convert voice to images.

[<b>📺 Youtube preview</b>](https://www.youtube.com/watch?v=hMJqf417iws)

## Usage

### Dependencies

- python 3.10
- pip

### Installation

```bash
git clone https://github.com/sud0cs/voice-to-image
cd voice-to-image
python3.10 -m venv venv
source venv/bin/activate
pip install flask pyaudio transformers huggingsound diffusers
pip install --upgrade torch
pip install accelerate
```

### Initialization

```bash
python3.10 -m venv venv
source venv/bin/activate
python3 server.py
```

## Original models
This project is possible thanks to this models:
- [stable-diffusion-2-1-base](https://huggingface.co/stabilityai/stable-diffusion-2-1-base)
- [wav2vec2-large-xlsr-53-english](https://huggingface.co/jonatasgrosman/wav2vec2-large-xlsr-53-english)
