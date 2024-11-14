function updateGreetingAndTime() {
    const now = new Date(); // ��ȡ��ǰʱ��
    const hours = now.getHours(); // ��ȡ��ǰСʱ
    const minutes = now.getMinutes(); // ��ȡ��ǰ����
    const seconds = now.getSeconds(); // ��ȡ��ǰ����

    // ����ʱ��������ʺ���
    let greeting;
    if (hours < 12) {
        greeting = "Good Morning!"; // 00:00 - 11:59
    } else if (hours < 18) {
        greeting = "Good Afternoon!"; // 12:00 - 17:59
    } else {
        greeting = "Good Evening!"; // 18:00 - 23:59
    }

    // ����ҳ������
    document.getElementById('greeting').textContent = greeting;
}

    // ��ʼ����
    updateGreetingAndTime();

    // ÿ�����һ��ʱ��
    setInterval(updateGreetingAndTime, 1000);


