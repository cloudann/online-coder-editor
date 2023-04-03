import file
def Login(Req):
	user = Req.get("user")
	#print("login: ",user["password"])
	return userexist(user)


def userexist(user):#检测用户是否存在 用户空间是space 密码文件时password
	file.init(user)
	if file.fileexist(user["src"]) and file.fileexist(user["root"]+user["password"]):
		return 'True'
	return "False" 