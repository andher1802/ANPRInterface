import sys
import os
import json
from libraries.bottle import *
import FileDialog
from anpr import anpr

@route('/ANPR/<name>', METHOD='GET')
def anprGet(name="Car03.png" ):
    result = anpr(name)
    data = {}
    if result == 0:
        # return 'plate was not idetified'
        data['ID'] = name
        data['status'] = False
        data['result'] = 0
    else: 
        data['ID'] = name
        plateChars = []
        for element in result[1]:
            plateChars.append(str(element))
        for element in result[2]:
            plateChars.append(str(element))
        data['result'] = plateChars
        if len(result)!=0:
            data['status'] = True
        else:
            data['status'] = False
    json_data = json.dumps(data)
    return json_data

@route('/CONFIG/', METHOD='GET')
def config():
    data = {}
    data['status'] = True
    json_data = json.dumps(data)
    return json_data

def main():
    run(host='localhost', port=9000, debug=False)

if __name__=='__main__':
    main()
