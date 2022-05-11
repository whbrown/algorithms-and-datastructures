pub fn power(base: usize, exponent: usize) -> usize {
    if exponent == 0 {
        return 1;
    }
    base * power(base, exponent - 1)
}

pub fn factorial(num: usize) -> usize {
    if num <= 1 {
        return 1;
    }
    num * factorial(num - 1)
}

pub fn product_of_nums(nums: &[isize]) -> Option<isize> {
    if nums.len() == 0 {
        return None;
    }
    let next_product = product_of_nums(&nums[1..]);
    if let Some(product) = next_product {
        return Some(nums[0] * product);
    }
    Some(nums[0])
}

pub fn sum_up_to(num: usize) -> usize {
    if num == 0 {
        return 0;
    }
    num + sum_up_to(num - 1)
}

pub fn fibonacci(n: usize) -> usize {
    /* returns the nth number in the fibonacci sequence */
    if n == 1 || n == 2 {
        return 1;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

pub fn reverse(s: &str) -> String {
    if s.len() == 0 {
        return s.to_owned();
    }
    let char = match s.chars().nth(0) {
        Some(c) => c.to_string(),
        None => "".to_string()
    };
    return reverse(&s[1..s.len()]) + &char
}