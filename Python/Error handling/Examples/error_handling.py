def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by Zero.")
    return a / b

def multiply(a, b):
    try:
        a = int(a)
        b = int(b)
        return a * b
    except Exception:
        print("Wrong data type detected!")
        return None

# multiply('a', 8)

def safe_index_access(my_list, index):
    if 0 <= index < len(my_list):
        return my_list[index]
    
item = safe_index_access([1,2,3,4,5], 4)
print(item)


def calculate_area(length, width):
    if (not isinstance(length, (int, float))
        or not isinstance(width, (int, float))):
        raise TypeError("Length and Width must be numeric!")
    return length * width

    