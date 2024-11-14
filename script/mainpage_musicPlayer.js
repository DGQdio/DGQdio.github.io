//这里是涉及到所有和音乐的播放有关的脚本

const currentMusic = document.getElementById("audio_playing");
const player = document.getElementById("player");
const cTime = document.getElementById("currentTime");
const dTime = document.getElementById("duration");
const progress = document.getElementById('progress_bar');
const progressContainer = document.getElementById('progress_container');


//播放列表
/*
数据结构：
listElementStruct{
    mid:
    img:
    artist:[]
    name:
}
*/
const List = document.getElementById('listcontainer');
const currentLyric = document.getElementById("currentlyric");
var musicList = [];
var musicNumber = 0;
let isorder = 1;

//原始歌词
var lrc= [];
//解析之后的歌词   类似于[0, '当爱在靠近 - en']  时间 歌词 这个是ls里面的某一个元素
var ls = [];   
//获取当前这一句的歌词
var word = ""; 
var nextword = "";


//进度条设置

//更新当前时间
currentMusic.addEventListener('timeupdate' , () =>{
    cTime.textContent = formatTime(currentMusic.currentTime);
})
// 设置总时长
currentMusic.addEventListener('loadedmetadata', () => {
    
    dTime.textContent = formatTime(currentMusic.duration);
});

// 更新进度条
currentMusic.addEventListener('timeupdate', () => {
    const percentage = (currentMusic.currentTime / currentMusic.duration) * 100;
    progress.style.width = percentage + '%';
});

// 点击进度条跳转
progressContainer.addEventListener('click', (event) => {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left; // 点击位置相对于进度条左侧的偏移
    const totalWidth = rect.width;
    const percentage = offsetX / totalWidth; // 计算点击位置占总宽度的百分比
    currentMusic.currentTime = percentage * currentMusic.duration; // 跳转到相应的时间
});


function PlayMusic(mid) { //播放音乐
    axios.get(apiurl + "/music/", {
        params: {
            mid: mid,
            type: "music",
        }
    }).then((response) => {
        console.log(response); // 输出整个响应对象
        console.log(response.data); // 输出响应数据部分
        let mmusic = JSON.parse(JSON.stringify(response.data));
        this.nowmusic = response.data

        let primaryImageUrl = this.nowmusic.img;
        let fallbackImageUrl = "../img/blackalbum.jpg"; // 替换为你的备用图片 URL

        // 创建一个新的图片对象以检查加载状态
        let img = new Image();
        img.src = primaryImageUrl;

        img.onload = function () {
            // 图片加载成功
            document.querySelector("#album_rotate_img").src = primaryImageUrl;
        };

        img.onerror = function () {
            // 图片加载失败，使用备用图片
            document.querySelector("#album_rotate_img").src = fallbackImageUrl;
        };


        if(this.nowmusic.src){
            currentMusic.src = this.nowmusic.src;
            console.log(this.nowmusic.artist);
            player.querySelector("#playsong").innerHTML = this.nowmusic.name;
            player.querySelector("#playsinger").innerHTML = this.nowmusic.artist;
            playbuttonImage.src = '../img/pause.png';
            currentMusic.play();
            isplay = true;//标记音乐正在播放
        }

       

        var listElementStruct = {
            mid:null,
            img:null,
            artist:[],
            name:null,
        };



      
        lrc = this.nowmusic.lrc;
        //这个是为歌词赋值
        DecodeLrc(lrc);
        //console.log(lrc);


        listElementStruct.mid = mid;
        listElementStruct.img = primaryImageUrl;
        listElementStruct.artist = this.nowmusic.artist;
        listElementStruct.name = this.nowmusic.name;

        if(this.nowmusic.src){

            
            // 查找当前歌曲在 musicList 中的索引
            var existingIndex = musicList.findIndex(song => song.mid === listElementStruct.mid);
            console.log(existingIndex);
            // 如果找到了已存在的歌曲，删除它
            if (existingIndex !== -1) {
                    musicNumber = existingIndex;
                    console.log(`已存在的歌曲: ${musicList[existingIndex].name}`);
                    //不删除
                    //musicList.splice(existingIndex, 1);
            }
            else{
                    musicNumber = 0;
                    musicList.unshift(listElementStruct);
                    console.log("new musicList", musicList);
            }
            console.log("musicnumber", musicNumber);
            constructListElementDivs();
        }
        else{
            printMassage("sorry , 该歌曲暂时无法播放");
        }
    });
}



