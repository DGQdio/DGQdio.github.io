function getRecommendations() {
    fetch('http://127.0.0.1:9000/recommendations/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // 处理推荐结果
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 使用函数
getRecommendations();