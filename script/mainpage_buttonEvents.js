const likebutton = document.getElementsByClassName("like-dislike");
const playbutton = document.getElementById("play-pause");
const soundbutton = document.getElementById("quit-sound");
const nextbutton = document.getElementById("next");
const prevbutton = document.getElementById("prev");
const orderbutton = document.getElementById("order-change");
const addbutton = document.getElementsByClassName("add");
const listbutton = document.getElementById("list");
const clearbutton = document.getElementById("clear");
const lyricbutton = document.getElementById("lyricbutton");


const likebuttonImage = document.getElementsByClassName('dislike');
const playbuttonImage = document.getElementById('play');
const soundbuttonImage = document.getElementById('sound');
const orderbuttonImage = document.getElementById("order");

const message = document.getElementById("message");
const lyric = document.getElementById("dragable");

let islike = [];
let isplay = false;
let issound = true;

let fallbackImageUrl = "../img/blackalbum.jpg"; // 替换为你的备用图片 URL

//changenew
var likemusicList = [];

function printMassage(mes){
    message.style.bottom = "100px";
    message.textContent = mes;
    setTimeout(() => {
        message.style.bottom = "0";
    }, 2000);
}


//给所有的收藏按钮添加点击监听事件
for(let i=0 ; i < likebutton.length ; i++){
    islike[i] = false;
    likebuttonImage[i].Id = 'dislike' + i;
    likebutton[i].addEventListener("click" , ()=>{
        /*
        if(islike[i] === true){
            //更换图片
            likebuttonImage[i].src = "../img/dislike.png"
            //todo：把数据库里面的数据取消
        }
        else{
            //更换图片
            likebuttonImage[i].src = '../img/like.png';
            //todo：向数据库中添加数据
        }
        islike[i] = !islike[i];
        */

        printMassage("已收藏!");

        

        //changenew
        //直接作为按钮实现的话
        // 当前播放的歌曲的 数据 
        // musicList  musicNumber
        likeonesong(musicList[musicNumber]);

    });
}

//changenew
function likeonesong(onesong){
    console.log(onesong);
    var existingIndex = likemusicList.findIndex(song => song.mid === onesong.mid);
    console.log(existingIndex);
    // 如果找到了已存在的歌曲，删除它
    if (existingIndex !== -1) {
        console.log(`已存在的歌曲: ${likemusicList[existingIndex].name}`);
        //不删除
        //musicList.splice(existingIndex, 1);
    }
    else{
        likemusicList.unshift(onesong);
        console.log("like ", likemusicList);
        constructMusicDivs2(likemusicList);
        savethesavesongintothedatabase();
    }
}