//构造HTML语句，展示播放列表
function constructListElementDivs(){
    List.innerHTML = '';//清空之前的内容
    for(let i = 0 ; i < musicList.length ; i++){
        const listElement = document.createElement('div');
        listElement.className = 'listelement';

        const listImg = document.createElement('img');
        listImg.className = "listimg";
        listImg.src = musicList[i].img;

        const listSong = document.createElement('div');
        listSong.className = 'song';
        listSong.textContent = musicList[i].name;
        listSong.style = 'width:100px ;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'

        const listName = document.createElement('div');
        listName.className = 'name';
        listName.textContent = musicList[i].artist;
        listName.style = 'margin-left:200px';

        const listDeleteButton = document.createElement('button');
        listDeleteButton.className = 'delete';

        const listDeleteButtonImg = document.createElement('img');
        listDeleteButtonImg.src = "../img/delete.png";
        listDeleteButtonImg.className = 'control-button';

        const listplayButton = document.createElement('button');
        listplayButton.className = 'play';

        const listplayButtonImg = document.createElement('img');
        listplayButtonImg.src = "../img/continue.png";
        listplayButtonImg.className = 'control-button';
        listElement.appendChild(listplayButton);



        listDeleteButton.appendChild(listDeleteButtonImg);
        listplayButton.appendChild(listplayButtonImg);

        listElement.appendChild(listImg);
        listElement.appendChild(listSong);
        listElement.appendChild(listName);
        listElement.appendChild(listDeleteButton);
        listElement.appendChild(listplayButton);

        // 给删除按钮添加点击事件
        listDeleteButton.addEventListener('click', function () {
            // 从 musicList 中删除对应项（假设你用的是列表索引 i）
            musicList.splice(i, 1);
            
            // 删除父元素，即整个列表项
            listElement.remove();

            if(i === 0){
                //删除的是正在播放的音乐
                if(musicList.length !== 0){
                    PlayMusic(musicList[0].mid);
                }
                else{
                    clearList();
                }
            }
            //console.log(i);

            // 可选：重新渲染列表
            constructListElementDivs();
        });

        listplayButton.addEventListener('click', function () {
            console.log("click listplayButton");
            PlayMusic(musicList[i].mid);
        });


        List.appendChild(listElement);
    }
}

//清空所有歌曲
function clearList(){
    musicList = [];
    currentMusic.src = "";
    document.querySelector("#album_rotate_img").src = "../img/blackalbum.jpg";
    cTime.textContent = '0:00';
    dTime.textContent = "0:00";
    progress.style.width = 0;
    currentLyric.textContent = '...';
    ls = [];
    player.querySelector("#playsong").innerHTML = " ";
    player.querySelector("#playsinger").innerHTML = " ";

    constructListElementDivs();
}


//下一首
function PlayNext(){
    musicNumber = (musicNumber + 1) % musicList.length;
    PlayMusic(musicList[musicNumber].mid);
}

//上一首
function PlayPrev(){
    musicNumber = (musicNumber - 1 + musicList.length) % musicList.length;
    PlayMusic(musicList[musicNumber].mid);
}

//检查时间
function Cheak(){
    if(cTime.textContent === dTime.textContent && dTime.textContent !=="0:00"){
        //下一首
        if(isorder === 1){
            PlayNext();
        }
        else if(isorder ===2){
            PlayMusic(musicList[musicNumber].mid);
        }
        else if(isorder === 3){
            PlayMusic(musicList[Math.floor(Math.random() * (musicList.length))].mid);
        }
    }
}

setInterval(Cheak , 1000);


function DecodeLrc(s) { //歌词解码
    l = s.split("\n");
    for (i = 0; i < l.length; i++) {
        if (l[i] == "") continue;
        time_str = l[i].slice(1, l[i].search("]"));
        t = time_str.split(":")[0] * 60 + time_str.split(":")[1] * 1.0;
        ls.push([t, l[i].slice(l[i].search("]") + 1)]);
    }
    //console.log("ls",ls);
}

function UpLrc() { //歌词更新
    if (!ls.length){
        return ;
    };
    //console.log("currentMusic.currentTime",currentMusic.currentTime);
    
    t = currentMusic.currentTime;
    for (i = ls.length - 1; i >= 0; i--) {
        if (t >= ls[i][0]) {
            //下一句
            /*
            if (i < ls.length - 1) {
                nextword = ls[i + 1][1];
            }
            else {
                nextword = "";
            }
            */
            word = ls[i][1];
            currentLyric.textContent = word;
            break;
        }
    }
    
    //console.log(word);
    //console.log(nextword);
}

setInterval(UpLrc, 1000); // 1000 毫秒 = 1 秒