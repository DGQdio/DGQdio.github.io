from app import Music
from app import db  # 确保从 app.py 中导入 db
from sqlalchemy import func  # 导入 func

def main(dic):
    counter = row_count = db.session.query(func.count(Music.id)).scalar()  # 计算 id 列的行数
    # 创建 Music 实例
    print("dic")
    print(dic)
    # res = savelist.main(dic)
    # 创建 Music 实例
    music = []
    for data in dic:
        print(counter)
        counter = counter + 1
        print(data)
        # 创建一个新的 Music 对象并将其添加到 music 列表中
        music.append(
            Music(
                id=counter,
                count="user",
                type=data.get('type', ''),  # 如果没有 'type' 键，则使用空字符串
                mid=data.get('mid', ''),  # 如果没有 'mid' 键，则使用空字符串
                name=data.get('name', ''),  # 如果没有 'name' 键，则使用空字符串
                artist=', '.join(data.get('artist', [])),  # 如果没有 'artist' 键，则使用空列表，'.join' 将列表转为字符串
                album=data.get('album', {}).get('name', ''),  # 如果没有 'album' 或 'name' 键，则使用空字符串
                img2=data.get('img2', ''),  # 如果没有 'img2' 键，则使用空字符串
                media_mid=data.get('media_mid', ''),  # 如果没有 'media_mid' 键，则使用空字符串
                color=data.get('color', '')  # 如果没有 'color' 键，则使用空字符串
            )
        )

    # 保存到数据库
    db.session.bulk_save_objects(music)  # bulk_save_objects 用于批量保存对象
    db.session.commit()

    data = {
        "name": "小明",
        "age": 25
    }
    return data
