// 获取所有具有 class 为 ranklist-container 的元素
const ranklist = document.getElementsByClassName('ranklist-container');
const details = document.getElementsByClassName('rankdetail');

const hotimg = document.getElementById('hot');
const newimg = document.getElementById("new");



function getRecommendations(id) {
    axios.get(apiurl + '/recommendations/',{
        params: {
            id:id  //  1  2  两个榜单
        }
    }
        )
      .then(function (response) {
        console.log('success:', response.data);
        constructMusicDivs(response.data);
      })
      .catch(function (error) {
        console.error('failed:', error);
      });
  }



async function getRecommendations1(id) {
    try {
        // 发起请求并等待响应
        const response = await axios.get(apiurl + '/recommendations/', {
            params: { id: id }  // 传递 id 作为查询参数
        });
        if (id === 1) {
            // 返回 hotList 数据
            return response.data;
        } else {
            // 返回 newList 数据
            return response.data;
        }
    } catch (error) {
        console.error('failed:', error);
        // 在请求失败时返回一个空数组或者其他适当的值
        return [];
    }
}

async function getImgAndSong() {
    try {
        // 使用 Promise.all 执行多个异步请求
        const [hotList, newList] = await Promise.all([
            getRecommendations1(1),  // 获取 hotList
            getRecommendations1(2)   // 获取 newList
        ]);

        // 处理请求成功的响应

        if (hotimg) {
            hotimg.src = hotList[0].img || '../img/blue.png';
            console.log('su:', hotimg);
        } else {
            console.log('fa: hotimg not found');
        }
    
        if (newimg) {
            newimg.src = newList[0].img || '../img/blue.png';
            console.log('new img:', newimg);
        } else {
            console.log('new fa: newimg not found');
        }
        const hs1 = document.getElementById("hs1");
        hs1.innerHTML = hotList[0].name;
        const hs2 = document.getElementById("hs2");
        hs2.innerHTML = hotList[1].name;
        const hs3 = document.getElementById("hs3");
        hs3.innerHTML = hotList[2].name;
        const hn1 = document.getElementById("hn1");
        hn1.innerHTML = hotList[0].artist;
        const hn2 = document.getElementById("hn2");
        hn2.innerHTML = hotList[1].artist;
        const hn3 = document.getElementById("hn3");
        hn3.innerHTML = hotList[2].artist;
        const ns1 = document.getElementById("ns1");
        ns1.innerHTML = newList[0].name;
        const ns2 = document.getElementById("ns2");
        ns2.innerHTML = newList[1].name;
        const ns3 = document.getElementById("ns3");
        ns3.innerHTML = newList[2].name;
        const nn1 = document.getElementById("nn1");
        nn1.innerHTML = newList[0].artist;
        const nn2 = document.getElementById("nn2");
        nn2.innerHTML = newList[1].artist;
        const nn3 = document.getElementById("nn3");
        nn3.innerHTML = newList[2].artist;

        //hotimg.src = hotList[0].img || '../img/blue.png';

       // hotimg.src = hotList[0].img;
    } catch (error) {
        // 处理请求错误
        console.error('Error:', error);
    }
}

//计算时长
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    return formattedTime;
}


function constructMusicDivs(musicList) {
    const musicListContainer = document.getElementById('1');
        musicListContainer.innerHTML = ''; // 清空之前的内容
        
        musicList.forEach((music, index) => {

            // 创建外层div
            const songContainer = document.createElement('div');
            songContainer.className = 'detailsongcontainer';

            // 创建歌曲详情div
            const songDetails = document.createElement('div');
            songDetails.className = 'detailsong';

            // 创建并填充歌曲序号
            const songNumber = document.createElement('div');
            songNumber.className = 'description_number';
            songNumber.id = 'songnumber' + index;
            songNumber.innerText = index + 1; // 使用索引作为歌曲编号

            // 创建并填充歌曲图片
            const songImage = document.createElement('img');
            songImage.src = music.img || '../img/cat.png'; // 使用返回的图片，若不存在则使用默认图片
            songImage.className = 'detailsmallimg';

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
            const songName = document.createElement('div');
            songName.className = 'description_name';
            songName.id = 'songname';
            songName.innerText = music.name;
            // 添加点击事件，点击歌曲名称时弹出提示框


            // 创建并填充歌手名称
            const songSinger = document.createElement('div');
            songSinger.className = 'description_singer';
            songSinger.id = 'songsinger' + index;
            songSinger.innerText = music.artist.join(', '); // 假设artist是一个数组

            // 创建并填充歌曲时长（假设时长在music对象中）
            const songAudio = document.createElement('audio');
            songAudio.src = music.src; 
            songAudio.preload = 'metadata';  // 只加载元数据，提高性能
            const songTime = document.createElement('div');
            songTime.className = 'description_time';
            songTime.id = 'songtime' + index;
            songAudio.addEventListener('loadedmetadata', function() {
                songTime.textContent = formatTime(songAudio.duration); // 假设time属性存在  格式化时间的显示
            });

            
            /*const songTime = document.createElement('div');
            songTime.className = 'description_time';
            songTime.id = 'songtime' + index;
            songTime.textContent = formatTime(songAudio.duration); // 假设time属性存在  格式化时间的显示*/

            // 将所有元素添加到歌曲详情div中
            songDetails.appendChild(songNumber);
            songDetails.appendChild(songImage);
            songDetails.appendChild(songAudio);
            songDetails.appendChild(songName);
            songDetails.appendChild(songSinger);
            songDetails.appendChild(songTime);

            // 将歌曲详情div添加到外层div中
            songContainer.appendChild(songDetails);

            musicListContainer.appendChild(songContainer);

            //为该详情添加事件监听函数
            songDetails.addEventListener('click', (event) => {
                PlayMusic(music.mid);
                //constructListElementDivs();
            });
        });
    }

// 为每个 div 添加点击事件监听器
for (let i = 0; i < ranklist.length; i++) {
    ranklist[i].addEventListener('click', function() {
        const currentId = this.id; // 获取当前被点击的 div 的 id  this.id
        console.log(this.id);
        // 遍历 details 元素，检查其类名
        for (let j = 0; j < details.length; j++) {
            if (details[j].classList.contains('hidden')) {
                if (currentId === 'hotsong') {
                    details[j].classList.remove('hidden');
                    // 填充内容
                    getRecommendations(1);
                } else if (currentId === 'newsong') {
                    details[j].classList.remove('hidden');
                    // 填充内容
                    getRecommendations(2);
                } else {
                    details[j].classList.add('hidden');
                }
            } else {
                // 如果不是 hidden 状态，添加隐藏
                details[j].classList.add('hidden');
            }
        }
    });
}

getImgAndSong();






