pub mod sum_up_to;

#[cfg(test)]
mod tests {
    use crate::sum_up_to::*;

    #[test]
    fn test_sum_up_to() {
        assert_eq!(sum_up_to(5), 5 + 4 + 3 + 2 + 1);
        assert_eq!(sum_up_to(0), 0);
    }
}
