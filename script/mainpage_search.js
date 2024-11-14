let searchList = [];
let inputValue ;

const searchbutton = document.getElementById('start-search');
const returns = document.getElementById('return');

/*
传回的数据结构：
{
    album:{
        name:" "
    }
    artist:[]
    mid:""
    name:""
    type:""
}
*/

function constructSearchElementDivs(){
    returns.innerHTML = '';
    for(let i=0;i<searchList.length;i++){
        const searchElement = document.createElement('div');
        searchElement.className = "searchelement";
    
        const searchInfo = document.createElement('div');
        searchInfo.className = "song-name";
        searchInfo.style = "border: none";

        const searchSong = document.createElement('div');
        searchSong.className = "song";
        searchSong.textContent = searchList[i].name + "--" + searchList[i].artist;

        const searchName = document.createElement('div');
        searchName.className = "name";
        searchName.textContent = "";

        const play = document.createElement('button');
        play.className = 'play';

        const playimg = document.createElement('img');
        playimg.src = "../img/continue.png";
        playimg.className = "control-button";

        play.appendChild(playimg);

        searchInfo.appendChild(searchSong);
        searchInfo.appendChild(searchName);
        searchElement.appendChild(searchInfo);
        searchElement.appendChild(play);

        //绑定播放的事件监听
        play.addEventListener('click' , ()=>{
            PlayMusic(searchList[i].mid);
        })

        returns.appendChild(searchElement);
    }


};

// 绑定搜索按钮的事件监听
searchbutton.addEventListener('click', (event) => {
    // 获取输入框的值并保存到变量中
    inputValue = document.getElementById('input-field').value;
    searchList = [];
    axios.get(apiurl + "/search/", {
        params: {
            keyword: encodeURIComponent(inputValue),
            limit: 50,
        }
    }).then((r) => {
        searchList = r.data;
        constructSearchElementDivs();
        console.log(searchList);
    });
    // 显示搜索界面
    returns.classList.remove('hidden');
    console.log('not hidden');

    event.stopPropagation();
});

// 点击空白部分使得搜索消失
document.addEventListener("click", function(event) {
    // 检查点击的目标是否是搜索结果容器或者搜索按钮
    if (!returns.contains(event.target) && event.target !== searchbutton) {
        returns.classList.add('hidden');
        console.log('hidden');
    }

    event.stopPropagation();
});