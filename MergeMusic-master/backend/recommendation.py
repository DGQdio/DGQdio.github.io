import requests
import json
from music import qq_music

# 获取推荐歌曲列表


def get_qq_music_recommendations(topid_list):
    # API URL
    #print("getrecommendations")
    url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg"

    # 请求参数
    params = {
        "g_tk": 5381,
        "uin": 0,
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "h5",
        "needNewCode": 1,
        "tpl": 3,
        "page": "detail",
        "type": "top",
        "_": 1520777874472
    }

    # 结果列表
    result = []

    # 遍历排行榜 ID 列表
    for topid in topid_list:
        params["topid"] = topid
        # 发送请求
        response = requests.get(url, params=params)
        response_json = response.json()

        # 解析推荐歌曲
        song_list = response_json['songlist']

        # 创建排行榜字典
        top_list_dict = {
            'topid': topid,
            'songs': []
        }

        # 添加推荐歌曲，只处理前 15 首
        for i, song in enumerate(song_list):
            if i >= 20:
                break
            song_info = {
                'type': 'music',
                'mid': "Q" + song['data']['songmid'],
                'name': song['data']['songname'],
                'artist': [singer['name'] for singer in song['data']['singer']],
                'album': {'name': song['data']['albumname']}
            }
            top_list_dict['songs'].append(song_info)

        # 将排行榜字典添加到结果列表
        result.append(top_list_dict)

    return result

# 整合推荐歌曲列表与详细信息


def get_recommendations_with_details(topid_list):
    # 获取推荐歌曲列表
    #print("details")
    recommendations = get_qq_music_recommendations(topid_list)
    print(recommendations)
    #return json.dumps(recommendations, ensure_ascii=False)
    #尝试请求详细信息，包括歌词 音频等等

    detailed_recommendations = []

    for top_list_dict in recommendations:
        detailed_top_list_dict = {
            'topid': top_list_dict['topid'],
            'songs': []
        }
        for song in top_list_dict['songs']:
            mid = song['mid'][1:]  # 去掉前面的'Q'
            detailed_song = qq_music(mid)
            detailed_top_list_dict['songs'].append(detailed_song)
        print(detailed_top_list_dict)
        detailed_recommendations.append(detailed_top_list_dict)

    return detailed_recommendations


# 主函数


def main():
    # 排行榜 ID 列表
    #print("main")
    topid_list = [62,26,27,4,52,67,5,59,3,17,57,73]  # 可以根据需要添加更多的排行榜 ID   3, 4, 5, 26, 27, 28
    # 飙升榜，热歌榜，新歌榜，流行指数榜，原创榜，听歌识曲榜，内地榜，香港榜，欧美榜，日本榜，电音榜，游戏音乐榜  按顺序
    #topid_list.append(id)
    return get_recommendations_with_details(topid_list)


if __name__ == "__main__":
    print(main())
