import subprocess
import shell

user = False

def init(User):
    global user
    user = User
    shell.init(user)

def fileexist(src):
    global user
    print("调用file层filexist判断",src,"是否存在")
    shell.init(user)
    return shell.exist(src)

def mkdir(src):
    global user
    shell.init(user)
    print("调用File层mkdir创建",src)
    shell.mkdir(src)

def touch(src):
    shell.init(user)
    print("调用File层touch创建",src)
    shell.touch(src)

def delfile(src):
    global user
    shell.init(user)
    print("调用File层defile删除",src)
    return shell.delfile(src)

def filelist():
    global user
    shell.init(user)
    print("调用File层filelist获取目录表")
    return shell.getlist()

#重命名
def rename(src,newname):
    global user
    shell.init(user)
    print("调用File层rename重命名",src,"为",newname)
    return shell.rename(src,newname)

#返回
def back():
    global user
    print("调用File层back返回上一级目录")
    if user["root"]+"space/"==user["src"]:
        print("已在用户根目录无法返回上级")
        return user["src"]
    else:
        shell.init(user)
        return shell.back()
    return user["src"]

'''
def back(user):
    if(user["root"]+"space/" == user["src"]):
        return user["src"]
    result = subprocess.Popen("dirname "+user["src"],stdout=subprocess.PIPE,stderr=subprocess.PIPE,shell = True)
    s = result.communicate()
    return str(s, encoding="utf-8").replace("\n","/")

def rename(user,filename,newname):
    result = subprocess.Popen("mv "+user["src"]+filename+" "+user["src"]+newname,stdout=subprocess.PIPE,stderr=subprocess.PIPE,shell = True)
    s = result.communicate()

def delfile(src):
    print(src)
    subprocess.Popen("rm -rf "+src,shell=True)

def getfile(src):
    #print(src)
    fileexist(src)
    result = subprocess.Popen("ls "+src,stdout=subprocess.PIPE,stderr=subprocess.PIPE,shell = True);
    s = result.communicate()[0]
    s = str(s, encoding="utf-8")
    print("getfile ",type(s))
    return str(s, encoding="utf-8")
def addfile(src,isfile,name):
    if isfile=='true':
        subprocess.Popen("touch "+src+name,shell=True)
    else:
        subprocess.Popen("mkdir "+src+name,shell=True)

def mkdir(src):
    print(src)
    subprocess.Popen("`"+src,shell=True)
```
'''