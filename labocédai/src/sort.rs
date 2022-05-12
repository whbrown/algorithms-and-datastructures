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
