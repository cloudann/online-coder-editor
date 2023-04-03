# -*- coding: utf-8 -*-
# antuor:dxiaod
from flask import Flask, request
from flask_cors import *
app = Flask(__name__)
import file
import complier
import login
import register
import filecatalog

@app.route('/register',methods=['POST'])
@cross_origin()
def Register():
    print("App层接收注册请求")
    return register.Register(request.json)

@app.route('/login',methods=['POST'])
@cross_origin()
def Login():

    print("App层接收登录请求")
    return login.Login(request.json)
    

@app.route('/complier',methods=['POST'])
@cross_origin()
def com():

    print("App层接收编译请求")
    return complier.Complier(request.json)
'''
    src = request.json.get('src')
    filename = request.json.get('filename')
    if request.json.get("request") == "complier":
        return complier.complier(src,request.json.get("code"),filename)
    elif request.json.get("request") == "run":
        return  complier.run(src,request.json.get('in'))
    return "hello"
'''    
@app.route('/getfile',methods=['POST'])
@cross_origin()
def getfile():

    print("App层接收目录管理请求")
    return  filecatalog.Catalog(request.json)


app.run(host="0.0.0.0",port= "8080",debug=True)