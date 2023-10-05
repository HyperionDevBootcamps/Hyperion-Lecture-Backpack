def quick_sort(my_list, low, high):
    if low < high:
        mid = partition(my_list, low, high)
        my_list = quick_sort(my_list, low, mid - 1)
        my_list = quick_sort(my_list, mid + 1, high)
    return my_list


def partition(my_list, low, high):

    # Pivot point is first item in sublist
    pivot = my_list[low]

    # Loop through the list. Move values around in list to have them
    # in the proper position with regards to the pivot point
    while low < high:

        # Check to see if there is a value that is smaller than the pivot
        # Keep decreasing the "high" value until a smaller value is found
        # or low == high
        while low < high and my_list[high] >= pivot:
            high -= 1

        if low < high:

            # If found swap smaller number into position
            my_list[low] = my_list[high]  # [3,6,3]
            # Look for a number larger than the pivot
            while low < high and my_list[low] <= pivot:
                low += 1

            if low < high:
                # If found swap larger number into position
                my_list[high] = my_list[low] # [3,6,6]

    # Put pivot back into list and return its index
    my_list[low] = pivot # [3,4,6,5]
    return low


my_list = [4,6,3]
print(quick_sort(my_list, 0, len(my_list)-1))