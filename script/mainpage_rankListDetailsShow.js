// ��ȡ���о��� class Ϊ ranklist-container ��Ԫ��
const ranklist = document.getElementsByClassName('ranklist-container');
const details = document.getElementsByClassName('rankdetail');

const hotimg = document.getElementById('hot');
const newimg = document.getElementById("new");



function getRecommendations(id) {
    axios.get(apiurl + '/recommendations/',{
        params: {
            id:id  //  1  2  ������
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
        // �������󲢵ȴ���Ӧ
        const response = await axios.get(apiurl + '/recommendations/', {
            params: { id: id }  // ���� id ��Ϊ��ѯ����
        });
        if (id === 1) {
            // ���� hotList ����
            return response.data;
        } else {
            // ���� newList ����
            return response.data;
        }
    } catch (error) {
        console.error('failed:', error);
        // ������ʧ��ʱ����һ����������������ʵ���ֵ
        return [];
    }
}

async function getImgAndSong() {
    try {
        // ʹ�� Promise.all ִ�ж���첽����
        const [hotList, newList] = await Promise.all([
            getRecommendations1(1),  // ��ȡ hotList
            getRecommendations1(2)   // ��ȡ newList
        ]);

        // ��������ɹ�����Ӧ

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
        // �����������
        console.error('Error:', error);
    }
}

//����ʱ��
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    return formattedTime;
}


function constructMusicDivs(musicList) {
    const musicListContainer = document.getElementById('1');
        musicListContainer.innerHTML = ''; // ���֮ǰ������
        
        musicList.forEach((music, index) => {

            // �������div
            const songContainer = document.createElement('div');
            songContainer.className = 'detailsongcontainer';

            // ������������div
            const songDetails = document.createElement('div');
            songDetails.className = 'detailsong';

            // ���������������
            const songNumber = document.createElement('div');
            songNumber.className = 'description_number';
            songNumber.id = 'songnumber' + index;
            songNumber.innerText = index + 1; // ʹ��������Ϊ�������

            // ������������ͼƬ
            const songImage = document.createElement('img');
            songImage.src = music.img || '../img/cat.png'; // ʹ�÷��ص�ͼƬ������������ʹ��Ĭ��ͼƬ
            songImage.className = 'detailsmallimg';

            // ������������
            /*
            const songAudio = document.createElement('audio');
            songAudio.src = music.src; 
            songAudio.addEventListener('loadedmetadata', function() {
                console.log('songAudio.duration', songAudio.duration);  // ��ʱ���ܻ�ȡ��ȷ��ʱ��
            });*/
            //songAudio.controls = true;
            //songAudio.className = 'detailsmallimg';

            // ����������������
            const songName = document.createElement('div');
            songName.className = 'description_name';
            songName.id = 'songname';
            songName.innerText = music.name;
            // ��ӵ���¼��������������ʱ������ʾ��


            // ����������������
            const songSinger = document.createElement('div');
            songSinger.className = 'description_singer';
            songSinger.id = 'songsinger' + index;
            songSinger.innerText = music.artist.join(', '); // ����artist��һ������

            // ������������ʱ��������ʱ����music�����У�
            const songAudio = document.createElement('audio');
            songAudio.src = music.src; 
            songAudio.preload = 'metadata';  // ֻ����Ԫ���ݣ��������
            const songTime = document.createElement('div');
            songTime.className = 'description_time';
            songTime.id = 'songtime' + index;
            songAudio.addEventListener('loadedmetadata', function() {
                songTime.textContent = formatTime(songAudio.duration); // ����time���Դ���  ��ʽ��ʱ�����ʾ
            });

            
            /*const songTime = document.createElement('div');
            songTime.className = 'description_time';
            songTime.id = 'songtime' + index;
            songTime.textContent = formatTime(songAudio.duration); // ����time���Դ���  ��ʽ��ʱ�����ʾ*/

            // ������Ԫ����ӵ���������div��
            songDetails.appendChild(songNumber);
            songDetails.appendChild(songImage);
            songDetails.appendChild(songAudio);
            songDetails.appendChild(songName);
            songDetails.appendChild(songSinger);
            songDetails.appendChild(songTime);

            // ����������div��ӵ����div��
            songContainer.appendChild(songDetails);

            musicListContainer.appendChild(songContainer);

            //Ϊ����������¼���������
            songDetails.addEventListener('click', (event) => {
                PlayMusic(music.mid);
                //constructListElementDivs();
            });
        });
    }

// Ϊÿ�� div ��ӵ���¼�������
for (let i = 0; i < ranklist.length; i++) {
    ranklist[i].addEventListener('click', function() {
        const currentId = this.id; // ��ȡ��ǰ������� div �� id  this.id
        console.log(this.id);
        // ���� details Ԫ�أ����������
        for (let j = 0; j < details.length; j++) {
            if (details[j].classList.contains('hidden')) {
                if (currentId === 'hotsong') {
                    details[j].classList.remove('hidden');
                    // �������
                    getRecommendations(1);
                } else if (currentId === 'newsong') {
                    details[j].classList.remove('hidden');
                    // �������
                    getRecommendations(2);
                } else {
                    details[j].classList.add('hidden');
                }
            } else {
                // ������� hidden ״̬���������
                details[j].classList.add('hidden');
            }
        }
    });
}

getImgAndSong();






