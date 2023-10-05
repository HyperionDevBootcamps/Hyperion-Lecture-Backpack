import time

def recursive_fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return recursive_fibonacci(n - 1) + recursive_fibonacci(n - 2)
    

def iterative_fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

start_time = time.time()
# print(recursive_fibonacci(35))
# print(iterative_fibonacci(500))

print(f"Time elapsed: {time.time()-start_time}")