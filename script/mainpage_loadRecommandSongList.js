function getRecommendations() {
    fetch('http://127.0.0.1:9000/recommendations/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // �����Ƽ����
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// ʹ�ú���
getRecommendations();