//new
function constructMusicDivs2(musicList) {
    const musicListContainer2 = document.getElementById('2');
    console.log(musicListContainer2);
    musicListContainer2.innerHTML = ''; // 清空之前的内容

    musicList.forEach((music, index) => {

        // 创建外层div
        const songContainer2 = document.createElement('div');
        songContainer2.className = 'detailsongcontainer';

        // 创建歌曲详情div
        const songDetails2 = document.createElement('div');
        songDetails2.className = 'detailsong';

        // 创建并填充歌曲序号
        const songNumber2 = document.createElement('div');
        songNumber2.className = 'description_number';
        songNumber2.id = 'songnumber' + index;
        songNumber2.innerText = index + 1; // 使用索引作为歌曲编号

        // 创建并填充歌曲图片
        const songImage2 = document.createElement('img');
        songImage2.src = music.img || '../img/cat.png'; // 使用返回的图片，若不存在则使用默认图片
        songImage2.className = 'detailsmallimg';

        songImage2.onerror = function () {
            // 图片加载失败，使用备用图片
            songImage2.src = fallbackImageUrl;
        };
        // 创建并填充歌曲
        /*
        const songAudio = document.createElement('audio');
        songAudio.src = music.src; 
        songAudio.addEventListener('loadedmetadata', function() {
            console.log('songAudio.duration', songAudio.duration);  // 这时才能获取正确的时长
        });*/
        //songAudio.controls = true;
        //songAudio.className = 'detailsmallimg';

        // 创建并填充歌曲名称
        const songName2 = document.createElement('div');
        songName2.className = 'description_name';
        songName2.id = 'songname';
        songName2.innerText = music.name;
        // 添加点击事件，点击歌曲名称时弹出提示框


        // 创建并填充歌手名称
        const songSinger2 = document.createElement('div');
        songSinger2.className = 'description_singer';
        songSinger2.id = 'songsinger' + index;
        songSinger2.innerText = music.artist.join(', '); // 假设artist是一个数组

        const listDeleteButton2 = document.createElement('button');
        listDeleteButton2.className = 'lovedelete';
        const img = document.createElement('img');
        img.src = "../img/delete.png";
        img.className = "control-button";
        listDeleteButton2.appendChild(img);

        /*const songTime = document.createElement('div');
        songTime.className = 'description_time';
        songTime.id = 'songtime' + index;
        songTime.textContent = formatTime(songAudio.duration); // 假设time属性存在  格式化时间的显示*/

        // 将所有元素添加到歌曲详情div中
        songDetails2.appendChild(songNumber2);
        songDetails2.appendChild(songImage2);
        //songDetails2.appendChild(songAudio2);
        songDetails2.appendChild(songName2);
        songDetails2.appendChild(songSinger2);
        songDetails2.appendChild(listDeleteButton2);

        // 将歌曲详情div添加到外层div中
        songContainer2.appendChild(songDetails2);
        // 给删除按钮添加点击事件
        listDeleteButton2.addEventListener('click', function () {
            // 从 musicList 中删除对应项（假设你用的是列表索引 i）
            likemusicList.splice(index, 1);
            console.log('1111  ',likemusicList);
            // 删除父元素，即整个列表项
            songContainer2.remove();
            savethesavesongintothedatabase();
            constructMusicDivs2(musicList);
            
        });
        musicListContainer2.appendChild(songContainer2);

        //为该详情添加事件监听函数
        songDetails2.addEventListener('click', (event) => {
            PlayMusic(music.mid);
        });
    });
}

function getthesavesongfromthedatabase(){
    if(username === ''){
        //设定默认的用户名是admin  此处用于调试相关的功能
        username = 'admin';
    }
    axios.get(apiurl + "/getlist/", {
        params: {
            user:username
        }
    },
    ).then((r) => {
        rdata = r.data;
        console.log("database",rdata);
        
        rdata.forEach(song => {
            var listElementStruct = {
                mid:null,
                img:null,
                artist:[],
                name:null,
            };
            // 保存歌曲的基本信息
            listElementStruct.mid = song.mid;
            listElementStruct.artist = song.artist;
            listElementStruct.name = song.name;
            listElementStruct.img = fallbackImageUrl;
            
            console.log("listElementStruct",listElementStruct);
            likeonesong(listElementStruct);

        })
        //this.AddList(r, "replace");
    });
}

function savethesavesongintothedatabase(){
    console.log("shujuku");
    if(username === ''){
        //设定默认的用户名是admin  此处用于调试相关的功能
        username = 'admin';
    }
    console.log(likemusicList);
    const data = {
        play_list: likemusicList,
        user: username // 假设 this.user 已经定义了
    };
    console.log("savethesavesongintothedatabase()");
    axios.post(apiurl + "/savelist/", data, {
        headers: {
        'Content-Type': 'application/json'
    }
    })
    .then((r) => {
        console.log("数据上传到数据库",r.data.status);
        const currentDate = new Date();

      // 获取当前的年、月、日、小时、分钟、秒
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // 月份是从0开始的，所以下标需要加1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // 格式化时间为 `YYYY-MM-DD HH:mm:ss` 格式
      const formattedTime = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ` +
                            `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

      // 输出到网页
      //document.getElementById('current-time').textContent = formattedTime;
        const pElement = document.getElementById('timetodatabase');

        // 修改元素内容
        //pElement.textContent = '上次上传收藏列表到数据的时间是' + formattedTime;
    });
}

