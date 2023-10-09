import os

my_path = "./my_file.txt"

if os.path.exists(my_path):
    file = open("my_file.txt", "r")
    print("Success")
else:
    print("File not found!")


try:
    file = open("new_file.txt", "r")
except FileNotFoundError:
    print("File not found")


































# try:
#     file = open(selection, "r")
#     content = file.read()
#     print("File content: \n" + content)
# except FileNotFoundError:
#     print("No such file")













# import os
# if os.path.isfile(selection):
#     file = open("./"+selection, "r")
#     content = file.read()
#     print("File content: \n" + content)
# else:
#     print("No such file")