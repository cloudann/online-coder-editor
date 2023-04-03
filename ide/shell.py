import subprocess
user = False

def init(User):
    global user
    user = User

def Shell(commmand,write,time,istimeout):
    global user
    if write:
        In = open(user["key"]+"In","r")
    else:
        In = open(user["key"]+"In","w")
    Out = open(user["key"]+"Out","w")
    Err = open(user["key"]+"Err","w")
    result = subprocess.Popen(commmand,stdin= In,stdout=Out,stderr=Err,shell = True,encoding="utf-8")
    '''
    if istimeout:
        result.wait(time)
    else:
    '''
    result.wait()
    In.close()
    Out.close()
    Err.close()
    #print(get(S),"no")

#shell
def shellin(commmand):
    return Shell(commmand,True,0,False)

def shell(commmand):
    return Shell(commmand,False,0,False)

#Get
def getmessage(src,Type):
    global user
    return get(src+Type)

def get(src):
    global user
    #print(src,"src",type(src))
    file = open(src,"r")
    s =file.readlines()
    s = "".join(s)
    file.close()
    return s

def getout():
    global user
    return getmessage(user["key"],"Out")

def getoutList():
    a = getout()
    print(a)
    return a.split("\n")

def geterr():
    global user
    return getmessage(user["key"],"Err")

#fileop
    
def back(src): 
    print("调用shell层back方法获取上一级目录")
    shell("bash shell/back.sh "+src)
    return getoutList()[0]

def exist(src):
    global user

    shell("bash shell/exist.sh "+src)
    if getoutList()[0]=="True":
        print(src,"已存在")
    else:
        print(src,"不存在")
    return getoutList()[0]=="True"


##空间操作

#目录获取
def getlist():
    global user
    print("调用shell层getlist方法获取",user["src"],"目录表")
    shell("bash shell/getlist.sh "+user["src"]) 
    s = getout()
    print(s)
    return s

#新建文件
def mkdir(src):
    shell("bash shell/mkdir.sh "+src)
def touch(src):

    shell("bash shell/touch.sh "+src)
#删除文件
def delfile(src):

    shell("bash shell/delfile.sh "+src)

#修改文件名
def rename(src,newname):

    shell("bash shell/rename.sh "+src+" "+newname)

#返回目录
def back():
    global user

    shell ("bash shell/back.sh "+user["src"])
    return getoutList()[0]+"/"


def complier(filename,language):
    global user

    src = user["src"]

    print("调用shell层complier方法编译",language,"语言")
    if language == "cpp":
        key = user["key"]+"C++/"
        shell("bash shell/cpp.sh "+src+filename+" "+key+"app")
    elif language == "py":
        key = user["key"]+"Python/"
        rename(src+filename,key+"app.py")
        shell("python3 "+key+"app.py")
    else:
        key = user["key"]+"Java/"
        delfile(key)
        mkdir(key)
        shell("bash shell/java.sh "+src+filename+" "+key)
    s = geterr()
    print("报错信息为",s)
    return s

def run(filename,language):
    global user

    print("调用shell层complier方法运行",language,"语言")
    if language == "cpp":
        shellin(user["key"]+"C++/app")
    elif language == "Java":
        shellin("Java "+user["key"]+"Java/"+filename[:-5])
    else:
        shellin("python3 "+user["key"]+"Python/app.py")
    return getout()
