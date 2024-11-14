function updateGreetingAndTime() {
    const now = new Date(); // 获取当前时间
    const hours = now.getHours(); // 获取当前小时
    const minutes = now.getMinutes(); // 获取当前分钟
    const seconds = now.getSeconds(); // 获取当前秒钟

    // 根据时间段设置问候语
    let greeting;
    if (hours < 12) {
        greeting = "Good Morning!"; // 00:00 - 11:59
    } else if (hours < 18) {
        greeting = "Good Afternoon!"; // 12:00 - 17:59
    } else {
        greeting = "Good Evening!"; // 18:00 - 23:59
    }

    // 更新页面内容
    document.getElementById('greeting').textContent = greeting;
}

    // 初始调用
    updateGreetingAndTime();

    // 每秒更新一次时间
    setInterval(updateGreetingAndTime, 1000);


