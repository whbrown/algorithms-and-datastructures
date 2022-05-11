pub fn sum_up_to(num: usize) -> usize {
    (0..=num).into_iter().fold(0, |acc, n| acc + n)
}

pub fn is_valid_anagram(string_1: &str, string_2: &str) -> bool {
    use std::collections::HashMap;
    if string_1.len() != string_2.len() {
        return false;
    }
    let mut freq_counter = string_1
        .chars()
        .fold(HashMap::new(), |mut freq_counter, c| {
            *freq_counter.entry(c.to_string()).or_insert(0) += 1;
            freq_counter
        });
    for c in string_2.chars() {
        let count = freq_counter.entry(c.to_string()).or_insert(0);
        *count -= 1;
        if count < &mut 0 {
            return false;
        }
    }
    true
}

pub fn sum_zero(nums: &[i32]) -> Option<(i32, i32)> {
    if nums.len() < 2 {
        return None;
    }
    let mut first_cursor = 0;
    let mut second_cursor = nums.len() - 1;
    while first_cursor < second_cursor {
        if nums[first_cursor] + nums[second_cursor] < 0 {
            first_cursor += 1;
        } else if first_cursor != second_cursor && nums[first_cursor] + nums[second_cursor] > 0 {
            second_cursor -= 1;
        } else {
            return Some((nums[first_cursor], nums[second_cursor]));
        }
    }
    None
}

// use std::collections::HashSet;
pub fn count_uniques(nums: &[isize]) -> usize {
    // // linear aux. space; linear timu
    // let set: HashSet<isize> = HashSet::from_iter(nums.into_iter());
    // set.len()

    // constant aux. space; linear time
    let mut uniques = 0;
    if nums.len() < 2 {
        return nums.len();
    }
    let mut comparison = 0;
    for (i, num) in nums.iter().enumerate() {
        if i == 0 || num != &nums[comparison] {
            uniques += 1;
            comparison = i
        }
    }
    uniques
}

pub fn sum_nums(nums: &[isize]) -> isize {
    nums.iter().fold(0, |acc, num| acc + num)
}

pub fn max_n_width_sub_array_sum(nums: &[isize], n: usize) -> Option<isize> {
    /* Calculates the maximum sum of n consecutive elements of the collection of nums */
    if nums.len() < n {
        return None;
    }
    let mut sum = sum_nums(&nums[0..n]);
    let mut max_sum = sum;
    for (i, _) in nums.iter().enumerate() {
        if i > 0 && i + n <= nums.len() {
            sum -= nums[i - 1];
            sum += nums[i + n - 1];

            if sum > max_sum {
                max_sum = sum
            }
        }
    }
    Some(max_sum)
}
