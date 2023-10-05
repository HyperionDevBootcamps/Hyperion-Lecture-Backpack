import time
import random






def power(base, exponent):
    if exponent == 0:
        return 1
    else:
        return base * power(base, exponent - 1)
    
def power_it(base, exponent):
    total = base
    for i in range(1, exponent):
        total *= base
    return total


print(power(2,1001))
# print(power_it(2,99))








def count_occurrences(my_list, target):
    if not my_list:
        return 0
    else:
        if my_list[0] == target:
            return 1 + count_occurrences(my_list[1:], target)
        else:
            return count_occurrences(my_list[1:], target)


def count_occurrences_it(my_list, target):
    total = 0
    for item in my_list:
        if item == target:
            total += 1
    return total

# for i in range(3):
#     start_time = time.time()
#     # print(count_occurrences([random.randint(1,20) for i in range(750)], 1))
#     # print(count_occurrences_it([random.randint(1,20) for i in range(750)], 1))
#     print(f"Time elapsed: {time.time()-start_time}")

def binary_search(arr, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, low, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, high)


def binary_search_it(my_list, value):
    low, high = 0, len(my_list)-1

    while high >= low:
        mid = (low + high) // 2
        if my_list[mid] == value:
            return mid
        elif my_list[mid] < value:
            low = mid + 1
        else:
            high = mid - 1
    
start_time = time.time()

my_arr = [i for i in range(1, 1500)]
index = binary_search(my_arr, 3, 0, len(my_arr))
# index = binary_search_it(my_arr, 3)

print(index)
print(my_arr[index])

print(f"Time elapsed: {time.time()-start_time}")