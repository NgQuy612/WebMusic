const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainControl = $('.container__main')
const playlist = $('.container__main-playlist')
const heading = $('.song--player .title')
const author = $('.song--player .author')
const audio = $('#audio')
const albumImg = $('.container__image')
const currentTime = $('.currentTime p')
const playBtnList = $('.btn__play--list') //:not(.icon-bars)
const barsBtn = $('.btn__play--list .icon-bars')
const playBtnFooter = $('.btn__play--footer')
const commentBtn = $('.btn--comment')
const likeBtn = $('.btn--like')
const likedBtn = $('.btn--like i')
const player = $('.song--player')
const controlFooter = $('.container__main-control')
const progress = $('.progress')
const progressBar = $('.progress-bar');
const volumeLine =$('.volume')
const volumeBar = $('.volume-bar')
const nextBtn = $('.btn--next')
const prevBtn = $('.btn--prev')
const randomBtn = $('.btn--random')
const repeatBtn = $('.btn--repeat')
const volumeBtn = $('.btn--volume')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isVolume: false,
    isComment: false,
    isLike: false,
    isBars: false, 
    songs: [
        {
            name: "Can We kiss Forever",
            singer: "Kina",
            path: "./assets/music/music1.mp3",
            image: "./assets/image/picture1.jpg"
        },
        {
            name: "Pass lives",
            singer: "Sapientdream",
            path: "./assets/music/music2.mp3",
            image: "./assets/image/picture2.jpg"
        },
        {
            name: "Shiloh Lofi Mix",
            singer: "Reverb",
            path: "./assets/music/music3.mp3",
            image: "./assets/image/picture3.jpg"
        },
        {
            name: "Someone To You (Lofi)",
            singer: "Shalom Margaret",
            path: "./assets/music/music4.mp3",
            image: "./assets/image/picture4.jpg"
        },
        {
            name: "Until I Found You",
            singer: "Speed Up",
            path: "./assets/music/music5.mp3",
            image: "./assets/image/picture5.jpg"
        },
        {
            name: "Let Her Go",
            singer: "Passenger",
            path: "./assets/music/music6.mp3",
            image: "./assets/image/picture6.jpg"
        },
        {
          name: "Can We kiss Forever",
          singer: "Kina",
          path: "./assets/music/music1.mp3",
          image: "./assets/image/picture1.jpg"
      },
      {
          name: "Pass lives",
          singer: "Sapientdream",
          path: "./assets/music/music2.mp3",
          image: "./assets/image/picture2.jpg"
      },
      {
          name: "Shiloh Lofi Mix",
          singer: "Reverb",
          path: "./assets/music/music3.mp3",
          image: "./assets/image/picture3.jpg"
      },
      {
          name: "Someone To You (Lofi)",
          singer: "Shalom Margaret",
          path: "./assets/music/music4.mp3",
          image: "./assets/image/picture4.jpg"
      },
      {
          name: "Until I Found You",
          singer: "Speed Up",
          path: "./assets/music/music5.mp3",
          image: "./assets/image/picture5.jpg"
      },
      {
          name: "Let Her Go",
          singer: "Passenger",
          path: "./assets/music/music6.mp3",
          image: "./assets/image/picture6.jpg"
      },
      
    ],

    /* LAY RA BAI HAT DAU TIEN CUA DS */
    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
      },

      // DINH DANG TYPE THOI GIAN CHUNG CHO WEB
      formatTime: function(sec_num) {
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
    
        hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;
    
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    },

    /* Promise lay thoi gian cua bai hat */
      getDuration: function(music) {
        return new Promise(function (resolve) {
          music.addEventListener('loadedmetadata', function () {
            const time = app.formatTime(music.duration);
            resolve(time);
          });
        });
      },

    /* DUA DANH SACH BAI HAT VAO PLAYLIST */
     render: function() {
      playlist.innerHTML = "";
      this.songs.map(async function(song, index) {

        const currentAudio = new Audio(song.path);
        const durationTime = await app.getDuration(currentAudio);

        playlist.insertAdjacentHTML("beforeend",
            ` <div class="song song--list"  data-index = "${index}">
                <div class="btn btn__play--list">
                    <i class="fa-regular fa-circle-play"></i>
                </div>

                <div class="body-song">
                    <div class="information-song">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>

                    <div class="feedback">
                        <div class="btn btn--comment ">
                            <i class="fa-solid fa-comment"></i>
                        </div>
                        <div class="btn btn--like">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div class="durationTime">
                            <p>${durationTime}</p>
                        </div>
                    </div>

                </div>
            </div>`
        )
      })
  
    },

      // LOAD BAI HAT HIEN TAI LEN DAU LIST DE PLAY
      loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        author.textContent = this.currentSong.singer
        albumImg.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path 
      },

      // HAM NEXT BAI HAT
      nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length ){
          this.currentIndex = 0
        }
        this.loadCurrentSong()
      },

      // HAM QUAY LAI BAI HAT TRUOC
      prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
      },

      // CHON NGAU NHIEN BAI HAT KHI NEXT, PRVE
      playRandomSong: function(){
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
      },

      // HAM XU LY KHI CLICK, PLAY
      handleEvent: function() {
        const _this = this

        // Xu ly khi click button play tai trang list
        playBtnList.onclick = function(e) {
            const notBars = e.target.closest('.icon-bars')
            if(!e.target.closest('.icon-bars')){
              if(_this.isPlaying){
                  audio.pause()
              }
              else{
                  audio.play()
              } 
            }
        }

        // Xu Ly KHI CLICK BUTTON PLAY O DUOI TRANG
        playBtnFooter.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            }
            else{
                audio.play()
            } 
        }


        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            playBtnList.classList.add('active')
            controlFooter.classList.add('playing')
          }

        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            playBtnList.classList.remove('active')
            controlFooter.classList.remove('playing')
          }

        // KHI BAI HAT CHAY, CAP NHAT LAI THANH PROGRESS AND CURRENTTIME
        audio.ontimeupdate = function() {
            if(audio.duration){
              const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
              progressBar.style.width = progressPercent.toString() + '%';
              progressBar.style.opacity = 1;

              currentTime.textContent = app.formatTime(audio.currentTime)
            }
          }

        // XU LY KHI CLICK TREN THANH PROGRESS DE SEEK
        progress.onclick = function(e) {
            const width = e.offsetX;
            const progress = e.currentTarget;
            const progressBarWidth = (width / progress.clientWidth) * 100;
            progressBar.style.width = `${progressBarWidth}%`;
            let { duration } = audio;
            audio.currentTime = (width * duration) / progress.clientWidth;
            audio.play();
          }

        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
              }
              else {
                _this.nextSong()
              }
               audio.play()
              _this.render()
            }

          prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
              }
              else {
                _this.prevSong()
              }
              audio.play()
              _this.render()
            }

          randomBtn.onclick = function (){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
          }

          repeatBtn.onclick = function (){
            _this.isRepeat = ! _this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
          }

          volumeBtn.onclick = function(){
            _this.isVolume = ! _this.isVolume
           volumeBtn.classList.toggle('active',_this.isVolume)
           volumeLine.classList.toggle('show',_this.isVolume)
          }

          // XU LY KHI HET BAI HAT QUAY LAI BAI CU NEU NHAN BUTTON REPEAT
          audio.onended = function () {
            if (_this.isRepeat) {
              audio.play();
            } else {
              nextBtn.click();
            }
          };

           // XU LY KHI CLICK TREN THANH VOLUME DE SEEK
          volumeLine.onclick = function(e) {
            const width = e.offsetX;
            const volume = e.currentTarget;
            
            const volumeBarWidth = (width / volume.clientWidth) * 100;
            volumeBar.style.opacity = 1;
            volumeBar.style.width = `${volumeBarWidth}%`;

            //set value volume
            audio.volume = (width / volume.clientWidth)
          }
       
          // LOAD NHAC LEN KHI CLIKC BAI HAT TU PLAYLIST
          playlist.onclick = function (e) {
            const songNode = e.target.closest('.song')
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              audio.play()
          }

          commentBtn.onclick = function() {
            _this.isComment = ! _this.isComment
            commentBtn.classList.toggle('active',_this.isComment)
            alert("Tính năng này chưa được Quý làm");
          }

          likeBtn.onclick = function() {
            _this.isLike = ! _this.isLike
            likedBtn.classList.remove('fa-regular')
            likedBtn.classList.toggle('fa-regular',! _this.isLike)
            likedBtn.classList.toggle('fa-solid',_this.isLike)
          }

          // Xu ly khi click icon bars play qeury mobile
          barsBtn.onclick = function() {
            
             _this.isBars = ! _this.isBars
             if(_this.isBars){
               playlist.style.display = "block"
               mainControl.style.minHeight = "100%";
               albumImg.style.height = "0";
             }
             else{
               playlist.style.display = "none"
               mainControl.style.minHeight = "var(--control-height)";
               albumImg.style.height = "calc(100% - var(--control-height))";
             }
          }

      },

      start: function() {
        this.defineProperties()
        this.render() 
        this.loadCurrentSong()
        this.handleEvent()
      }
}

app.start()