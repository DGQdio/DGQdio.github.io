'''
Description: 配置文件
_(:з」∠)_
'''
header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36 Edg/80.0.361.66',
}

api_base_url = {
    "Q": "http://x.x.x.x:3300",  # QQ音乐API
}

# bilibili歌曲缓存，需要存入歌曲并提供url，这里使用阿里云OSS，可根据需求更换
if True: # 使用阿里云OSS
    import oss2
    #api的账号密码，此处访问api
    oss_auth = oss2.Auth('LTAI5t7FYuvWTE2uQqdPzReD', 'jZAdMaQJNHC93I8XUStUCqVemeRwRo')
    oss_bucket = oss2.Bucket(
        oss_auth, 'http://oss-cn-wuhan-lr.aliyuncs.com', 'music-manage-project')  #武汉的地址
    oss_path = "ori/bili/"
    oss_url = "https://music-manage-project.oss-cn-wuhan-lr.aliyuncs.com/"+oss_path


    # 实现以下函数即可

    # 检查缓存文件是否存在，如果存在返回链接，否则返回空字符串
    def check_tmp(filename):
        if oss_bucket.object_exists(oss_path+filename):
            return oss_url+filename+"?x-oss-traffic-limit=819200"
        else:
            return ""

    # 储存文件并返回链接
    def save_tmp(filename, bin):
        oss_bucket.put_object(oss_path+filename, bin)
        return oss_url+filename+"?x-oss-traffic-limit=819200"
# 网易云账号cookie
C_vip_cookie = ""
# QQ音乐账号cookie
# Q_vip_cookie = ""