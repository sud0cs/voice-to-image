# Voice to image

A very simple flask app to convert voice to images.

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
