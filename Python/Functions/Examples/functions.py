# def print_line():
#     print("-"*80)

# print_line()
# print("Hello world!")
# print_line()


# def greet_user(name):
#     name = name.upper()
#     print("Hello", name)

# username = input("Enter your name:")
# greet_user(username)




# def get_user_numbers():
#     num1 = input("Enter your number:")
#     num2 = input("Enter your number:")

#     return num1, num2

# first_num, second_num = get_user_numbers()
# print(first_num, second_num)





def print_line(length=80, lines=1):
    for i in range(lines):
        print("-"*length)

# print_line(30, 3)






# def person_info(name, age, **kwargs):
#     print(f"Name: {name}, Age: {age}")
#     for key, value in kwargs.items():
#         print(f"{key.capitalize()}: {value}")

# person_info("Alice", 30, city="New York", occupation="Engineer", surname="Jones", animal='Dog')


# def square(x):
#     return x ** 2

# square = lambda x: x ** 2
# result = square(4)
# print(result) 


def multiply(line, x=3, y=5):
    product = x * y
    print_line()
    return product

new_multiply = multiply
result = new_multiply(print_line ,5, 10)
print(result)