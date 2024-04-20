from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
import torch
class Text2image():
    def __init__(self, model_id = "stabilityai/stable-diffusion-2-1-base"):
        self.model_id = model_id
        scheduler = EulerDiscreteScheduler.from_pretrained(model_id, subfolder="scheduler")
        self.pipe = StableDiffusionPipeline.from_pretrained(model_id, scheduler=scheduler, torch_dtype=torch.float32, safety_checker=None)
        self.pipe = self.pipe.to('cuda')
        self.pipe.enable_sequential_cpu_offload()
        self.pipe.enable_attention_slicing("max")

    def generate(self, prompt):
        image = self.pipe(prompt).images[0]
        image.save("static/image.png")
