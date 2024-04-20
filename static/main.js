function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
var generating = false
document.addEventListener('keypress', (event) => {
  console.log(generating)
  if (generating==false){
    const keyName = event.key;
    if (keyName == ' ' && event.repeat == false){
      info = document.getElementById("info")
      c1 = document.getElementById("c1")
      c2 = document.getElementById("c2")
      c3 = document.getElementById("c3")
      c1.style.opacity = "0"
      c2.style.opacity = "0"
      c3.style.opacity = "0"
      c1.style.animationPlayState = "paused"
      c2.style.animationPlayState = "paused"
      c3.style.animationPlayState = "paused"
      h1 = document.getElementById("info_text")
      h1.innerHTML = 'hold down <span id="info_accent">spacebar</span> to record</span>'
      button_container = document.getElementById('button_container')
      button_bg = document.getElementById('button_bg')
      button_icon = document.getElementById('button_icon')
      image = document.getElementById("image")
      fetch('http://127.0.0.1:5000/api/init_record')
      button_container.style.background = "#003560"
      button_bg.style.background = "#0089df"
      button_bg.style.opacity = "1"
      button_icon.style.borderRadius = "0"
      button_icon.style.clipPath = "polygon(0% 0%, 0% 100%, 30% 100%, 30% 0%, 70% 0%, 70% 100%, 70% 100%, 100% 100%, 100% 100%, 100% 0%)"
      image.style.opacity = "0"
      info.style.margin = "-250px auto"
      console.log(button_icon)
    }
  }
});
document.addEventListener('keyup', (event) => {
  if (generating==false){
    const keyName = event.key;
    if (keyName == ' '){
      generating = true
      fetch('http://127.0.0.1:5000/api/get_transcription').then((response) => {
        return response.json()
    }).then((data) => {
          transcription = data.transcription
          transcription = transcription.trim()
          button_container.style.background = "#800000"
          button_bg.style.background = "#ff3f33"
          button_icon.style.borderRadius = "0"
          button_icon.style.clipPath = "polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%, 50% 0%, 50% 100%, 70% 100%, 100% 100%, 100% 100%, 100% 0%)"
          if (transcription!=""){
            if (transcription.toLowerCase()=="never gonna give you up"){
              window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank').focus();
            }
            h1.innerHTML = transcription;
            button_bg.style.opacity = "0";
            image.src = "";
            c1.style.opacity = "1"
            c2.style.opacity = "1"
            c3.style.opacity = "1"
            c1.style.animationPlayState = "running"
            c2.style.animationPlayState = "running"
            c3.style.animationPlayState = "running"
            fetch('http://127.0.0.1:5000/api/generate_image?prompt='+transcription).then((response) => {
              return response.json()
            }).then((data) => {
                console.log(data)
                image.src = "static/image.png";
                sleep(500).then(() => {
                  c1.style.opacity = "0"
                  c2.style.opacity = "0"
                  c3.style.opacity = "0"
                  c1.style.animationPlayState = "paused"
                  c2.style.animationPlayState = "paused"
                  c3.style.animationPlayState = "paused"
                  info.style.margin = "-386px auto";
                  image.style.opacity = "0.5";
                  image.style.opacity = "1";
                  console.log(generating)
                  generating = false;
                  console.log(generating)
              });
          })
          }
          else{
            generating=false;
          }
      })
    }
  }
});
