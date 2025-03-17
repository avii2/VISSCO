import os
import webview
from pynput.mouse import Controller as MC, Button
from pynput.keyboard import Controller as KC, Key

mice = MC()
kbd = KC()


class Api:
    def handleMouse(self, data):
        if(data["data"] == "MOVE"):
            mice.position = (data["info"]["x"], data["info"]["y"])

    def handleMouse(self, pac):
        print(pac)
        if(pac["data"] == "MOVE"):
            mice.position = (pac["info"]["x"], pac["info"]["y"])
        elif(pac["data"] == "CLICK"):
            if(pac["key"] == "LEFT"):
                mice.click(Button.left, 1)
            elif(pac["key"] == "RIGHT"):
                mice.click(Button.right, 1)

    def handleKeyboard(self, data):
        key = data["key"]["key"]
        if(data["data"] == "DOWN"):
            if(data["key"]["has"] == 0):
                kbd.press(key)
            elif(data["key"]["has"] == 1):
                kbd.press(Key[key])
        elif(data["data"] == "UP"):
            if(data["key"]["has"] == 0):
                kbd.release(key)
            elif(data["key"]["has"] == 1):
                kbd.release(Key[key])


def get_entrypoint():
    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('../gui/index.html'):  # unfrozen development
        return '../gui/index.html'

    if exists('../Resources/gui/index.html'):  # frozen py2app
        return '../Resources/gui/index.html'

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')


entry = get_entrypoint()


def first():
    pass


if __name__ == '__main__':
    window = webview.create_window(
        'VISSCO', entry, js_api=Api())
    webview.start(first, debug=True)