getthesavesongfromthedatabase();
//const intervalId = setInterval(savethesavesongintothedatabase, 10000);



//给播放，暂停按钮添加点击监听事件
playbutton.addEventListener("click" , ()=>{
    if(isplay === true){
        playbuttonImage.src = "../img/pause.png"
        currentMusic.play();
    }
    else{
        playbuttonImage.src = '../img/continue.png';
        currentMusic.pause();
    }
    isplay = !isplay;
});


function muteAll(sound) {
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach(media => {
        media.muted = sound; // 设置静音
    });
}

//给声音调节按钮添加点击监听事件
//todo : css添加音量条 ， 音量条的显示 ， 调节音量
soundbutton.addEventListener("click" , ()=>{
    if(issound === true){
        soundbuttonImage.src = "../img/no-sound.png";
        muteAll(true);
    }
    else{
        soundbuttonImage.src = '../img/sound.png';
        muteAll(false);
    }
    issound = !issound;
});

//给顺序按钮添加点击监听事件
//todo ： 调节歌单播放逻辑
orderbutton.addEventListener("click" , ()=>{
    if(isorder === 1){
        orderbuttonImage.src = "../img/while.png"
        isorder = 2;
    }
    else if(isorder === 2){
        orderbuttonImage.src = '../img/random.png';
        isorder = 3;
    }
    else{
        orderbuttonImage.src = '../img/order.png';
        isorder = 1;
    }
});


//给所有的添加按钮添加点击监听事件
//todo : 向歌单添加歌曲
for(let i=0 ; i < addbutton.length ; i++){

    addbutton[i].addEventListener("click" , ()=>{
        
    });
}

//给歌单按钮添加点击监听事件
listbutton.addEventListener("click" , ()=>{
    const listcontainer = document.getElementById("songlist");
    listcontainer.classList.toggle("list_visble");
});

//给歌单的清空按钮添加点击监听事件
clearbutton.addEventListener("click" , clearList);


//给歌单的删除按钮添加点击监听事件
function DeleteEventListen(){
    let deletebutton = document.getElementsByClassName("delete");

    for(let i=0 ; i < deletebutton.length ; i++){
        deletebutton[i].addEventListener("click" , ()=>{
            console.log("success!" + i);
            musicList.splice(i,1);
            
        });
    }
}

DeleteEventListen();


//给上一首按钮添加点击监听事件
prevbutton.addEventListener("click" , ()=>{
    if(isorder === 1){
        PlayPrev();
    }
    else if(isorder ===2){
        PlayMusic(musicList[musicNumber].mid);
    }
    else if(isorder === 3){
        PlayMusic(musicList[Math.floor(Math.random() * (musicList.length))].mid);
    }
});

//给下一首按钮添加点击监听事件
nextbutton.addEventListener("click" , ()=>{
    if(isorder === 1){
        PlayNext();
    }
    else if(isorder ===2){
        PlayMusic(musicList[musicNumber].mid);
    }
    else if(isorder === 3){
        PlayMusic(musicList[Math.floor(Math.random() * (musicList.length))].mid);
    }
});

//给歌词添加点击监听事件
lyricbutton.addEventListener("click" , ()=>{
    console.log(lyric);
    lyric.classList.toggle("hidden");
})

//歌词能够被拖动
let isDragging = false;
let offsetX, offsetY;

lyric.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - lyric.getBoundingClientRect().left; // 计算偏移量
    offsetY = e.clientY - lyric.getBoundingClientRect().top;

    lyric.style.cursor = 'grabbing'; // 鼠标按下后更改光标样式

    e.preventDefault(); // 取消默认行为，防止选择文本
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        lyric.style.left = `${e.clientX - offsetX}px`; // 更新位置
        lyric.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    lyric.style.cursor = 'grab'; // 恢复光标样式
});
