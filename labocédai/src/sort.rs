pub fn bubble_sort(nums: &mut [isize]) -> &mut [isize] {
    for i in 0..nums.len() {
        let mut hasnt_swapped = true;
        for j in 0..nums.len() - i {
            if j < nums.len() - 1 && nums[j] > nums[j + 1] {
                nums.swap(j, j + 1);
                hasnt_swapped = false;
            }
        }
        if hasnt_swapped {
            return nums;
        }
    }
    nums
}

pub fn selection_sort(nums: &mut [isize]) -> &mut [isize] {
    for i in 0..nums.len() {
        let mut min_num_idx = i;
        for j in i..nums.len() {
            if nums[j] < nums[min_num_idx] {
                min_num_idx = j;
            }
        }
        nums.swap(i, min_num_idx);
    }
    nums
}

pub fn insertion_sort(nums: &mut [isize]) -> &mut [isize] {
    if nums.len() < 2 {
        return nums;
    }
    for i in 1..nums.len() {
        for j in (0..i).rev() {
            if nums[j + 1] < nums[j] {
                nums.swap(j, j + 1);
            } else {
                break;
            }
        }
    }
    nums
}

pub fn merge(arr_1: &[isize], arr_2: &[isize]) -> Vec<isize> {
    /* merges two similarly sorted arrays */
    let mut merged = Vec::with_capacity(arr_1.len() + arr_2.len());
    let mut i = 0;
    let mut j = 0;
    while i < arr_1.len() && j < arr_2.len() {
        if arr_1[i] <= arr_2[j] {
            merged.push(arr_1[i]);
            i += 1;
        } else if arr_1[i] > arr_2[j] {
            merged.push(arr_2[j]);
            j += 1;
        }
    }
    // push remaining values in unexhausted array into merged
    while i < arr_1.len() {
        merged.push(arr_1[i]);
        i += 1;
    }
    while j < arr_2.len() {
        merged.push(arr_2[j]);
        j += 1;
    }
    merged
}

pub fn merge_sort(nums: &[isize]) -> Vec<isize> {
    if nums.len() <= 1 {
        return nums.to_vec();
    }
    let midpoint = nums.len() / 2;
    let left = merge_sort(&nums[0..midpoint]);
    let right = merge_sort(&nums[midpoint..]);
    merge(&left, &right)
}

fn pivot_helper(nums: &mut [isize], start: usize, end: usize) -> usize {
    /* selects a pivot and arranges all nums less than it to the left of it,
    and greater than it to the right of it */
    let pivot_idx = start;
    let mut offset = start;
    for i in start+1..=end {
        if nums[i] < nums[pivot_idx] {
            offset += 1;
            nums.swap(i, offset);
        }
    }
    nums.swap(pivot_idx, offset);
    offset
}

pub fn quick_sort(nums: &mut [isize]) -> &mut [isize] {
    fn sort(nums: &mut [isize], left: usize, right: usize) -> &mut [isize] {
        if left < right  {
            let pivot_idx = pivot_helper(nums, left, right);
            // left
            if pivot_idx > 0 {
                sort(nums, left, pivot_idx - 1);
            }
            // right
            sort(nums, pivot_idx+1, right);
        }
        nums
    }
    if nums.len() > 0 {
        sort(nums, 0, nums.len() - 1);
    }
    nums
}