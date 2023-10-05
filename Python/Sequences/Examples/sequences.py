import copy

# strings

my_string = "This is a string!"

my_string = f"{my_string} Hello world!"

# print(my_string)

# Indexing

new_string = "Welcome"

letter = new_string[3]
# print(letter)
# print(new_string[6])
# print(new_string[7])

#Slicing
new_string = "Welcome"

slice = new_string[::2]
# print(slice)



my_string = "@@@@@@Hel@lo"
# print(my_string.upper())
# print(my_string.replace("l", "@"))
# print(my_string.strip("@"))
# print(my_string)


# Loops

new_string = "Hello world!"

# for letter in new_string:
#     print(letter)

# for i in range(len(new_string)):
#     print(new_string[i])


# Lists

new_list = [1, "Armand", "Rugby", [1,2,3,4,5]]


# print(my_list[2])
# print(my_list[4])

# my_list[0] = 0

# print(my_list)

# print(my_list[:3])
# print(my_list[2:])
# print(my_list[::2])

# my_list = [1,2,3,"4",5]
# my_list.append(6)
# my_list.append(7)
# print(my_list)

# my_list.pop(2)
# print(my_list)

# my_list.remove("4")
# print(my_list)

# my_list += [8,9,10]

# print(my_list)

# for item in my_list:
#     print(item)

# for i in range(len(my_list)):
#     print(my_list[i])


# list1 = [1,2,3,4,5]

# list2 = list1.copy()

# list2[2] = "Hello"

# print(list1)
# print(list2)

# list_2d = [[1,2,3], [4,5,6]]

# print(list_2d[0][1])
# # [1,2,3]
# another_list = list_2d.copy()
# another_list[0][1] = 9
# print(list_2d)
# new_lsit_2d = copy.deepcopy(list_2d)

my_dict = {
    "name": "Armand",
    "surname": "le Roux",
    "age": 59,
    "grades":[80,52,63,79]
}

# print(my_dict["name"])
# print(my_dict["grades"])

my_dict["name"] = "Mike"
my_dict["age"] = 65
my_dict["car"] = "Toyota"

# for key in my_dict:
#     print(key)
#     print(my_dict[key])

for key, item in my_dict.items():
    print(key, item)