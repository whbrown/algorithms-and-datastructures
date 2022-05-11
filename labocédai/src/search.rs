pub fn linear_search(nums: &[isize], target: isize) -> isize {
    /* takes a collection of nums and a target number to search for;
     returns the index or -1 if not found */
    for (i, num) in nums.iter().enumerate() {
        if num == &target {
            return i.try_into().unwrap();
        }
    }
    -1
}

pub fn binary_search_nums(nums: &[isize], target: isize) -> isize {
    /* takes a collection of nums and a target number to search for;
     returns the index or -1 if not found */
    if nums.len() == 0 {
        return -1;
    }
    let mut left = 0;
    let mut right = nums.len() - 1;
    while left < right {
        let midpoint = (left + right) / 2;
        if nums[midpoint] == target {
            return midpoint.try_into().unwrap();
        } else if nums[midpoint] < target {
            right = midpoint;
        } else if nums[midpoint] > target {
            left = midpoint;
        }
    }
    -1
}