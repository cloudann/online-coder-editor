#import shell
import file
user = False
req = False
def get(): 
	global user
	file.init(user)
	s = file.filelist()
	return s

def add(addname,isfile):
	global user
	file.init(user)
	print(addname,isfile)
	src = user["src"]
	src+=addname
	if isfile==True:
		print(src)
		file.touch(src)
	else:
		file.mkdir(src)
	return "true"
 
def delfile(name):
	global user
	file.init(user)
	file.delfile(user["src"]+name)
	return "true"

def back():
	global user
	file.init(user)
	return file.back()

def rename(src,name):
	global user
	file.init(user)
	file.rename(src,name)
	return "True"

def Catalog(Req):
	global user
	global req
	req = Req
	user = Req.get("user")
	request = Req.get("request")
	print(user["username"],"用户请求",end="")
	if request == "get":
		print("获取",user["src"],"目录表")
		return get()#usersrc
	elif request == "add":
		print("在",user["src"],"添加文件",req.get("filename"))
		return add(req.get("filename"),req.get("isfile"))
	elif request == "del":
		print("删除",user["src"],"的文件",req.get("filename"))
		return delfile(req.get("filename"))
	elif request == "back":
		print("返回上一级目录")
		return back()
	elif request == "rename":
		print("重命名","文件",req.get("filename"),"为",req.get("newname"))
		src = user["src"]+req.get("filename")
		return rename(src,user["src"]+req.get("newname"))
	'''
    user = request.json.get('user')
    if request.json.get('request') == "get":
        s = file.getfile(user["src"])
        print(user["src"])
        return s
    elif request.json.get('request') == "add":
        file.addfile(user["src"],request.json.get('isfile'),request.json.get("name"))
    elif request.json.get('request') == "del":
        file.delfile(user["src"]+request.json.get('name'))
    elif request.json.get('request') == "back":
        return file.back(user);
        '''