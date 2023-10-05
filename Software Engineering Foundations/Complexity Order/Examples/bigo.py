import time
start_time = time.time()






# O(1)
def print_item(key, dict):
    print(dict[key])

def add_number(num1, num2, num3):
    return num1 + num2 + num3






# O(n)
def print_all(given_list):
    for item in given_list:
        print(item) #n

# print_all([i for i in range(20000)])

def sum_all(num_list):
    total = 0
    for num in num_list:
        total += num
    return num

# sum_all([i for i in range(200000)])








# O(n^2)
def quadratic_function(my_list):
    total = 0
    length = len(my_list)
    for i in range(length):
        for j in range(length):
            total += my_list[i] * my_list[j] # n^2
    return total

quadratic_function([i for i in range(3000)])









# O(logn)
def binary_search(value, my_list):
    low, high = 0, len(my_list)-1
    while high >= low:
        mid = (low + high) // 2
        if my_list[mid] == value:
            return mid
        elif my_list[mid] < value:
            low = mid + 1
        else:
            high = mid - 1







# O(n)
def get_average(num_list):
    total = 0
    for num in num_list:
        total += num   # O(n)

    average = total/len(num_list) # O(1)
    # n
    return average









def big_number(num_list):
    total = 0

    for x in num_list:
        for y in num_list:
            for z in num_list:
                total += x + y + z # 1 x n x n x n
                # O(n^3)







def print_sorted(my_list):
    my_list.sort() # O(nlogn)

    for item in my_list:
        print(item)  # O(n)
    # O(nlogn)
print(time.time()-start_time)
