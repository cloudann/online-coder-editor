import shell
user = False
req = False

def Complier(req):
	global user
	print("Complier层接收编译请求")
	user = req.get("user")
	request = req.get("request")
	print("语言类型为","language")
	if request =="complier":
		print("请求类型为编译")
		return complier(req.get("filename"),req.get("code"),req.get("language"))
	elif request == "run":
		print("请求类型为运行")
		return run(req.get("filename"),req.get("language"),req.get("in"))
	elif request == "getcode":
		 return getcode(req.get("filename"))
	return "1"

def run(filename,language,Int):
	global user
	shell.init(user)
	print("写入输入数据")
	File = open(user["key"]+"In","w")
	File.write(Int)
	File.close()
	print("写入成功")
	return shell.run(filename,language)

def getcode(filename):
	global user
	print("读取代码")
	File = open(user["src"]+filename,"r")
	code = File.readlines()
	File.close()
	print("读取成功")
	return code

def complier(filename,code,language):
	global user
	shell.init(user)
	writecode(filename,code)
	return shell.complier(filename,language)
	

def writecode(filename,code):
	global user
	print("写入代码")
	print(user["src"]+filename)
	File = open(user["src"]+filename,"w")
	File.write(code)
	File.close()
	print("读取成功")
'''
def complier(src, code, filename):
    file = open(src+filename, "w")
    file.write(code)
    file.close()
    default = open(src+"default","w")
    result = subprocess.Popen("g++ " + src + filename + " -w -Wall -O3 -o " + src + "/app ", shell=True,
                              stderr=subprocess.PIPE)
    s = result.communicate()[1]
    print(s)
    if s==None:
        s = ""
    print(s)
    default.close()
    return s
def run(src,inpu):
    filein = open(src+"filein","w")
    filein.write(inpu)
    filein.close()
    filein = open(src+"filein","r")
    result = subprocess.Popen(src+"app",shell=True,stdin=filein,stdout = subprocess.PIPE);
    s = result.communicate()[0]
    if s == None:
        s = ""
    filein.close()
    return s
    '''