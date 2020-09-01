# def selectionSort(arr):
#     for i in range(0, len(arr)):  # start from i = 0
#         min_idx = i  # set index of min element
#         # loop through array from i+1 to look for min element in the rest of the array
#         for j in range(i + 1, len(arr)):
#             if arr[min_idx] > arr[j]:
#                 min_idx = j
#         # swap to put min element at the begining of the array
#         arr[i], arr[min_idx] = arr[min_idx], arr[i]
#     return arr


# arr = [5, 3, 6, 1, 9, 6]
# print(selectionSort(arr))


# def bubleSort(arr):
#     for i in range(0, len(arr)):
#         for j in range(0, len(arr) - i - 1):
#             if arr[j] > arr[j + 1]:
#                 arr[j], arr[j + 1] = arr[j + 1], arr[j]
#     return arr


# arr = [5, 3, 6, 1, 9, 6]
# print(bubleSort(arr))


# def quickSort(arr, low, high):
#     if low < high:
#         # partition method puts the pivot element to the right position
#         # all smaller elements are in its left
#         # all greater elements are in its right
#         # and return the correct index of the pivot
#         pi = partition(arr, low, high)
#         quickSort(arr, low, pi - 1)
#         quickSort(arr, pi + 1, high)


# def partition(arr, low, high):
#     pivot = arr[high]
#     i = low - 1
#     for j in range(low, high):
#         if arr[j] < pivot:
#             i += 1
#             arr[i], arr[j] = arr[j], arr[i]
#     arr[i + 1], arr[high] = arr[high], arr[i + 1]
#     return i + 1  # return index of pivot


# arr = [5, 3, 6, 1, 9, 6]
# print(quickSort(arr, 0, len(arr) - 1))
# print(arr)


# Python program for implementation of heap Sort

# To heapify subtree rooted at index i.
# n is size of heap
def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    l = 2 * i + 1     # left = 2*i + 1
    r = 2 * i + 2     # right = 2*i + 2

    # See if left child of root exists and is
    # greater than root
    if l < n and arr[i] < arr[l]:
        largest = l

    # See if right child of root exists and is
    # greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r

    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
        # Heapify the root.
        heapify(arr, n, largest)

# The main function to sort an array of given size


def heapSort(arr):
    n = len(arr)

    # Build a maxheap.
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # One by one extract elements
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)


# Driver code to test above
arr = [3, 10, 4, 6, 8, 7, 9, 5, 1, 2]
heapSort(arr)
# print(arr)
# This code is contributed by Mohit Kumra
