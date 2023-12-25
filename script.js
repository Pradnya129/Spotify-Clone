console.log("Welcome to Spotify")
// Initialize the variable
let SongIndex=0;
let AudioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById("masterPlay");
let myprogressbar=document.getElementById("myprogressbar");
let songsList=Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName")
// console.log(songsList)
let songs=[
    {SongName:"Mere+Banke+Bihari+Laal+Tum+Itna+Na+Kario", FilePath : "songs/1.mp3",CoverPath:"covers/1.jpg"},
    {SongName:"Prem Ho Tum Preet Ho Female Version", FilePath : "songs/2.mp3",CoverPath:"covers/2.jpg"},
    {SongName:"Achyutam Keshavam Song Devi Chitralekhaji", FilePath : "songs/3.mp3",CoverPath:"covers/3.jpg"},
    {SongName:"Om Jai Jagdish Hare", FilePath : "songs/4.mp3",CoverPath:"covers/4.jpg"},
    {SongName:"RADHA RANI | NANDLAL CHHANGA", FilePath : "songs/5.mp3",CoverPath:"covers/5.jpg"},
    {SongName:"Tere Dar Pe Aake Sanware", FilePath : "songs/6.mp3",CoverPath:"covers/6.jpg"},
    {SongName:"Achyutam-Keshavam", FilePath : "songs/7.mp3",CoverPath:"covers/7.jpg"},
    {SongName:"kanhaiya kanhaiya pukara karege", FilePath : "songs/8.mp3",CoverPath:"covers/8.jpg"},
    {SongName:"Govind bolo Hari gopal bolo", FilePath : "songs/9.mp3",CoverPath:"covers/9.jpg"},
    {SongName:"Bol Bol ke thak gaiye tum", FilePath : "songs/10.mp3",CoverPath:"covers/10.jpg"}
]
let i=0

function formatDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
songsList.forEach((Element,i)=>{
//    console.log( Element,i)
   Element.getElementsByTagName("img")[0].src=songs[i].CoverPath;
   Element.getElementsByTagName("span")[0].innerText=songs[i].SongName;
   
   let path=songs[i].FilePath
   let audio = new Audio(path );
   audio.addEventListener('loadedmetadata', function() {
    let durationElement = document.getElementsByClassName('duration')[i];
    
    durationElement.innerHTML = formatDuration(audio.duration);
   
   })


})

// Handle play/pause click

masterPlay.addEventListener("click",(e)=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        let durationElement = document.getElementById('endDuration');
        durationElement.innerText = formatDuration(AudioElement.duration);
        console.log(AudioElement.duration)
        masterSongName.innerText=songs[SongIndex].SongName;
        playingImg.style.opacity=0.8;
        songs.forEach((e,i)=>{
            if(songs[SongIndex].FilePath == `songs/${SongIndex+1}.mp3`){
              
                let song=document.getElementsByClassName("songItemplay")[SongIndex-1];
                song.classList.remove("fa-circle-play");
                song.classList.add("fa-circle-pause");
            }
        })
    }else{
          AudioElement.pause();
        console.log("master inside")
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
         playingImg.style.opacity=0;
         makeAllPlays()
         
        }
})






// listen to Events
    AudioElement.addEventListener("timeupdate",()=>{
    Progress=parseInt((AudioElement.currentTime / AudioElement.duration)*100);
    myprogressbar.value=Progress;
    const currentTimeInSeconds = Math.floor(AudioElement.currentTime);

    // Calculate minutes and seconds
    const minutes = Math.floor(currentTimeInSeconds / 60);
    const seconds = currentTimeInSeconds % 60;

    // Format the time as MM:SS
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    startDuration.innerText = formattedTime;
})
myprogressbar.addEventListener("change",()=>{
    AudioElement.currentTime=myprogressbar.value * AudioElement.duration /100;

})
let makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemplay")).forEach((e)=>{
        console.log("paused all")
e.classList.remove("fa-circle-pause");
e.classList.add("fa-circle-play");

    })

}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
  
    let SongIndex= parseInt(e.target.id);

makeAllPlays()

if(AudioElement.paused){
    console.log("clicked me")
e.target.classList.remove("fa-circle-play");
e.target.classList.add("fa-circle-pause");
AudioElement.src=`songs/${SongIndex+1}.mp3`;
AudioElement.currentTime= 0;
AudioElement.play();
masterPlay.classList.remove("fa-circle-play");
masterPlay.classList.add("fa-circle-pause");
masterSongName.innerText=songs[SongIndex].SongName;
}else{
AudioElement.pause();
masterPlay.classList.remove("fa-circle-pause");
masterPlay.classList.add("fa-circle-play");
}
})

})

document.getElementById("previouse").addEventListener("click",()=>{
    if(SongIndex<=1){
        SongIndex=11
    }else{
        makeAllPlays()
        SongIndex=SongIndex-1
        AudioElement.src=`songs/${SongIndex}.mp3`;
        AudioElement.currentTime= 0;
        AudioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterSongName.innerText=songs[SongIndex-1].SongName
        songs.forEach((e,i)=>{
            if(songs[i].FilePath == `songs/${SongIndex}.mp3`){
                let song=document.getElementsByClassName("songItemplay")[SongIndex-1];
                song.classList.remove("fa-circle-play");
                song.classList.add("fa-circle-pause");
            }
 
    
        })
    }
})

document.getElementById("next").addEventListener("click",()=>{
    if(SongIndex>=10){
        SongIndex=0;
    }else{
        makeAllPlays()
        SongIndex=SongIndex+1;
        AudioElement.src=`songs/${SongIndex}.mp3`;
        AudioElement.currentTime= 0;
        AudioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterSongName.innerText=songs[SongIndex-1].SongName;
        songs.forEach((e,i)=>{
            if(songs[i].FilePath == `songs/${SongIndex}.mp3`){
                let song=document.getElementsByClassName("songItemplay")[SongIndex-1];
                song.classList.remove("fa-circle-play");
                song.classList.add("fa-circle-pause");
            }
 
    
        })





    }
})


const volumeControl = document.getElementById('volumeControl');

// Set initial volume
AudioElement.volume = volumeControl.value / 100;

// Update volume when the range input changes
volumeControl.addEventListener('input', () => {
    // Convert range input value (0-100) to volume (0.0-1.0)
    const volumeValue = volumeControl.value / 100;
    
    // Ensure volume is within the valid range (0.0-1.0)
    const clampedVolume = Math.min(1, Math.max(0, volumeValue));

    AudioElement.volume = clampedVolume;

    // Update the range input in case it was clamped
    volumeControl.value = clampedVolume * 100;
});