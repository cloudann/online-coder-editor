import login
import file
user = False
def userexist():#检测用户是否存在 用户空间是space 密码文件时password
	global user
	print("当前用户路径为",user["src"])
	file.init(user)
	if file.fileexist(user["src"]) :
		return True
	return False

def Register(json):
	global user
	user = json.get("user")
	print("Register层开始检测用户是否存在")
	if userexist(): #检查用户是否存在
		print("用户已存在，注册失败")
		return "True"
	else:
		print("用户不存在，开始注册")
		register() #不存在进行注册
		print("注册成功")
		return "False"
	return "True"

def register():
	global user
	file.mkdir(user["src"])
	print("建立用户空间成功")
	file.mkdir(user["root"]+user["password"]+"/")
	print("建立用户验证目录成功")
	file.mkdir(user["root"]+user["password"]+"/Python")
	file.mkdir(user["root"]+user["password"]+"/C++")
	#file.touch(user["key"]+"In")