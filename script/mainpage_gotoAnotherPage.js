
const clickableDivs = document.getElementsByClassName('cover');
const showPage = document.getElementsByClassName('page')


for (let i = 0; i < clickableDivs.length - 2; i++) {
    clickableDivs[i].addEventListener('click', function() {
        const currentId = this.id; 
        // 
        for (let j = 0; j < showPage.length; j++) {
            // 检查 showPage[j] 是否包含 class 与 clickableDiv 相同的 id
            if (!showPage[j].classList.contains(currentId)) {
                showPage[j].classList.add('hidden'); // add hidden 
            } else {
                showPage[j].classList.remove('hidden'); // remove hidden 
            }
        }
    });
}

//修改密码
clickableDivs[clickableDivs.length - 2].addEventListener("click" , ()=>{
    // 显示提示框，要求用户输入他们的名字
    let wordd = window.prompt("请输入原始密码：", " ");

    // 检查用户输入并给出反馈
    if (wordd === password) {
        let worddd = window.prompt("请输入新密码：", " ");
        console.log("worddd",worddd);
        if(worddd !== null){
            const data = {
                account: username,
                password: worddd // 假设 this.user 已经定义了
            };
            axios.post(apiurl + "/changepassword/",data, {
                headers: {
            'Content-Type': 'application/json'
            }
            }).then((r) => {
                if(r.data.code == 100){
                    //成功
                    password = worddd;
                    alert("密码修改成功");
                }
                else{
                    alert("密码修改失败");
                }
            });
        }
    } else {
        alert("原始密码不正确。");
    }
    


})

//退出登录
clickableDivs[clickableDivs.length - 1].addEventListener("click" , ()=>{
    let result = window.confirm("确定要执行这个操作吗?");
    if (result) {
        username = "";
        obj = null;
        window.location.href="./sign-up.html";
    }
})