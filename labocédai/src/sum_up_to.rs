pub fn sum_up_to(num: usize) -> usize {
    (0..=num).into_iter().fold(0, |acc, n| acc + n)
}
