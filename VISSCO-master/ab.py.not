from pynput.keyboard import Key, Listener


def on_press(key):
    print('{0} pressed'.format(
        key))


def on_release(key):
    print(key)
    # print(key.char)
    if key == Key.esc:
        # Stop listener
        return False


# Collect events until released
with Listener(
        on_release=on_release) as listener:
    listener.join()
